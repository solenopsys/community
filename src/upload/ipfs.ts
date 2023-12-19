import axios, {AxiosResponse} from 'axios';

interface CID {
    '/': string;
}

interface DagPutResponse {
    Cid: CID;
}

interface AddResponse {
    Hash: string;
}

class IpfsApi {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }


    async saveObject(obj: Object): Promise<string> {
        const formData = new FormData();


        let s = JSON.stringify(obj);
        const data: Blob = new Blob([s], {type: 'application/json'});


        formData.append('file', data, 'file');

        const params = {
            'store-codec': 'dag-cbor',
            'input-codec': 'dag-json',
            'hash': 'sha2-256',
            'allow-big-block': 'false'
        };

        const putUrl = `${this.url}/dag/put`;

        try {
            const response: AxiosResponse = await axios.post(putUrl, formData, {
                params: params
            });
            return response.data.Cid['/'];
        } catch (error) {
            throw error;
        }
    }

    async saveBytes(d: string): Promise<string> {

        const formData = new FormData();
        const data: Blob = new Blob([d], {type: 'application/json'});

        const putUrl = `${this.url}/add`;

        formData.append('file', data, 'file');

        try {
            const response: AxiosResponse = await axios.post(putUrl, formData, {});
            let hash = response.data.Hash;

            return hash;
        } catch (error) {
            throw error;
        }
    }


}

export default IpfsApi;
