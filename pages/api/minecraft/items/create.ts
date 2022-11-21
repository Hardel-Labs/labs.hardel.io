import fs from 'fs';
import sharp from 'sharp';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { RestErrorType } from '@libs/constant';
import CorsMiddleWare from '@libs/request/server/cors-middlewars';
import formidableParser from '@libs/request/server/formidable-parser';
import RestHelper from '@libs/request/server/form-checker';
import AuthMiddleware from '@libs/request/server/auth-middleware';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { RoleType } from '@prisma/client';
import prisma from '@libs/prisma';

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_KEY as string
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await CorsMiddleWare(req, res, {
        methods: ['POST', 'HEAD'],
        origin: '*'
    });

    const auth = await AuthMiddleware(req, res, { role: RoleType.ADMIN });
    if (!auth.isAuthenticated || !auth.hasRole) {
        new RestHelper(req, res).addError(RestErrorType.Unauthorized, 'You have not the permission to access this resource').checkErrors();
        return;
    }

    const form = await formidableParser(req);
    const file = form.files.asset as formidable.File;
    const minecraftId = form.fields.id as string;
    const name = form.fields.name as string;
    const tag = form.fields.tags as string;
    const rawCategory = form.fields.categories as string;
    const fileStream = fs.createReadStream(file.filepath);

    console.log('c');

    const errors = new RestHelper(req, res)
        .checkIsVariableIsDefined(minecraftId, 'id')
        .checkIsVariableIsDefined(name, 'name')
        .checkIsVariableIsDefined(rawCategory, 'categories')
        .checkIsVariableIsDefined(file, 'file')
        .checkIsVariableIsDefined(fileStream, 'File Stream')
        .checkMaxLength(minecraftId, 80)
        .checkMaxLength(name, 80)
        .isCorrectMinecraftId(minecraftId)
        .isArray(rawCategory)
        .getErrors();

    if (errors.errors.length > 0) {
        res.status(400).json(errors);
        return;
    }

    const newFileNames = `${minecraftId.split(':')[1]}.webp`;
    const destination = `minecraft/items/vanilla/${newFileNames}`;
    const parsedCategories = JSON.parse(rawCategory) as number[];
    const newImage = await sharp(fileStream.path).resize(64, 64).webp().toBuffer();
    if (!newImage) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'The image could not be processed').checkErrors();
        return;
    }

    try {
        await S3.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: destination, Body: newImage }));
        const sendData = await prisma.item.create({
            data: {
                name,
                tag,
                minecraftId,
                asset: `vanilla/${newFileNames}`,
                categories: { connect: parsedCategories.map((id) => ({ id })) }
            }
        });

        if (!sendData) {
            new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Something went wrong when data was sent to the database').checkErrors();
            return;
        }

        new RestHelper(req, res).setData(sendData).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'The file was not uploaded').checkErrors();
    }
}

export const config = {
    api: {
        bodyParser: false
    }
};
