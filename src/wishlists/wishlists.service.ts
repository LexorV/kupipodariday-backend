import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
  ) {}

  async create(Wishlist: CreateWishlistDto) {
    return this.wishListRepository.save(Wishlist);
  }

  async findOne(id: number) {
    return this.wishListRepository.findOneBy({ id });
  }

  async updateOne(id: number, Wishlist: UpdateWishlistDto) {
    await this.wishListRepository.update({ id }, Wishlist);
  }

  async removeOne(id: number) {
    await this.wishListRepository.delete({ id });
  }
}
