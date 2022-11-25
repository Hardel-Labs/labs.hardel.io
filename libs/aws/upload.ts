import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import S3 from '@libs/aws/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomString } from '@libs/utils';
import { RestRequest } from '@definitions/api';

type UploadOptions = {
    filename?: string;
    width?: number;
    height?: number;
};

export type AssetUploadOutput = {
    url: string;
    width: number;
    height: number;
    filename: string;
};

export default async function uploadAsset(destination: string, file: formidable.File, options?: UploadOptions): Promise<RestRequest<AssetUploadOutput>> {
    try {
        if (file && destination) {
            const resizeWidth = options?.width || 64;
            const resizeHeight = options?.height || 64;
            const filename = options?.filename || randomString(32);

            const fileStream = fs.createReadStream(file.filepath);
            const newImage = await sharp(fileStream.path).resize(resizeWidth, resizeHeight).webp().toBuffer();
            if (!newImage) {
                return new RestHelper().addError(RestErrorType.InternalServerError, 'The image could not be processed').getResponse();
            }
            await S3.send(
                new PutObjectCommand({
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: `${destination}/${filename}.webp`,
                    Body: newImage
                })
            );

            return new RestHelper().setData({ url: `${process.env.ASSET_PREFIX}/${destination}/${filename}` }).getResponse();
        } else {
            return new RestHelper().addError(RestErrorType.InternalServerError, 'File or Destination is missing').getResponse();
        }
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'The file was not uploaded').getResponse();
    }
}
