import { Injectable,HttpStatus,InternalServerErrorException, Body} from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { hashSync, compareSync } from 'bcryptjs';
import { encryptMD5, diffEncryptMD5 } from 'src/shared';
import { ApiException,ApiErrorCode } from "src/core";
import { UserRepository, LocalAuthRepository} from "src/models";
import { APP_CONFIG } from "src/core";
import { RegisterDto,LoginDto } from "./dto";

@Injectable()
export class AuthService {
    private readonly secret = this.config.get<string>('environment.session_secret')
    constructor(
        private readonly userRepository: UserRepository,
        private readonly localAuthModel:LocalAuthRepository,
        private readonly config:ConfigService
    ){}
     /** 注册 */
     async register(register: RegisterDto) {
        const { email } = register;
        console.log(register)
        const exist = await this.userRepository.count({
            $or: [
                { email },
            ],
        });
        if(exist){
            throw new ApiException('邮箱已被使用',ApiErrorCode.SING_UP_EMAIL,HttpStatus.BAD_REQUEST)
        }
        // hash加密密码，不能明文存储到数据库
        const passhash = hashSync(register.pass, 10);
        // 保存用户到数据库
        try {
            //创建用户
            const user = await this.userRepository.create({email});
            //保存密码
            const ret = await this.localAuthModel.create({userid:user._id,pass:passhash});
            console.log(user)
            console.log(ret)
            const token = encryptMD5(email + passhash + this.secret);
            // this.mailService.sendActiveMail(email, token);
            return {
                success: `欢迎加入 ${APP_CONFIG.name}！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。`,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    // 登录
    async login(data:LoginDto){
         // 保存用户到数据库
         try {
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
