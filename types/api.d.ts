import { RestErrorType } from '@libs/constant';

type RestRequest<T> = SuccessRestResponse<T> | ErrorRestResponse;

type SuccessRestResponse<T> = {
    data: T;
    request: ApiRequestData;
    pagination?: ApiPagination;
};

type ErrorRestResponse = {
    request: {
        error: {
            code: RestErrorType;
            reason: string;
        }[];
    } & ApiRequestData;
};

type ApiRequestData = {
    statusCode: number;
    success: boolean;
};

type ApiPagination = {
    total: number;
    limit?: number;
    page?: number;
    start?: number;
    end?: number;
    totalPage?: number;
};
