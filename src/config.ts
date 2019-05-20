import path from 'path';
import { getLogPath } from './utils/utils';
import settings from '../package.json';

export const logFilePath = getLogPath(settings.name) as string; // 文件目录
export const edTokenFilePath = path.join(logFilePath, 's7pcEppEdtoken.log'); // ed_token 文件地址
export const updateInfoFilePath = path.join(logFilePath, 's7pcLastUpdateInfo.log'); // 更新信息 文件地址
export const serverUrlFilePath = path.join(logFilePath, 's7pcServerUrl.log'); // 远程服务器地址 文件地址


export const getEnvironment = () => (process.env.environment || 'release');
export const appVersion = settings.version;
export const appBuildId = settings.buildId;

export const appUrl: {
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

export function getAppUrl() {
    return appUrl[getEnvironment()];
}

export const getIconPath = () => path.join(__dirname, 'static/img/logo.ico');

export const isDevelopment = process.env.NODE_ENV !== 'production';
export const canChangeEnv = process.env.ENV_CHANGE === 'true';

