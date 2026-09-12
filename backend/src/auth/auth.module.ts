import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MailsModule } from 'src/mails/mails.module';
import { OtpsModule } from 'src/otps/otps.module';

@Module({
  imports: [UsersModule, MailsModule, OtpsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
