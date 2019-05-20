import { App } from 'electron';

/**
 * controller 基类
 *
 * @export
 * @class Controller
 */
export default class Controller {

    constructor(elecApp: App) {
        this.elecApp = elecApp;
    }

    elecApp!: App;


    /**
     * app 开始
     *
     * @memberof Controller
     */
    elecInit() {}

    /**
     * app ready 触发
     *
     * @memberof Controller
     */
    elecReady() {}

    /**
     * 第二个实例生成
     *
     * @memberof Controller
     */
    elecSecondInstance() {}

    /**
     * 窗口将要关闭
     *
     * @memberof Controller
     */
    elecWindowAllClosed() {}


    /**
     * electron 将要关闭
     *
     * @memberof Controller
     */
    elecWillQuit() {}

    /**
     * app 退出时触发
     *
     * @memberof Controller
     */
    elecQuit() {}


    /**
     * mac上 关闭窗口后重新点击 app 触发
     *
     * @memberof Controller
     */
    elecActivate() {}
}
