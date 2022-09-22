import { Entity, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { Length, MaxLength } from 'class-validator';
import { BaseEntity } from '../../BaseComponets/entity/BaseEntity';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;
  @Column()
  @MaxLength(1500)
  description: string;
  @Column()
  image: string;
  @JoinTable()
  items: Wish[];
  /*
  @OneToMany(() => Wishlist, (wish) => wish)
  items: Wish[];*/
  @ManyToOne(() => User, (user) => user.wishLists)
  owner: User;
}
