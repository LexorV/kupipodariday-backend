import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Length, IsInt, IsUrl } from 'class-validator';
import { BaseEntity } from '../../BaseComponets/entity/BaseEntity';
import { Offer } from '../../offers/entities/offer.entity';
@Entity()
export class Wish extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;
  @Column()
  link: string;
  @Column()
  @IsUrl()
  image: string;
  @Column()
  price: number;
  @Column({ nullable: true })
  raised: number;
  @Column()
  @Length(1, 1024)
  description: string;
  @Column({ nullable: true })
  @IsInt()
  copied: number;
  @OneToMany(() => Offer, (offers) => offers.item)
  offers: Offer[];
  @ManyToOne(() => User, (user) => user.id)
  owner: User;
}
