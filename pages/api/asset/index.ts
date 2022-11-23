import type { NextApiRequest, NextApiResponse } from 'next';
import { ListObjectsV2Command, ListObjectsV2CommandOutput, S3Client } from '@aws-sdk/client-s3';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<ListObjectsV2CommandOutput | { error: string }>) {
    let path = (req.body.path as string) ?? '';
    if (!path) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Path is missing').checkErrors();
        return;
    }

    if (path.startsWith('/')) {
        path = path.slice(1);
    }

    try {
        const data = await S3.send(
            new ListObjectsV2Command({
                Bucket: process.env.R2_BUCKET_NAME,
                Delimiter: '/',
                Prefix: path
            })
        );

        new RestHelper(req, res).setData(data).send();
    } catch (error) {
        new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'An error occurred while fetching the data').checkErrors();
    }
}
