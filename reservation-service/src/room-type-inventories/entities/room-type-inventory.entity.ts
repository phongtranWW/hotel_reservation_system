import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  VersionColumn,
} from 'typeorm';

@Entity('room_type_inventories')
export class RoomTypeInventory {
  @PrimaryColumn({ type: 'integer', name: 'hotel_id' })
  hotelId: number;

  @PrimaryColumn({ type: 'integer', name: 'room_type_id' })
  roomTypeId: number;

  @PrimaryColumn({ type: 'date', name: 'date' })
  date: string;

  @Column({ type: 'integer', name: 'total_inventory' })
  totalInventory: number;

  @Column({ type: 'integer', name: 'total_reserved' })
  totalReserved: number;

  @Exclude()
  @VersionColumn({ name: 'version' })
  version: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
