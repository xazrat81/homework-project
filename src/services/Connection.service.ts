const rootUrl: string = process.env.VUE_APP_ROOT_URL;

class Connection {

    public getRootUrl(): string {
        return rootUrl;
    }
}

export const ConnectionService = new Connection();