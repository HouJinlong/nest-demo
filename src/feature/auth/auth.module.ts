import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModelModule,LocalAuthModelModule } from "src/models";
import { ServicesModule } from 'src/shared';
@Module({
  imports:[
    UserModelModule,
    LocalAuthModelModule,
    ServicesModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
