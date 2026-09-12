import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Repository } from 'typeorm';
import { OTP } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OtpsService {

  constructor(
    @InjectRepository(OTP)
    private otpsRepository: Repository<OTP>,
) { }

async CreateOtp(createOtpDto: CreateOtpDto){
        const newOtp = this.otpsRepository.create({ ...createOtpDto });
            return await this.otpsRepository.save(newOtp)
    }

  create(createOtpDto: CreateOtpDto) {
    return 'This action adds a new otp';
  }

  findAll() {
    return `This action returns all otps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
