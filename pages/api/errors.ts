import { NextApiRequest, NextApiResponse } from 'next';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    new RestHelper(req, res).addError(RestErrorType.InternalServerError, 'Yay an error').checkErrors();
}
