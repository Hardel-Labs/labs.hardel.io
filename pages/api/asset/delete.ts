import type { NextApiRequest, NextApiResponse } from 'next';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import { DeleteObjectCommand, DeleteObjectCommandOutput } from '@aws-sdk/client-s3';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import S3 from '@libs/aws/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse<DeleteObjectCommandOutput | { error: string }>) {
    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource').checkErrors();
        return;
    }

    let path = req.body.path;
    if (!path) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Path is missing').checkErrors();
        return;
    }

    if (path.startsWith('/')) {
        path = path.slice(1);
    }

    try {
        const url = await S3.send(
            new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: path
            })
        );

        new RestHelper(req, res).setData(url).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'The image could not be processed').checkErrors();
    }
}
