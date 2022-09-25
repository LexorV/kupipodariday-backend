import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async create(user: User, offer: CreateOfferDto) {
    const wish = await this.wishesService.findOne(offer.itemId);
    const { raised, ...resWish } = wish;
    await this.wishesService.updateOne(wish.id, {
      raised: wish.raised + offer.amount,
      ...resWish,
    });
    // const wish = await this.offerRepository.findOneBy(Number(user.id));
    /*
    if (wish.owner.id === user.id) {
      throw new ForbiddenException();
    }*/

    return this.offerRepository.save(offer);
  }

  async findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }

  async updateOne(id: number, offer: UpdateOfferDto) {
    await this.offerRepository.update(id, offer);
  }

  async removeOne(id: number) {
    await this.offerRepository.delete({ id });
  }
}
