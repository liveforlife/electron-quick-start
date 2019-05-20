import { app, BrowserWindow } from 'electron';
import { exec } from 'child_process';
// import fetch from 'node-fetch';


/**
 * 打开文件
 *
 */
export function openFile(path: string, callback?: Function) {
    if (!path) console.error('no path', path);
    let cmd = '';
    switch (process.platform) {
        case 'win32':
            console.log('我是windows电脑');
            cmd = 'start';
            break;
        case 'linux':
            cmd = 'xdg-open';
            break;
        case 'darwin':
            cmd = 'open';
            break;
        default:
            console.error('unknown paltform');
    }


    // AppName   filename  Args 的方式打开。
    exec(`${cmd} ${path}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`node exec ${cmd} ${path} `, error);
        }
        if (callback) {
            callback();
        }
        console.log('stdout', stdout);
    });

    console.log('openFile', path);
}

/**
 *
 *
 * @export
 * @param {string} url
 * @returns {Promise} 返回结果
 */
/* export function checkUpdate(url: string) {
    const setting = require('../package.json');
    let appKey = '';
    switch (process.platform) {
        case 'win32': {
            appKey = 'FaycWpiCTqJPpXKvdilM0Z1znYoaTQbq';
            break;
        }
        case 'linux': {
            console.error('暂无 linux 版本');
            break;
        }
        case 'darwin': {
            appKey = 's9sDRjcryc4FTtTS40xoUUvjxtPvAon2';
            // appKey = 'FaycWpiCTqJPpXKvdilM0Z1znYoaTQbq'; // DEBUG
            break;
        }
        default: {
            console.error('unknown paltform');
        }
    }

    const fetchUrl = `${url}/core/checkVersion?app_key=${appKey}&build=${setting.buildId}`;

    console.log(fetchUrl);

    return fetch(fetchUrl)
        .then(response => response.json())
        .then(res => res)
        .catch((error) => {
            console.error(error);
            alert('网络中断，请检查网络环境', JSON.stringify(error));
        });
} */

// 设置日志路径
export function getLogPath(appName?: string) {
    if (!appName) return false;

    const home = process.env.HOME;

    switch (process.platform) {
        case 'linux': {
            if (!home) return false;
            return `${home}/.config/${appName}`;
        }
        // macOS
        case 'darwin': {
            if (!home) return false;
            return `${home}/Library/Logs/${appName}`;
        }
        // windows
        default: {
            if (!process.env.APPDATA) return false;
            return `${process.env.APPDATA}\\${appName}`;
        }
    }
}

/**
 * 生成 下载文件 type
 *
 * @export
 * @param {*} filename
 * @returns
 */
export function generateFileFilter(filename: string) {
    if (typeof filename !== 'string') {
        return [];
    }

    const fileExtensions = filename.substring(filename.lastIndexOf('.') + 1); // 文件后缀
    return [{ name: fileExtensions, extensions: [fileExtensions] }];
}

/**
 * window 实例 加载目标地址
 *
 * @export
 * @param {*} win
 * @param {string} url
 */
export function loadUrl(win: BrowserWindow, url: string, params?: string) {
    if (params) {
        win.loadURL(`${url}?${params}`);
    } else {
        win.loadURL(`${url}?${new Date().getTime()}`);
    }
}

/**
 * 退出应用
 *
 * @export
 */
export function exitApp() {
    app.exit(0);
    app.quit();
}
