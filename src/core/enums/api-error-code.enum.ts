export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = 0, // 成功
    // 注册
    SING_UP_EMAIL = 10001, // 邮箱无效
    SING_UP_PASS, // 密码无效
    SING_UP_RE_PASS, // 确认密码无效
}