import Controller from '../application/Controller';

import { exitApp } from '../utils/utils';
import { appVersion } from '../config';

import FileService from '../service/FileService';
import RequestService from '../service/RequestService';
import EdTokenService from '../service/EdTokenService';
import WindowService from '../service/WindowService';


// function normalLogin() {
//     if (win) {
//         console.log('win存在');
//     } else {
//         createWindow();
//         createMainWindow();
//         setMenu();
//         isOnlineFn();
//     }
// }


export default class MainController extends Controller {
    /**
     * 写入日志 数据持久化
     *
     */
    async createLog() {
        // 如果存入的version与当前应用的version 一致
        const ed_token = EdTokenService.getInstance().getEdToken();
        const appInfo = FileService.getInstance().readUpdateInfoFile();


        if (appInfo && ed_token) {
            // 硬更新 且 存入的oldVersion 等于 当前获取的版本version
            const logInfo = JSON.parse(appInfo);
            if (logInfo.updateType === 3 && logInfo.newVersion === appVersion) {
                return false;
            }

            await RequestService.getInstance().createLog(JSON.stringify({
                ...logInfo,
                serverType: 's2',
            }));
            // 删除 updateInfo 文件
            FileService.getInstance().deleteUpdateInfoFile();
        }
        return true;
    }

    async elecReady() {
        const ed_token = EdTokenService.getInstance().getEdToken();

        await this.createLog();

        // 判断是否有网
        if (await RequestService.getInstance().isOnline()) {
            if (ed_token) { // 有ed_token
                // 检查ed-token是否有效

                // TODO: launchUpdate干嘛的？
                // launchUpdate = true;
                EdTokenService.getInstance().checkEdToken()
                    .then((res) => {
                        if (res && res.error === 0) {
                            // TODO: 检查灰度发布
                            // checkNewUpdate();
                        } else {
                            // TODO: 正常登录流程
                            // 普通登录流程
                            // normalLogin();
                            WindowService.getInstance().showMainWindow();
                            EdTokenService.getInstance().removeEdToken();
                        }
                        console.log('有ed-token');
                        // DEBUG
                        WindowService.getInstance().showMainWindow();
                    }).catch(() => { WindowService.getInstance().showMainWindow(); });
            } else {
                console.log('没有ed-token');
                // TODO: launchUpdate干嘛的？
                // launchUpdate = false;
                // TODO: requestFailed 干嘛的？
                // if (requestFailed) {
                //     return false;
                // }

                // DEBUG
                WindowService.getInstance().showMainWindow();


                // createWindow();
                // createMainWindow();
                // setMenu();
                // isOnlineFn();
            }
        } else {
            // 离线
            WindowService.getInstance().netWorkError().then(exitApp);
        }
    }

    elecWindowAllClosed() {
        exitApp();
    }
}
