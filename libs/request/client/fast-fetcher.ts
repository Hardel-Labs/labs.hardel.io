import { mutate } from 'swr';
import { RestRequest } from '@definitions/api';

export default class FastFetcher {
    url: string;
    method: string;
    body: any;
    successMessage: string = 'The request was successfully processed.';
    errorMessage: string = 'An Error occurred while processing your request';
    mutateUrl?: Array<string>;
    headers: HeadersInit = { 'Content-Type': 'application/json' };
    formData?: FormData;

    constructor(url: string, method: string, successMessage?: string, errorMessage?: string) {
        this.method = method;
        this.url = url;
        if (successMessage) {
            this.successMessage = successMessage;
        }

        if (errorMessage) {
            this.errorMessage = errorMessage;
        }
    }

    setMethod(method: string) {
        this.method = method;
        return this;
    }

    getMethod() {
        return this.method;
    }

    setUrl(url: string) {
        this.url = url;
        return this;
    }

    getUrl() {
        return this.url;
    }

    setBody<T>(body: T) {
        this.body = body;
        return this;
    }

    getBody() {
        return this.body;
    }

    setFormData(formData: FormData) {
        this.headers = {};
        this.formData = formData;
        return this;
    }

    getFormData() {
        return this.formData;
    }

    setErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage;
        return this;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    setSuccessMessage(SuccessMessage: string) {
        this.successMessage = SuccessMessage;
        return this;
    }

    getSuccessMessage() {
        return this.successMessage;
    }

    setMutateUrl(mutateUrl: Array<string>) {
        this.mutateUrl = mutateUrl;
        return this;
    }

    getMutateUrl() {
        return this.mutateUrl;
    }

    appendMutateUrl(url: string) {
        if (!this.mutateUrl) {
            this.mutateUrl = [];
        }

        this.mutateUrl.push(url);
        return this;
    }

    setHeaders(headers: HeadersInit) {
        this.headers = headers;
        return this;
    }

    getHeaders() {
        return this.headers;
    }

    private bodyParser() {
        if (this.formData) {
            return this.formData;
        } else if (this.body) {
            return JSON.stringify(this.body);
        }
    }

    async fetching<T>(callback?: (success: boolean) => void): Promise<RestRequest<T>> {
        const data = await fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body: this.bodyParser()
        });
        const rest: RestRequest<T> = await data.json();

        if (rest.request.success) {
            this.mutateUrl && this.mutateUrl.map((url: string) => mutate(url));
            callback && callback(true);
        } else {
            callback && callback(false);
        }

        return rest;
    }
}
