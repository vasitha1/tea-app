import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
// import { Category } from './category.entity'; // Removing Category entity dependency
import { Review } from './review.entity';
import { OrderItem } from './order-item.entity';
import { Wishlist } from './wishlist.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true }) // New field: flavor
  flavor?: string;

  @Column({ type: 'text', nullable: true }) // New field: shortDescription
  shortDescription?: string;

  @Column({ type: 'text', nullable: true }) // New field: longDescription
  longDescription?: string;

  @Column({ type: 'jsonb', nullable: true }) // New field: healthBenefits as JSONB array
  healthBenefits?: string[];

  @Column({ type: 'jsonb', nullable: true }) // New field: brewingInstructions as JSONB array
  brewingInstructions?: string[];

  @Column({ type: 'text', nullable: true }) // New field: healthDisclaimer
  healthDisclaimer?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true }) // Image path relative to backend's static files
  imageUrl?: string;

  // Removed category relationship
  // @ManyToOne(() => Category, (category) => category.products)
  // category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlists: Wishlist[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
