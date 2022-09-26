import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
