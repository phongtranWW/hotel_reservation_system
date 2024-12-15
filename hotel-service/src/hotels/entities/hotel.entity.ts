import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomType } from '@hotels/entities/room-type.entity';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn('increment', { name: 'hotel_id' })
  hotelId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100, name: 'location' })
  location: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => RoomType, (roomType) => roomType.hotel)
  roomTypes: RoomType[];
}
