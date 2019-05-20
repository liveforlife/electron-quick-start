import fs from 'fs';

import Service from '../application/Serivce';
import { updateInfoFilePath, serverUrlFilePath } from '../config';

export default class FileService extends Service {


    static getInstance(): FileService {
        if (!this.ins) {
            this.ins = new this();
        }
        return this.ins as FileService;
    }


    readFileSync(filePath: string) {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (e) {
            console.error(`读取 ${filePath} 文件失败`, filePath, e);
            return '';
        }
    }

    writeFileSync() {

    }

    /**
     * 删除文件
     *
     * @param {*} filePath
     * @returns
     * @memberof FileService
     */
    deleteFileSync(filePath: string) {
        return new Promise((res, rej) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`删除 ${filePath} 文件失败`, err);
                    rej();
                } else {
                    res();
                }
            });
        });
    }

    readUpdateInfoFile() {
        return this.readFileSync(updateInfoFilePath);
    }
    deleteUpdateInfoFile() {
        return this.deleteFileSync(updateInfoFilePath);
    }

    readServerUrlFile() {
        return this.readFileSync(serverUrlFilePath);
    }
}
