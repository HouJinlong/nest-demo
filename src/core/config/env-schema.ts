import * as Joi from '@hapi/joi';

const string = Joi.string();
const number = Joi.number();

export default Joi.object({
    NODE_ENV: string.valid('development', 'production', 'test').default('development'),
    PORT: number.default(3000),
    HOST: string.hostname().default('localhost'),
    //system
    SESSION_SECRET: string.default('cnode'),
    SUPER_ADMIN: string.default('super_admin'),
    // 邮件模块
    MAIL_HOST: string.hostname().required(),
    MAIL_PORT: number.required(),
    MAIL_USER: string.email().required(),
    MAIL_PASS: string.required(),
    //redis配置验证
    REDIS_HOST:string.hostname().default('localhost'),
    REDIS_PORT:number.default(6379),
    REDIS_PASSWORD:string.empty('').default(''),
    REDIS_DB:number.default(0),
    // mongodb配置验证
    MONGO_HOST: string.hostname().default('localhost'),
    MONGO_PORT: number.default(27017),
    MONGO_USER: string.empty('').default(''),
    MONGO_PASS: string.empty('').default(''),
    MONGO_DBS: string.empty('').default('')
})