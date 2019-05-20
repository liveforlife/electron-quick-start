import Controller from '../application/Controller';
import { ipcMain } from 'electron';

export default class S7Controller extends Controller {


    elecInit() {
        ipcMain.on('XXX', this.XXX);
        ipcMain.on('XXX', this.XXX);
        ipcMain.on('XXX', this.XXX);
        ipcMain.on('XXX', this.XXX);
    }

    protected XXX() {}

    public sendLogout() {
        // ipcMain.
    }
}
