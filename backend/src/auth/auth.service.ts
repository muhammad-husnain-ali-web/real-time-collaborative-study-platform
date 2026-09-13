import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { Purpose } from 'src/otps/enum/purpose.enum';
import { OtpsService } from 'src/otps/otps.service';
import { MailsService } from 'src/mails/mails.service';
import { loginUserDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly otpsService: OtpsService,
    private mailsService: MailsService
  ){}


  async register(createAuthDto: CreateAuthDto) {
    if(createAuthDto.password !== createAuthDto.confirmPassword) {
      throw new BadRequestException({ success: false, message: "Passwords do not match" });
    }
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(createAuthDto.password, saltOrRounds);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashOTP = await bcrypt.hash(otp, saltOrRounds)

    const user = { name: createAuthDto.name, email: createAuthDto.email, password: hash }
    const OTP = { email: createAuthDto.email, otp: hashOTP, otpExpiry: new Date(Date.now() + 5 * 60 * 1000), resendAllowedAfter: new Date(Date.now() + 60 * 1000), purpose: Purpose.Register }

    await this.usersService.signUp(user)
    await this.otpsService.CreateOtp(OTP)
    await this.mailsService.sendmail(Purpose.Register, user.name, user.email, otp)

    return { status: 200, success: true, message: 'User register successfully', email: createAuthDto.email };
  }

  async login(loginUserDto: loginUserDto, response: any){
    const user = await this.usersService.findUser(loginUserDto.email)

    if (!user) {
      throw new UnauthorizedException({ success: false, message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({ success: false, message: "Invalid credentials" });
    }

    // if (!user.twoFactorEnabled) {
    //   await this.setCookiees(user, respone)
    //   return { success: true, twofa: false, message: "User found successfully", user: { _id: user.id, name: user.name, role: user.role, image: (user.profilePic || null), twofa: user.twoFactorEnabled }}
    // }

    
    const saltOrRounds = 10;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashOTP = await bcrypt.hash(otp, saltOrRounds)
    const OTP = { otp: hashOTP, otpExpiry: new Date(Date.now() + 5 * 60 * 1000), resendAllowedAfter: new Date(Date.now() + 60 * 1000), purpose: Purpose.Login }

    await this.otpsService.UpdateOtp(user.email, OTP)
    await this.mailsService.sendmail(Purpose.Login, user.name, user.email, otp)

    return { success: true, twofa: true, message: 'User found successfully', email: loginUserDto.email };

  }


  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
