import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { VerificationCodeDto } from "./dto/verification-code.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('verify-code')
    verify(@Body() verificationCodeDto: VerificationCodeDto) {
        return this.authService.verifyCode(verificationCodeDto);
    }
}
