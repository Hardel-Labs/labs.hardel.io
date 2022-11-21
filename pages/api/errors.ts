import { NextApiRequest, NextApiResponse } from 'next';
import CorsMiddleWare from '@libs/request/server/cors-middlewars';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await CorsMiddleWare(req, res, {
        methods: ['POST', 'HEAD'],
        origin: '*'
    });

    new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Yay an error').checkErrors();
}
