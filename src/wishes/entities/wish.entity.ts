import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Length, IsInt, IsUrl } from 'class-validator';
@Entity()
export class Wish {
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
