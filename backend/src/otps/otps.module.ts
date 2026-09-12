import { Module } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { OTP } from './entities/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OTP])],
  providers: [OtpsService],
  exports: [OtpsService]
})
export class OtpsModule {}
