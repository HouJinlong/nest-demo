import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModelModule,LocalAuthModelModule } from "src/models";

@Module({
  imports:[UserModelModule,LocalAuthModelModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
