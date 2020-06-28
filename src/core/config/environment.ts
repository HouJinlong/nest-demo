import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber } from './utils';
import { EnvironmentConfig } from './interfaces';

export default registerAs('environment', (): EnvironmentConfig => {
    const environment = getEnv('NODE_ENV');
    const host = getEnv('HOST');
    const port = getEnvNumber('PORT');

    const session_secret = getEnv('SESSION_SECRET');
    const super_admin = getEnv('SUPER_ADMIN');
    
    
    return {
        environment,
        host,
        port,
        super_admin,
        session_secret,
        isDevelopment: environment === 'development',
        isProduction: environment === 'production',
        isTest: environment === 'test',
    };
});