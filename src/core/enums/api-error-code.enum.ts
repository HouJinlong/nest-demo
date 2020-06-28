export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = 0, // 成功
    // 注册
    SING_UP_NAME = 10000, // 用户名无效
    SING_UP_EMAIL, // 邮箱无效
    SING_UP_PASS, // 密码无效
    SING_UP_RE_PASS, // 确认密码无效

    ACTIVE_ACCOUNT_KEY = 20000, // 激活账户key无效
}