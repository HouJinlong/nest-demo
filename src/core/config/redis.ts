import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber } from './utils';
import { RedisConfig } from "./interfaces";

export default registerAs('redis', ():RedisConfig => {
    const host = getEnv('REDIS_HOST');
    const port = getEnvNumber('REDIS_PORT');
    const password = getEnv('REDIS_PASSWORD') || undefined;
    const db = getEnvNumber('REDIS_DB');
    return {
        host,
        port,
        password,
        db,
    };
});