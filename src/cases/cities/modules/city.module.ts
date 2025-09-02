import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "../entities/state.entity";
import { City } from "../entities/city.entity";
import { CityService } from "../servicies/city.service";
import { CityController } from "../controllers/city.controller";

@Module({
    imports: [TypeOrmModule.forFeature([State, City])],
    providers: [CityService],
    controllers: [CityController]
})
export class CityModule{}