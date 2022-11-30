import { RestRequest } from '@definitions/api';

const fetcher = async (url: string) => {
    const request = await fetch(url);
    if (!request.ok) {
        throw new Error('Request failed');
    }

    const response: RestRequest<any> = await request.json();
    return response.data;
};

export default fetcher;
