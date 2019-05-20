import { Menu, MenuItemConstructorOptions } from 'electron';

import Controller from '../application/Controller';

import { canChangeEnv, appVersion, appBuildId, getEnvironment } from '../config';
import WindowService from '../service/WindowService';
import UrlService from '../service/UrlService';

import { exitApp } from '../utils/utils';

export default class MenuController extends Controller {
    elecInit() {
        console.log('MenuController init');
    }

    elecReady() {
        let envChange: MenuItemConstructorOptions[] = [];

        // 用户版本无法更换环境
        if (canChangeEnv) {
            // 根据 appUrl 中的键值对生成环境
            const appUrl = UrlService.getInstance().getAppUrls();
            envChange = Object.keys(appUrl).map(key => ({
                label: `切换为${key}环境`,
                click() {
                    process.env.environment = key; // TODO: 切换为能力校验，直接使用当前window的url进行环境判断
                    WindowService.getInstance().changeMainUrl(appUrl[key].iframe);
                },
            }));
        }
        // 快捷键模板
        const template: MenuItemConstructorOptions[] = [
            {
                label: 'Application',
                submenu: [
                    {
                        label: 'About Application',
                        // selector: 'orderFrontStandardAboutPanel:',
                    }, {
                        label: '应用信息',
                        click() {
                            WindowService.getInstance().showMainMessageBox({
                                message: `版本号： ${appVersion}`,
                                detail: `buildId：${appBuildId} 环境: ${getEnvironment()}`,
                            });
                        },
                    }, {
                        type: 'separator',
                    }, {
                        label: 'Quit',
                        accelerator: 'CommandOrControl+Q',
                        click() {
                            exitApp();
                        },
                    },
                    ...envChange,
                ],
            }, {
                label: 'Edit',
                submenu: [
                    {
                        label: 'Undo',
                    }, {
                        label: 'Redo',
                    }, {
                        type: 'separator',
                    }, {
                        label: 'Cut',
                    }, {
                        label: 'Copy',
                    }, {
                        label: 'Paste',
                    }, {
                        label: 'selectall',
                    },
                ],
            }, {
                label: 'View',
                submenu: [
                    {
                        role: 'reload',
                    }, {
                        role: 'forcereload',
                    }, /*  {
                                role: 'toggledevtools',
                    }, */ {
                        type: 'separator',
                    }, {
                        role: 'resetzoom',
                    },
                    // {
                    //     role: 'zoomin',
                    // },
                    // {
                    //     role: 'zoomout',
                    // },
                    {
                        type: 'separator',
                    }, /*  {
                        role: 'toggleFullScreen',
                    }, */ {
                        label: 'cancelFullScreen',
                        accelerator: 'ESC',
                        click(menuItem, browserWindow) {
                            browserWindow.setAlwaysOnTop(false);
                            browserWindow.setFullScreen(false);
                            // browserWindow.openDevTools();
                        },
                    },
                ],
            }, {
                role: 'window',
                submenu: [
                    {
                        role: 'minimize',
                    }, {
                        role: 'close',
                    }, {
                        label: '开发者工具',
                        click() {
                            WindowService.getInstance().sendMessage('showModal');
                        },
                    },
                ],
            },
        ];

        Menu.setApplicationMenu(Menu.buildFromTemplate(template)); // 配置菜单栏
    }
}
