import { app } from 'electron';
import Controller from './Controller';

export default class Application {
    /**
     * Creates an instance of Application.
     * @param {Array<{
     *  Controller: any,
     * }>} controllerSettingList
     * @memberof Application
     */
    constructor(controllerSettingList: Array<{Controller: typeof Controller}>) {
        this.controllerSettingList = controllerSettingList;
    }

    controllerSettingList: Array<{
        Controller: typeof Controller,
        ins?: Controller,
    }> = [];

    start() {
        // 初始化 controller， 并触发 init 事件
        this.controllerSettingList = this.controllerSettingList.map((controllerSetting) => {
            // 实例化Controller
            const ins = new controllerSetting.Controller(app);
            ins.elecInit(); // 触发 controller init 函数
            return {
                ...controllerSetting,
                ins, // 绑定 controller 实例
            };
        });


        // 注册app的监听事件，对应事件触发时触发controller的start函数
        this.controllerSettingList.forEach((controllerSetting) => {
            if (controllerSetting.ins) {
                app.on('second-instance', controllerSetting.ins.elecSecondInstance.bind(controllerSetting.ins));
                app.on('ready', controllerSetting.ins.elecReady.bind(controllerSetting.ins));
                app.on('activate', controllerSetting.ins.elecActivate.bind(controllerSetting.ins));
                app.on('window-all-closed', controllerSetting.ins.elecWindowAllClosed.bind(controllerSetting.ins));
                app.on('will-quit', controllerSetting.ins.elecWillQuit.bind(controllerSetting.ins));
                app.on('quit', controllerSetting.ins.elecQuit.bind(controllerSetting.ins));
            }
        });
    }
}
