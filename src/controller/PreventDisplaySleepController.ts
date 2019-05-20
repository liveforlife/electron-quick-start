import { powerSaveBlocker } from 'electron';

import Controller from '../application/Controller';

export default class PreventDisplaySleepController extends Controller {
    elecInit() {
        const id = powerSaveBlocker.start('prevent-display-sleep'); // 防止息屏
        console.log('是否开启防止息屏：', powerSaveBlocker.isStarted(id));
    }
}
