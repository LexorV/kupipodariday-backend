import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../BaseComponets/entity/BaseEntity';
import { Wish } from '../../wishes/entities/wish.entity';
@Entity()
export class Offer extends BaseEntity {
  @Column()
  amount: number;
  @Column({
    default: false,
  })
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  user: UserVerificationRequirement;
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
}
