import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import formidableParser from '@libs/request/server/formidable-parser';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import uploadAsset from '@libs/aws/upload';

export default async function handler(req: NextApiRequest, res: NextApiResponse<PutObjectCommandOutput | { error: string }>) {
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

    return uploadAsset(form.fields.path as string, file);
}

export const config = {
    api: {
        bodyParser: false
    }
};
