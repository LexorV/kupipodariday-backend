import { Entity, Column, OneToMany } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Length, IsEmail, IsUrl } from 'class-validator';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { BaseEntity } from '../../BaseComponets/entity/BaseEntity';
import { Url } from 'url';
@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  @Length(2, 30)
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: Url;
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishLists: Wishlist[];
}
