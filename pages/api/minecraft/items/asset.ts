import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { RoleType } from '@prisma/client';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import formidableParser from '@libs/request/server/formidable-parser';
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_KEY as string
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource').checkErrors();
        return;
    }

    const form = await formidableParser(req);
    const file = form.files.asset as formidable.File | undefined;
    const minecraftId = form.fields.minecraftId as string;

    const errors = new RestHelper(req, res)
        .checkIsVariableIsDefined(file, 'file')
        .checkIsVariableIsDefined(minecraftId, 'id')
        .checkMaxLength(minecraftId, 80)
        .isCorrectMinecraftId(minecraftId)
        .checkErrors();

    if (errors) return;

    try {
        if (file) {
            const fileStream = fs.createReadStream(file.filepath);
            const destination = `minecraft/items/vanilla/${minecraftId.split(':')[1]}.webp`;
            const newImage = await sharp(fileStream.path).resize(64, 64).webp().toBuffer();
            if (!newImage) {
                new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'The image could not be processed').checkErrors();
                return;
            }

            await S3.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: destination, Body: newImage }));
        }

        new RestHelper(req, res).setData({ message: 'The asset has been uploaded successfully' }).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'The file was not uploaded').checkErrors();
    }
}

export const config = {
    api: {
        bodyParser: false
    }
};
