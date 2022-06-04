import { resolve } from 'path';
import * as dotenv from 'dotenv';

import { diskStorage, Options as MulterOptions } from 'multer';
import { existsSync, mkdir } from 'fs';


dotenv.config();
export const SCHEDULER_TICK_PERIOD = 2 * 1000;

export const TOKEN_LIFESPAN = process.env.NODE_ENV === 'dev' ? 9999999 : 15 * 60; // in secs
export const REFRESH_TOKEN_LIFESPAN = 24 * 60 * 60; // in secs

export const RESOURCES_DIR = resolve('./resources');
export const EMAIL_FROM = 'automiet@automiet.ru';

export const LENGTH_OF_STUDY_IN_DAYS = 30 + 30 + 15;
export const DEFAULT_DRIVING_LESSONS = 2;
export const MS_IN_DAY = 24 * 3600 * 1000;
export const AVG_LESSON_DURATION = 1.5 * 3600 * 1000; // time in ms
export const LOCAL_TIME_OFFSET_MS = 3 * 3600 * 1000; // in ms
export const MAX_THEORY_EXAM_TIME_MS = 1.5 * 3600 * 1000;


