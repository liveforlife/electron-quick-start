import fetch, {
    BodyInit,
    HeadersInit,
} from 'node-fetch';
import ISONLINE from 'is-online'; // 检测网络在线/离线

import Service from '../application/Serivce';
import { getAppUrl, getEnvironment } from '../config';
import EdTokenService from './EdTokenService';

export default class RequestService extends Service {

    static getInstance(): RequestService {
        if (!this.ins) {
            this.ins = new this();
        }
        return this.ins as RequestService;
    }


    private get(url: string, params?: BodyInit, headers?: HeadersInit) {
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: EdTokenService.getInstance().getEdToken(),
                ...headers,
            },
            body: params,
        })
            .then(response => response.json()); // 转换为json对象
    }


    post(url: string, params?: BodyInit, headers?: HeadersInit) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: EdTokenService.getInstance().getEdToken(),
                ...headers,
            },
            body: params,
        })
            .then(response => response.json()); // 转换为json对象
    }


    createLog(params?: BodyInit) {
        const url = `${getAppUrl().versionCenter}logs`;
        return this.post(url, params);
    }

    isOnline() {
        return ISONLINE();
    }

    getCdnUrl() {
        return this.get(`https://cdn.edinnovaedu.com/server/${getEnvironment()}_server_info.json`);
    }
}
