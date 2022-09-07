import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(wish: CreateWishDto) {
    return this.wishRepository.save(wish);
  }

  async findOne(id: number) {
    return this.wishRepository.findOneBy({ id });
  }

  async updateOne(id: number, wish: UpdateWishDto) {
    await this.wishRepository.update({ id }, wish);
  }

  async removeOne(id: number) {
    await this.wishRepository.delete({ id });
  }
}
