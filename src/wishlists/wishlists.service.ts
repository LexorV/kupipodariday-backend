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

  async create(userId: number, Wishlist: CreateWishlistDto) {
    const user = await this.wishListRepository.findOne({
      where: { id: userId },
      relations: ['owner'],
    });
    const newWishList = await { owner: user, ...Wishlist };
    await this.wishListRepository.save(newWishList);
    return newWishList;
  }

  async findOne(id: number) {
    return this.wishListRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: {
          offers: true,
          wishes: true,
        },
      },
    });
  }

  async updateOne(id: number, Wishlist: UpdateWishlistDto) {
    return await this.wishListRepository.update(id, Wishlist);
  }

  async removeOne(id: number) {
    return await this.wishListRepository.delete(id);
  }
}
