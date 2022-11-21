import { RestErrorType } from '@libs/constant';

type RestRequest<T> = SuccessRestResponse<T> | ErrorRestResponse;

type SuccessRestResponse<T> = {
    data: T;
    request: ApiRequestData;
    pagination?: ApiPagination;
};

type ErrorRestResponse = {
    data: {
        errors: Error[];
    };
    request: ApiRequestData;
};

type ApiRequestData = {
    statusCode: number;
    success: boolean;
};

type Error = {
    code: RestErrorType;
    reason: string;
};

type ApiPagination = {
    total: number;
    limit?: number;
    page?: number;
    start?: number;
    end?: number;
    totalPage?: number;
};

type FormError = {
    errors: Error[];
    success: boolean;
};
