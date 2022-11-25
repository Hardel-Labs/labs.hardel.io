import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import formidableParser from '@libs/request/server/formidable-parser';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import uploadAsset, { AssetUploadOutput } from '@libs/aws/upload';
import { RestRequest } from '@definitions/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RestRequest<AssetUploadOutput>>) {
    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource').checkErrors();
        return;
    }

    const form = await formidableParser(req);
    const file = form.files.file as formidable.File;

    if (!file) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'File is missing').checkErrors();
        return;
    }

    if (!form.fields.path) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Path is missing').checkErrors();
        return;
    }

    const response = await uploadAsset(form.fields.path as string, file);
    res.status(response.request.statusCode).json(response);
}

export const config = {
    api: {
        bodyParser: false
    }
};
