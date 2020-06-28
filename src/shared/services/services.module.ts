import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from "@nestjs/config";
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('mail'),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports:[MailService]
})
export class ServicesModule {}
