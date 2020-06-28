import { Injectable,HttpStatus,InternalServerErrorException} from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { hashSync, compareSync } from 'bcryptjs';
import { encryptMD5, diffEncryptMD5 } from 'src/shared';
import { ApiException,ApiErrorCode } from "src/core";
import { UserRepository, LocalAuthRepository} from "src/models";
import { MailService } from "src/shared";
import { APP_CONFIG } from "src/core";
import { RegisterDto,PassLoginDto,ActiveAccountDto } from "./dto";

@Injectable()
export class AuthService {
    private readonly secret = this.config.get<string>('environment.session_secret')
    constructor(
        private readonly userRepository: UserRepository,
        private readonly localAuthModel:LocalAuthRepository,
        private readonly config:ConfigService,
        private readonly mailService:MailService
    ){}
     /** 注册 */
     async register(register: RegisterDto) {
        const { email,name } = register;
        const exist = await this.userRepository.count({
            $or: [
                { email },
            ],
        });
        if(exist){
            throw new ApiException('邮箱已被使用',ApiErrorCode.SING_UP_EMAIL,HttpStatus.BAD_REQUEST)
        }
        
        // 保存用户到数据库
        try {
            //创建用户
            const user = await this.userRepository.create({email,name});
            // hash加密密码，不能明文存储到数据库
            const passhash = hashSync(register.pass, 10);
            //保存密码
            await this.localAuthModel.create({userid:user._id,pass:passhash});
            this.mailService.sendActiveMail(email, user._id, encodeURIComponent(name));
            return {
                success: `欢迎加入 ${APP_CONFIG.name}！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。`,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    // 激活账号
    async activeAccount(data:ActiveAccountDto){
        try {
            //创建用户
            const user = await this.userRepository.findOne({
                _id:data.key
            });
            console.log('user: ', user);
            // 检查用户是否激活过
            if (user.active) {
                return { error: '帐号已经是激活状态。', referer: '/auth' };
            }
            user.active = true
            await user.save();
            return { success: '帐号已被激活，请登录', referer: '/auth' };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    // 登录
    async login(data:PassLoginDto){
        try {
            
            //保存密码
            // const ret = await this.localAuthModel.create({userid:user._id,pass:passhash});
            return data
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
