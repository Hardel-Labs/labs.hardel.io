import type { NextApiRequest, NextApiResponse } from 'next';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import { DeleteObjectCommand, DeleteObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_KEY as string
    }
});

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
