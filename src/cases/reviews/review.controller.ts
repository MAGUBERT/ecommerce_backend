import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.entity';

@Controller('reviews')
export class ReviewController {
    constructor(
        private service: ReviewService
    ) {}

    @Get()
    getReviews(@Query('productId') productId: string) {
        return this.service.findByProduct(productId);
    }

    @Post()
    createOrUpdate(@Body() review: Review) {
        return this.service.createOrUpdate(review);
    }
}
