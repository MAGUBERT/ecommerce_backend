import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { State } from "../entities/state.entity";
import { StateService } from "../servicies/state.service";


@Controller('state')
export class StateController {

    constructor(private service: StateService) {}

    @Get()
    findAll(): Promise<State[]>{
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe)id: string): Promise<State>{
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @Post()
    create(@Body() state: State) : Promise<State> {
        return this.service.save(state);
    }

    @Put('id')
    async update(@Param('id', ParseUUIDPipe)id: string, @Body() state: State) : Promise<State> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        }
        
        state.id = id;

        return this.service.save(state);
    }

    @Delete('id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe)id: string): Promise<void> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
        }

        return this.service.remove(id);
    }
}