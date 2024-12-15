import { Hotel } from '@hotels/entities/hotel.entity';
import { RoomType } from '@hotels/entities/room-type.entity';
import { Room } from '@hotels/entities/room.entity';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME,
  entities: [Hotel, Room, RoomType],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
}));
