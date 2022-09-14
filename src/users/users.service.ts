import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...res } = createUserDto;
    const hash = password;
    return this.userRepository.save({
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...res,
    });
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async updateOne(id: number, user: UpdateUserDto) {
    const { password, ...res } = user;
    const hash = await bcrypt.hash(password, 10);
    await this.userRepository.update({ id }, { password: hash, ...res });
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
