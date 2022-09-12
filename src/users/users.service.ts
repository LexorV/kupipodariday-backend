import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async updateOne(id: number, user: UpdateUserDto) {
    await this.userRepository.update({ id }, user);
  }

  async removeOne(id: number) {
    await this.userRepository.delete({ id });
  }
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username: username },
    });
  }
}
