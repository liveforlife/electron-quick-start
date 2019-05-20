import { BrowserWindow, dialog, BrowserWindowConstructorOptions, MessageBoxOptions } from 'electron';

import Service from '../application/Serivce';

import { getIconPath, isDevelopment, getAppUrl, getEnvironment, appVersion } from '../config';

// import RequestService from './RequestService';
import FileService from './FileService';
import UrlService from './UrlService';


export default class WindowService extends Service {
    constructor() {
        super();
        this.mainWin = null;
    }


    static getInstance(): WindowService {
        if (!this.ins) {
            this.ins = new this();
        }
        return this.ins as WindowService;
    }

    mainWin: BrowserWindow | null;

    /**
     * 创建新窗口，只在service 内部使用
     *
     * @param {*} options
     * @returns
     * @memberof WindowService
     */
    createWindow(options?: BrowserWindowConstructorOptions) {
        const win = new BrowserWindow({
            width: 1280,
            height: 768,
            show: false, // 加载完成之前不显示
            fullscreen: false, // 是否全屏
            fullscreenable: true, // 是否可全屏
            autoHideMenuBar: true, // 自动隐藏菜单栏
            icon: getIconPath(), // 图标
            webPreferences: {
                plugins: true,
                webSecurity: false,
                allowRunningInsecureContent: true,
                defaultFontFamily: {
                    standard: 'Microsoft YaHei',
                    sansSerif: 'Microsoft YaHei',
                },
            },
            ...options,
        });

        // 开发环境自动打开 调试工具
        if (isDevelopment) {
            win.webContents.openDevTools();
        }

        win.on('ready-to-show', () => {
            win.show();
        });

        win.webContents.on('crashed', (...args) => {
            console.error('crashed', args);
        });

        // TODO: 好像没啥用，可以删了？
        win.on('app-command', (e, cmd) => {
            // 当用户点击鼠标返回按钮时，导航窗口会后退
            if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
                win.webContents.goBack();
            }
        });

        return win;
    }

    // TODO: 实现sendMessage
    sendMessage(msg: string, win?: BrowserWindow) {
        if (!win) {
            if (this.mainWin) {
                this.mainWin.webContents.send(msg);
            } else {
                return;
            }
        } else {
            win.webContents.send(msg);
        }
    }


    /**
     * 初始化主窗口
     *
     * @memberof WindowService
     */
    initMainWindow() {
        // 创建浏览器窗口
        const win = this.createWindow();
        this.mainWin = win;

        function loadUrl(cdnAppURl?: string) {
            // 获取 redirec 地址
            const redirectAddress = FileService.getInstance().readServerUrlFile();

            if (redirectAddress) {
                win.loadURL(redirectAddress);
            } else if (cdnAppURl) {
                win.loadURL(cdnAppURl);
            } else {
                win.loadURL(getAppUrl().iframe);
            }
        }

        UrlService.getInstance().updateAppUrl()
            .then((res: any) => {
                if (res) {
                    loadUrl(res.s2);
                } else {
                    loadUrl();
                }
            });


        /**
             * 退出全屏时触发，取消置顶
             */
        win.on('leave-full-screen', () => {
            this.sendMessage('leaveFullScreen');
            console.log('leave-full-screen', win.isAlwaysOnTop());
        });

        win.on('closed', () => { this.mainWin = null; });

        win.webContents.on('dom-ready', () => {
            win.setTitle(`未来教室  ${getEnvironment()} v${appVersion}`);
        });
    }

    /**
     * 显示主窗口
     *
     * @memberof WindowService
     */
    showMainWindow() {
        if (!this.mainWin) {
            this.initMainWindow();
        } else {
            this.mainWin.show();
        }
    }

    changeMainUrl(url: string) {
        if (this.mainWin) {
            this.mainWin.loadURL(url);
        }
    }


    /**
     * 显示 网络错误提示
     *
     * @returns
     * @memberof WindowService
     */
    netWorkError() {
        return new Promise((res) => {
            dialog.showMessageBox({
                title: '未来教室学生版',
                message: '当前网络异常，请检查网络连接后重试',
                buttons: ['确认'],
                noLink: true,
                cancelId: 999,
            }, res);
        });
    }

    showMainMessageBox(option: MessageBoxOptions) {
        if (this.mainWin) {
            dialog.showMessageBox(this.mainWin, option);
        }
    }
}
