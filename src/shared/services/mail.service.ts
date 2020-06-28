import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvironmentConfig,MailConfig } from 'src/core/config';
import { APP_CONFIG } from 'src/core/constants';

@Injectable()
export class MailService {
    private readonly from: string;
    private readonly name: string;
    private readonly host: string;

    constructor(
        private readonly mailer: MailerService,
        private readonly configService: ConfigService,
    ){
        this.name = APP_CONFIG.name;
        const environment = this.configService.get<EnvironmentConfig>('environment')
        this.host = `${environment.host}:${environment.port}`;
        const mail = this.configService.get<MailConfig>('mail')
        this.from = `${this.name} <${mail.user}>`;
    }
    
    /**
     * 激活邮件
     * @param to 激活人邮箱
     * @param token token
     * @param username 名字
     */
    sendActiveMail(to: string, token: string, username: string) {
        const name = this.name;
        const subject = `${name}帐号激活`;
        const html = `<p>您好：${username}</p>
            <p>我们收到您在${name}的注册信息，请点击下面的链接来激活帐户：</p>
            <a href="${this.host}/auth/active_account?key=${token}&name=${username}">激活链接</a>
            <p>若您没有在${name}填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>
            <p>${name} 谨上。</p>`;
        return this.mailer.sendMail({
            from: this.from,
            to,
            subject,
            html,
        });
    }

    /**
     * 重置密码邮件
     * @param to 重置人邮箱
     * @param token token
     * @param username 名字
     */
    sendResetPassMail(to: string, token: string, username: string) {
        const name = this.name;
        const subject = `${name}密码重置`;
        const html = `<p>您好：${username}</p>
            <p>我们收到您在${name}重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>
            <a href="${this.host}/reset_pass?key=${token}">重置密码链接</a>
            <p>若您没有在${name}填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>
            <p>${name} 谨上。</p>`;
        return this.mailer.sendMail({
            from: this.from,
            to,
            subject,
            html,
        });
    }
}
