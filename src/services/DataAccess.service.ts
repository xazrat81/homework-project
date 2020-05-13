
class DataAccess {
    public headers: { [k: string]: any } = {};

    constructor() {
        this.setDefaultHeaders();
    }

    public async get(resource: string) {
        return await this._request(resource, 'GET');
    }

    public async post(resource: string, payload: Record<string, any>) {
        return await this._request(resource, 'POST', payload);
    }

    public async put(resource: string, payload: Record<string, any>) {
        return await this._request(resource, 'PUT', payload);
    }

    public async patch(resource: string, payload: Record<string, any>) {
        return await this._request(resource, 'PATCH', payload);
    }

    public async delete(resource: string) {
        return await this._request(resource, 'DELETE');
    }

    public async _request(resource: string, method: string, payload: Record<string, any> | null = null) {
        const options: { [k: string]: any } = {};

        if (payload != null) {
            options.body = JSON.stringify(payload);
        }
        options.method = method;

        this.setDefaultHeaders();
        // options.credentials = 'include';

        options.headers = this.headers;

        const response = await fetch(resource, options);

        if (response.status === 403 || response.status === 404 || response.status === 500) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }

        if (!response.ok) {
            console.error('Failed to response');
            throw new Error('Ошибка получения данных');
        }

        if (response.status === 204) return;

        try {
            return await response.json();
        } catch(err) {
            console.error(err);
            return;
        }
    }

    public setDefaultHeaders() {
        this.headers = {};
        this.headers['Accept'] = 'application/json';
        this.headers['Content-Type'] = 'application/json';
    }
}

export const DataAccessService = new DataAccess();
