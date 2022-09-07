import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../BaseComponets/entity/BaseEntity';
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
}
