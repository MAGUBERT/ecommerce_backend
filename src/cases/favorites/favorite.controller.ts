import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.entity';

@Controller('favorites')
export class FavoriteController {
    constructor(
        private readonly service: FavoriteService
    ) {}

    @Get()
    findByCustomer(@Query('customerId') customerId: string) {
        return this.service.findByCustomer(customerId);
    }

    @Post()
    toggle(@Body() favorite: Favorite) {
        return this.service.toggle(favorite);
    }
}
