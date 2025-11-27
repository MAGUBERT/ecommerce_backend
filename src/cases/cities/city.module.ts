import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "./entities/city.entity";
import { CityService } from "./services/city.service";
import { CityController } from "./controllers/city.controller";
import { State } from "./entities/state.entity";
import { StateService } from "./services/state.service";
import { StateController } from "./controllers/state.controller";

@Module({
    imports:[TypeOrmModule.forFeature([City, State])],
    providers: [CityService, StateService],
    controllers: [CityController, StateController]
})
export class CityModule {}