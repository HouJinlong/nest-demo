import { IsNotEmpty } from 'class-validator';
import { ApiErrorCode } from "src/core/enums";

export class ActiveAccountDto {
    @IsNotEmpty({
        message: '缺少激活参数：key',
        context:{
            errorCode:ApiErrorCode.ACTIVE_ACCOUNT_KEY
        }
    })
    readonly key: string;
}
