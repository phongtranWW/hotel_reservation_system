import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('increment', { name: 'room_id' })
  roomId: number;

  @Column({ type: 'integer', name: 'room_type_id' })
  roomTypeId: number;

  @Column({ type: 'varchar', length: 100 })
  floor: string;

  @Column({ type: 'integer' })
  number: number;

  @Column({ type: 'integer', name: 'hotel_id' })
  hotelId: number;

  @Column({ type: 'boolean', name: 'is_available', default: true })
  isAvailable: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
