import { Transform } from 'class-transformer';
import { IsByteLength, IsEmail } from 'class-validator';
import { IsEqualsThan} from 'src/core';
import { ApiErrorCode } from "src/core/enums";

export class RegisterDto {
    @IsEmail({}, {
        message: '邮箱不合法',
        context:{
            errorCode:ApiErrorCode.SING_UP_EMAIL
        }
    })
    @Transform(value => value.toLowerCase(), { toClassOnly: true })
    readonly email: string;
    @IsByteLength(6, 18, {
        message: '密码长度不是6-18位',
        context:{
            errorCode:ApiErrorCode.SING_UP_PASS
        }
    })
    readonly pass: string;
    @IsEqualsThan('pass', {
        message: '两次密码输入不一致。',
        context:{
            errorCode:ApiErrorCode.SING_UP_RE_PASS
        }
    })
    readonly re_pass: string;
}