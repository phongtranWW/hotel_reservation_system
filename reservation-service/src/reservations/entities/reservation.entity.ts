import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ReservationStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
  REJECTED = 'rejected',
}

@Entity('reservations')
export class Reservation {
  @PrimaryColumn({ name: 'reservation_id', type: 'uuid' })
  reservationId: string;

  @Column({ type: 'integer', name: 'hotel_id' })
  hotelId: number;

  @Column({ type: 'integer', name: 'room_type_id' })
  roomTypeId: number;

  @Column({ type: 'date', name: 'start_date' })
  startDate: string;

  @Column({ type: 'date', name: 'end_date' })
  endDate: string;

  @Column({
    type: 'varchar',
    enum: ReservationStatus,
    name: 'status',
    default: ReservationStatus.PENDING,
  })
  status: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'integer', name: 'number_of_rooms' })
  numberOfRooms: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
