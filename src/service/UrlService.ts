import Service from '../application/Serivce';

import RequestService from './RequestService';
import { getEnvironment } from '../config';

export default class UrlService extends Service {
    constructor() {
        super();
    }


    static getInstance(): UrlService {
        if (!this.ins) {
            this.ins = new this();
        }
        return this.ins as UrlService;
    }

    private appUrl: {
        [k: string]: {
            iframe: string,
            api: string,
            versionCenter?: string,
        },
    } = {
        localhost: {
            iframe: 'http://localhost:8000/',
            api: 'http://develop.edinnovaedu.com:25000/',
            versionCenter: 'http://develop.edinnovaedu.com:25050/',
        },
        develop: {
            iframe: 'http://develop.edinnovaedu.com:25002/',
            api: 'http://develop.edinnovaedu.com:25000/',
            versionCenter: 'http://develop.edinnovaedu.com:25050/',
        },
        alpha: {
            iframe: 'https://classroom-alpha.edinnovaedu.com/',
            api: 'https://api-alpha.edinnovaedu.com/',
            versionCenter: 'https://version-center-alpha.edinnovaedu.com/',
        },
        preview: {
            iframe: 'https://classroom-preview.edinnovaedu.com/',
            api: 'https://api-preview.edinnovaedu.com/',
            versionCenter: 'https://version-center-preview.edinnovaedu.com/',
        },
        release: {
            iframe: 'https://classroom.edinnovaedu.com/',
            api: 'https://api.edinnovaedu.com/',
        },
    };

    getAppUrls() {
        return this.appUrl;
    }

    updateAppUrl() {
        return new Promise((res) => {
            RequestService.getInstance().getCdnUrl()
                .then((data) => {
                    /*
                { s2: 'http://develop.edinnovaedu.com:25002',
                    epp: 'http://develop.edinnovaedu.com:25020',
                    api: 'http://develop.edinnovaedu.com:25000',
                    wsServer: 'http://develop.edinnovaedu.com:25010',
                    userStateServer: 'http://develop.edinnovaedu.com:25080',
                    versionCenter: 'http://develop.edinnovaedu.com:25050' }
                 */
                    this.appUrl[getEnvironment()] = {
                        ...data,
                        iframe: data.s2,
                    };
                    res(this.appUrl[getEnvironment()]);
                })
                .catch(res);
        });
    }
}
