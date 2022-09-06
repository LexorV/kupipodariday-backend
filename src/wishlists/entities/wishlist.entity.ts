import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Length, IsEmail, IsUrl, MaxLength } from 'class-validator';
@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  @Length(1, 250)
  name: string;
  @Column()
  @MaxLength(1500)
  description: string;
  @Column()
  image: string;
  @OneToMany(() => Wishlist, (wish) => wish)
  items: Wish[];
  @ManyToOne(() => User, (user) => user.wishLists)
  user: User;
}
