import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async signUp(createUserDto: CreateUserDto) {

        try {
            const newUser = this.usersRepository.create({ ...createUserDto });
            const user = await this.usersRepository.save(newUser)
            return user

        } catch (error: any) {
            if (error?.code === 'ER_DUP_ENTRY' || error?.errno === 1062) 
            {
                throw new ConflictException({ success: false, message: "User is already exit" });
            }
            throw error
        }
    }
    
    async findUser(email: string){
        const user = await this.usersRepository.findOneBy({email: email})
        return user
    }

    async resetUserPassword(email: string, password: string){
        const user = await this.usersRepository.update({email: email}, {password: password})
        return user
    }

    async verifyUser(email: string, isVerified: boolean){
        if(isVerified) {
            return null
        }
        
        await this.usersRepository.update({email: email}, {isVerified : true})

        return { success: true, message: 'User verified successfully' };
    }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
