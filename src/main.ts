// 获取 env 配置
import envObj from './env';

Object.keys(envObj).forEach((envKey: string) => {
    process.env[envKey] = (envObj as any)[envKey] ;
});

import Application from './application/Application';
import MainController from './controller/MainController';
import ResetConsoleController from './controller/ResetConsoleController';
import PreventDisplaySleepController from './controller/PreventDisplaySleepController';
import MenuController from './controller/MenuController';
import SecondInstanceController from './controller/SecondInstanceController';

const appIns = new Application([
    { Controller: ResetConsoleController },
    { Controller: PreventDisplaySleepController },
    { Controller: MenuController },
    { Controller: SecondInstanceController },
    { Controller: MainController },
]);


appIns.start();
