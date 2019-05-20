import fs from 'fs';

import Util from '../application/Util';

/**
 * TODO: 所有改成异步
 *
 * @export
 * @class File
 * @extends {Util}
 */
export default class File extends Util {


    static getInstance(): File {
        if (!this.ins) {
            this.ins = new this();
        }
        return this.ins as File;
    }


    /**
     * 读文件， 若无文件则返回string
     *
     * @param {string} filePath
     * @returns {string}
     * @memberof File
     */
    readFileSync(filePath: string): string {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (e) {
            console.error(`读取 ${filePath} 文件失败`, filePath, e);
            return '';
        }
    }

    /**
     * 写文件，若无文件则先创建，然后写文件
     *
     * @param {string} filePath
     * @param {string} data
     * @returns
     * @memberof File
     */
    writeFileAsync(filePath: string, data: string) {
        return new Promise((res) => {
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    console.error(`写入 ${filePath} 文件失败`, err);
                    res(err);
                } else {
                    res();
                }
            });
        });
    }

    /**
     * 删文件，若无文件则直接通过
     *
     * @param {string} filePath
     * @returns
     * @memberof File
     */
    deleteFileAsync(filePath: string) {
        return new Promise((res, rej) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`删除 ${filePath} 文件失败`, err);
                    res(err);
                } else {
                    res();
                }
            });
        });
    }
}
