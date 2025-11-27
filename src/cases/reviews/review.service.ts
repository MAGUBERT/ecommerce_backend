import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private repository: Repository<Review>,
    ) {}

    findByProduct(productId: string) {
        return this.repository.find({
            where: { product: { id: productId } },
        });
    }

    findCustomerReview(customerId: string, productId: string) {
        return this.repository.findOne({
            where: {
                customer: { id: customerId },
                product: { id: productId },
            },
        });
    }

    async createOrUpdate(review: Review) {
        const existing = await this.findCustomerReview(review.customer.id, review.product.id);

        if (existing) {
            existing.stars = review.stars;
            return this.repository.save(existing);
        }

        return this.repository.save(review);
    }
}
