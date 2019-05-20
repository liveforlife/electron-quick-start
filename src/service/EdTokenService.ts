import { Base64 } from 'js-base64';
import Service from '../application/Serivce';


import FileService from './FileService';
import { edTokenFilePath } from '../config';
import RequestService from './RequestService';


export default class EdTokenService extends Service {
    ed_token?: string | null = null;

    static getInstance(): EdTokenService {
        if (!this.ins) {
            this.ins = new this();
        }
        return this.ins as EdTokenService;
    }


    getEdToken() {
        if (!this.ed_token) {
            this.ed_token = FileService.getInstance().readFileSync(edTokenFilePath);
        }
        return this.ed_token;
    }

    setEdToken(ed_token: string) {
        this.ed_token = ed_token;
        // TODO: 写文件
    }

    removeEdToken() {
        this.ed_token = null;
        FileService.getInstance().deleteFileSync(edTokenFilePath);
    }

    getApiHostUrl() {
        const ed_token = this.getEdToken();
        if (typeof ed_token !== 'string') return;
        const payload = ed_token.split('.');
        const { api_host_url } = JSON.parse(Base64.decode(payload[1]));
        return api_host_url;
    }

    checkEdToken() {
        const api_host_url = this.getApiHostUrl();
        const url = `${api_host_url}auth/check`;
        return RequestService.getInstance().post(url);
    }
}
