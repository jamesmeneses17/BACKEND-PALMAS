import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // Endpoint para iniciar sesión
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.correo, loginDto.password);
    }

    // Endpoint opcional para verificar quién está logueado
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}