import { NextApiRequest, NextApiResponse } from 'next';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import formidableParser from '@libs/request/server/formidable-parser';
import formidable from 'formidable';
import uploadAsset from '@libs/aws/upload';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource').checkErrors();
        return;
    }

    const form = await formidableParser(req);
    const file = form.files.asset as formidable.File;
    const minecraftId = form.fields.minecraftId as string;

    const errors = new RestHelper(req, res)
        .checkIsVariableIsDefined(file, 'file')
        .checkIsVariableIsDefined(minecraftId, 'id')
        .checkMaxLength(minecraftId, 80)
        .isCorrectMinecraftId(minecraftId)
        .checkErrors();

    if (errors) return;

    const destination = `minecraft/items/vanilla`;
    const filename = minecraftId.split(':')[1];
    const response = await uploadAsset(destination, file, { filename });
    res.status(response.request.statusCode).json(response);
}

export const config = {
    api: {
        bodyParser: false
    }
};
