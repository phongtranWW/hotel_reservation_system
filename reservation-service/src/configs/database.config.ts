import { registerAs } from '@nestjs/config';
import { Reservation } from '@reservations/entities/reservation.entity';
import { RoomTypeInventory } from '@room-type-inventories/entities/room-type-inventory.entity';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME,
  entities: [Reservation, RoomTypeInventory],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
}));
