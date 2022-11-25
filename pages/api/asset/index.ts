import type { NextApiRequest, NextApiResponse } from 'next';
import { ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import S3 from '@libs/aws/client';

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
