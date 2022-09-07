import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(offer: CreateOfferDto) {
    return this.offerRepository.save(offer);
  }

  async findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }

  async updateOne(id: number, offer: UpdateOfferDto) {
    await this.offerRepository.update({ id }, offer);
  }

  async removeOne(id: number) {
    await this.offerRepository.delete({ id });
  }
}
