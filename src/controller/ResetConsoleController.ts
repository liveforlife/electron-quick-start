import { createLogger, format, transports } from 'winston';
import path from 'path';

import Controller from '../application/Controller';
import { logFilePath } from '../config';

/**
 * 重置 console
 *
 * @export
 * @class ResetConsoleController
 * @extends {Controller}
 */
export default class ResetConsoleController extends Controller {
    elecInit() {
        const logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.json(),
                format.colorize(),
                format.align(),
            ),
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log`
                // - Write all logs error (and below) to `error.log`.
                //
                new transports.File({ filename: path.join(logFilePath, 'combined.log') }), // 默认文件保存在 ~/Library/Logs/LearnBot/combined.log
                new transports.File({ filename: path.join(logFilePath, 'error.log'), level: 'error' }), // 默认文件保存在 ~/Library/Logs/LearnBot/error.log
            ],
        });


        /**
         * 重写console，使其可以触发logger日志
         *
         */
        const { log, error } = console;

        console.log = (...args: [any?, ...any[]]) => {
            log.apply(console, args);
            logger.info(args);
        };
        console.error = (...args: [any?, ...any[]]) => {
            error.apply(console, args);
            logger.error(args);
        };
    }
}
