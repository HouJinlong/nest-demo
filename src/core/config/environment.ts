import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber, getEnvBoolean } from './utils';
import { EnvironmentConfig } from './interfaces';

export default registerAs('environment', (): EnvironmentConfig => {
    const host = getEnv('HOST');
    const port = getEnvNumber('PORT');
    const super_admin = getEnv('SUPER_ADMIN');
    const session_secret = getEnv('SESSION_SECRET');
    const cookie_name = getEnv('AUTH_COOKIE_NAME');
    const environment = getEnv('NODE_ENV');
    const mini_assets = getEnvBoolean('MINI_ASSETS');
    console.log({
        host,
        port,
        super_admin,
        session_secret,
        mini_assets,
        cookie_name,
        environment,
        isDevelopment: environment === 'development',
        isProduction: environment === 'production',
        isTest: environment === 'test',
    })
    return {
        host,
        port,
        super_admin,
        session_secret,
        mini_assets,
        cookie_name,
        environment,
        isDevelopment: environment === 'development',
        isProduction: environment === 'production',
        isTest: environment === 'test',
    };
});