import * as Joi from '@hapi/joi';

const string = Joi.string();
const number = Joi.number();
const boolean = Joi.boolean();

export default Joi.object({
    NODE_ENV: string.valid('development', 'production', 'test').default('development'),
    PORT: number.default(3000),
    HOST: string.hostname().default('localhost'),
    SUPER_ADMIN: string.empty('').default('super_admin'),
    STATIC_HOST: string.empty('').default(''),
    MINI_ASSETS: boolean.default(false),
    SESSION_SECRET: string.default('cnode'),
    AUTH_COOKIE_NAME: string.default('nest_cnode'),
    // mongodb配置验证
    MONGO_HOST: string.hostname().default('localhost'),
    MONGO_PORT: number.default(27017),
    MONGO_USER: string.empty('').default(''),
    MONGO_PASS: string.empty('').default(''),
    MONGO_DBS: string.empty('').default('')
})