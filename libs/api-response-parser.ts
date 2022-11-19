import { SafeNumber } from '@definitions/global';
import { ApiPagination, ErrorRestResponse, SuccessRestResponse } from '@definitions/api';
import { RestErrorType } from '@libs/constant';

class ApiResponseParser<T> {
    hasError: boolean = false;
    private error?: ErrorRestResponse;
    private pagination?: ApiPagination;
    private data?: T;

    constructor(limit?: SafeNumber, page?: SafeNumber, count?: number) {
        if (limit && !page) {
            this.addError(400, RestErrorType.BadParameter, 'Missing page parameter if limit is provided');
        }

        if (limit && !count) {
            this.addError(400, RestErrorType.InternalServerError, 'Internal server error the count is normally automatically provided by prisma but it is not');
        }

        if (limit && page && count) {
            this.setPagination(limit, page, count);
        }
    }

    setData(data: T) {
        this.data = data;
    }

    addError(status: number, error: RestErrorType, reason: string) {
        if (this.hasError) {
            this.error?.request.error.push({
                code: error,
                reason
            });
        } else {
            this.setError(status, error, reason);
        }
    }

    setPagination(limit: SafeNumber, page: SafeNumber, count: number) {
        if (!this.checkPositiveNumber(limit, 'limit')) {
            return;
        }

        if (!this.checkPositiveNumber(page, 'page')) {
            return;
        }

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
    }

    private setError(status: number, error: RestErrorType, reason: string) {
        this.hasError = true;
        this.error = {
            request: {
                statusCode: status,
                success: false,
                error: [
                    {
                        code: error,
                        reason
                    }
                ]
            }
        };
    }

    private checkPositiveNumber(number: SafeNumber, name: string): boolean {
        if (number) {
            const limitNumber = Number(number);
            if (isNaN(limitNumber)) {
                this.addError(400, RestErrorType.BadParameter, `Invalid number for ${name}`);
                return false;
            }

            if (limitNumber < 1) {
                this.addError(400, RestErrorType.BadParameter, `Invalid number for ${name} must be greater than 0`);
                return false;
            }
        } else {
            this.addError(400, RestErrorType.BadParameter, `Missing ${name} parameter`);
            return false;
        }

        return true;
    }

    getResponse() {
        if (!this.data && !this.error) {
            return (this.error = {
                request: {
                    success: false,
                    statusCode: 500,
                    error: [
                        {
                            code: RestErrorType.InternalServerError,
                            reason: 'No data or error found'
                        }
                    ]
                }
            });
        }

        if (this.hasError && this.error) {
            return this.error;
        }

        const data: SuccessRestResponse<T> = {
            data: this.data!,
            pagination: this.pagination,
            request: {
                success: true,
                statusCode: 200
            }
        };

        return data;
    }
}

export default ApiResponseParser;
