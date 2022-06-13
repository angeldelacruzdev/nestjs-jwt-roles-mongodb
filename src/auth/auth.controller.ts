import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './../dto';
import { Tokens } from './../types';
import { RtGuard } from './../common/guards';
import {
  GetCurrentUserId,
  Public,
  GetCurrentRtCookies,
} from './../common/decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto);

    res.cookie('LOGIN_INFO', token.access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'strict',
    });
    res.cookie('RT', token.refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'strict',
    });
    res.send({
      success: true,
    });
  }

  @Public()
  @Get('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.register(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string) {
    return await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentRtCookies() refreshToken: string,
    @GetCurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.refreshTokens(userId, refreshToken);

    res.clearCookie('RT');
    res.clearCookie('LOGIN_INFO');
    res.cookie('LOGIN_INFO', token.access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'strict',
    });
    res.cookie('RT', token.refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: '/',
      sameSite: 'strict',
    });
    res.send({
      success: true,
    });
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async profile(@GetCurrentUserId() userId: string) {
    return await this.authService.profile(userId);
  }
}
