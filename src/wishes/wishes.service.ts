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

  async create(wish: CreateWishDto, id: number) {
    const { ...res } = wish;
    const userWish = await this.wishRepository.query(
      `SELECT id, username, about, avatar FROM public.user WHERE id = ${id}`,
    );
    return await this.wishRepository.save({
      owner: userWish[0],
      copied: 0,
      raised: 0,
      ...res,
    });
  }
  async findAll() {
    return await this.wishRepository.query(`SELECT * FROM public.wish`);
  }
  async findLast() {
    return await this.wishRepository.find({
      relations: {
        owner: {
          offers: true,
          wishes: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }
  async findTop() {
    return await this.wishRepository.find({
      relations: {
        owner: {
          offers: true,
          wishes: true,
        },
      },
      order: {
        copied: 'ASC',
      },
      take: 10,
    });
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
