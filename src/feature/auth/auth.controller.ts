import { Controller, Get, Render,Post,Body} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { RegisterDto,PassLoginDto,ActiveAccountDto} from "./dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Get()
    @Render('auth/register')
    async registerView(){
        return { pageTitle: '注册'};
    }

    @Post('/register')
    async registerApi(@Body() register: RegisterDto) {
        return await this.authService.register(register);
    }
    @Get('/active_account')
    @Render('auth/active_account')
    async activeAccountView(){
        return { pageTitle: '激活账号'};
    }

    @Post('/active_account')
    async activeAccountApi(@Body() data: ActiveAccountDto){
        return await this.authService.activeAccount(data);
    }

    @Post('/login')
    async loginApi(@Body() data:PassLoginDto) {
        return await this.authService.login(data);
    }
}
