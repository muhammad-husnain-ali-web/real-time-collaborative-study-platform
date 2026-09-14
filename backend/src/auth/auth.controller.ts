import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginUserDto } from './dto/user-login.dto';
import { forgotPasswordAuthDto } from './dto/forgotpassword-auth.dto';
import { VerifyOtpAuthDto } from './dto/verifyOtp-auth.dto';
import { resendOtpAuthDto } from './dto/resendotp-auth.dto';
import { ResetPasswordDto } from './dto/resetpassword-auth.dto';
import { NameChangeAuthDto } from './dto/namechange-auth.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

   @Post('/login')
  login(@Res({ passthrough: true }) response: Response, @Body() loginUserDto: loginUserDto) {
    return this.authService.login(loginUserDto, response);
  }

  @Post('/forgot-password')
  forgotPassword( @Body() forgotPasswordDto: forgotPasswordAuthDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/verify-otp')
  verifyOtp(@Res({ passthrough: true }) response: Response, @Body() verifyOtpDto: VerifyOtpAuthDto) {
    return this.authService.verifyOtp(verifyOtpDto, response);
  }

  @Post('/resend-otp')
  resendOtp( @Body() resendOtpDto: resendOtpAuthDto) {
    return this.authService.resendOtp(resendOtpDto);
  }

  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

    @Get('/me')
  me(@Req() request: Request) {
    return this.authService.me(request);
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @UseGuards(AuthGuard)
  @Post('/twofa')
  twofa(@Req() request: Request) {
    return this.authService.twofa(request)
  }

  @UseGuards(AuthGuard)
  @Patch('/nameChange')
  nameChange(@Req() request: Request, @Body() nameChangeDto: NameChangeAuthDto) {
    return this.authService.nameChange(nameChangeDto, request)
  }

   @UseGuards(AuthGuard)
  @Post('/imageUpload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        },
      }),
    }),
  )
  imageUpload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.authService.imageUpload(file, req)
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
