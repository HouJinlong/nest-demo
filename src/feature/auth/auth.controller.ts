import { Controller, Get, Render,Post,Body} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { ViewsPath } from "src/core/enums";
import { RegisterDto,LoginDto} from "./dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Get()
    @Render(ViewsPath.Register)
    async registerView(){
        return { pageTitle: '注册'};
    }

    @Post('/register')
    async registerApi(@Body() register: RegisterDto) {
        return await this.authService.register(register);
    }
    @Post('/login')
    async loginApi(@Body() data:LoginDto) {
        return await this.authService.login(data);
    }
}
