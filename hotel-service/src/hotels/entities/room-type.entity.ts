import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Hotel } from '@hotels/entities/hotel.entity';

@Entity('room_types')
export class RoomType {
  @PrimaryColumn({ type: 'integer', name: 'room_type_id' })
  roomTypeId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer' })
  capacity: number;

  @Column({ type: 'integer', name: 'bed_count' })
  bedCount: number;

  @Column({ type: 'varchar', length: 50, name: 'bed_type' })
  bedType: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'varchar', length: 10 })
  currency: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'integer', name: 'hotel_id' })
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.roomTypes)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
}
