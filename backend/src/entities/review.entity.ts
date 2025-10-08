import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  rating: number; // 1 to 5 stars

  @Column({
    type: 'text',
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  guestName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  guestEmail: string;

  @ManyToOne(() => User, (user) => user.reviews, { nullable: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
