import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Length, IsInt, IsUrl } from 'class-validator';
import { BaseEntity } from '../../BaseComponets/entity/BaseEntity';
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
  @Column()
  raised: number;
  @Column()
  @Length(1, 1024)
  description: string;
  @Column()
  @IsInt()
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
}
