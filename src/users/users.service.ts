import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...res } = createUserDto;
    return await bcrypt.hash(password, 10).then((hash) =>
      this.userRepository.save({
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...res,
      }),
    );
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async updateOne(id: number, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
    return user;
  }

  async removeOne(id: number) {
    await this.userRepository.delete({ id });
  }
  async findByUsername(username: string): Promise<User> {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    console.log(username);
    if (reg.test(username)) {
      return await this.userRepository.findOne({
        where: { email: username },
      });
    } else
      return await this.userRepository.findOne({
        where: { username: username },
      });
  }
}
