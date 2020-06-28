import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber } from './utils';
import { MongoConfig } from './interfaces';

export default registerAs('database', ():MongoConfig => {
    const host = getEnv('MONGO_HOST');
    const port = getEnvNumber('MONGO_PORT');
    const user = getEnv('MONGO_USER');
    const pass = getEnv('MONGO_PASS');
    const dbs = getEnv('MONGO_DBS');

    let url='mongodb://'
    if(user&&pass){
        url+=`${user}:${pass}@`
    }
    url+=`${host}:${port}/${dbs}`
    return {
        host,
        port,
        user,
        pass,
        dbs,
        url
    };
});