import { Module } from '@nestjs/common';
import { HotelService } from '@hotels/hotel.service';
import { HotelController } from '@hotels/hotel.controller';

@Module({
  imports: [],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
