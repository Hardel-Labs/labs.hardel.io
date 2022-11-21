import { NextApiRequest, NextApiResponse } from 'next';
import { RestErrorType } from '@libs/constant';
import FormValidator from '@libs/form-checker';
import { ApiPagination, ErrorRestResponse, RestRequest, SuccessRestResponse } from '@definitions/api';
import { SafeNumber } from '@definitions/global';

export default class RestHelper<T> extends FormValidator {
    restErrors: ErrorRestResponse = {
        data: {
            errors: []
        },
        request: {
            statusCode: 400,
            success: false
        }
    };
    private data?: T;
    private pagination?: ApiPagination;

    constructor(private request?: NextApiRequest, private response?: NextApiResponse) {
        super();
        this.request = request;
        this.response = response;

        return this;
    }

    setData(data: T) {
        this.data = data;
        return this;
    }

    setPagination(limit: SafeNumber, page: SafeNumber, count: number) {
        this.checkIsVariableIsDefined(limit, 'limit');
        this.checkPositiveNumber(limit, 'limit');
        this.checkIsVariableIsDefined(page, 'page');
        this.checkPositiveNumber(page, 'page');
        this.checkIsVariableIsDefined(count, 'count');
        this.checkPositiveNumber(count, 'count');

        const take = limit ? Number(limit) : undefined;
        const skip = page && take ? (Number(page) + 1) * Number(take) : 0;

        this.pagination = {
            total: count,
            limit: take,
            page: page ? Number(page) : undefined,
            start: skip,
            end: take ? skip + take : undefined,
            totalPage: take ? Math.ceil(count / take) : undefined
        };

        return this;
    }

    checkRequiredFields(fields: string[]) {
        fields.forEach((field) => {
            if (!this.request?.body[field]) {
                this.formError?.errors.push({
                    code: RestErrorType.BadParameter,
                    reason: `Missing ${field} parameter`
                });
            }
        });

        return this;
    }

    getResponse(): RestRequest<any> {
        this.setRestError();
        if (this.hasRestError()) {
            return this.restErrors;
        } else {
            if (this.data) {
                return {
                    data: this.data,
                    pagination: this.pagination,
                    request: {
                        success: true,
                        statusCode: 200
                    }
                };
            } else {
                return {
                    data: {
                        errors: [
                            {
                                code: RestErrorType.InternalServerError,
                                reason: 'No data or error provided'
                            }
                        ]
                    },
                    request: {
                        success: false,
                        statusCode: 500
                    }
                };
            }
        }
    }

    checkErrors() {
        this.setRestError();
        if (this.hasRestError()) {
            this.response?.status(this.restErrors.request.statusCode).json(this.restErrors);
            return true;
        }

        return false;
    }

    send() {
        this.setRestError();
        if (!this.data && !this.hasErrors()) {
            this.addError(RestErrorType.InternalServerError, 'No data or error provided');
        }

        if (this.checkErrors()) {
            return;
        }

        const data: SuccessRestResponse<T> = {
            data: this.data!,
            pagination: this.pagination,
            request: {
                success: true,
                statusCode: 200
            }
        };

        this.response?.status(200).json(data);
    }

    private setRestError() {
        if (this.hasErrors()) {
            this.restErrors.data.errors = this.formError.errors;
        }
    }

    private hasRestError() {
        return this.restErrors?.data.errors.length > 0;
    }
}
