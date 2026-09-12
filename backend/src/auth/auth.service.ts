import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { Purpose } from 'src/otps/enum/purpose.enum';
import { OtpsService } from 'src/otps/otps.service';
import { MailsService } from 'src/mails/mails.service';

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
