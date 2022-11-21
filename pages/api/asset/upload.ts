import type { NextApiRequest, NextApiResponse } from 'next';
import CorsMiddleWare from '@libs/request/server/cors-middlewars';
import formidable from 'formidable';
import { PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import formidableParser from '@libs/request/server/formidable-parser';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<PutObjectCommandOutput | { error: string }>) {
    await CorsMiddleWare(req, res, {
        methods: ['PUT', 'HEAD'],
        origin: '*'
    });

    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource').checkErrors();
        return;
    }

    const form = await formidableParser(req);
    const file = form.files.file as formidable.File;
    const fileStream = fs.createReadStream(file.filepath);

    if (!file) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'File is missing').checkErrors();
        return;
    }

    if (!form.fields.path) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Path is missing').checkErrors();
        return;
    }

    try {
        const url = await S3.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: form.fields.path as string,
                Body: fileStream
            })
        );
        new RestHelper(req, res).setData(url).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'The image could not be processed').checkErrors();
    }
}

export const config = {
    api: {
        bodyParser: false
    }
};
