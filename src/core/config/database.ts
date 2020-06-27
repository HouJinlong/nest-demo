import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber } from './utils';

export default registerAs('database', () => {
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
    console.log({
        host,
        port,
        user,
        pass,
        dbs,
        url
    })
    return {
        host,
        port,
        user,
        pass,
        dbs,
        url
    };
});