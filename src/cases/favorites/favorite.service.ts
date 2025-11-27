import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor (
        @InjectRepository(Favorite)
        private repository: Repository<Favorite>
    ) {}

    findByCustomer(customerId: string) {
        return this.repository.find({
            where: { customer: { id: customerId } },
            relations: ['product']
        });
    }

    async toggle(favorite: Favorite) {
        const exists = await this.repository.findOne({
            where: {
                customer: { id: favorite.customerId },
                product: { id: favorite.productId }
            },
        });

        if (exists) {
            await this.repository.delete(exists.id);
            return { removed: true };
        }

        const fav = this.repository.create({
            customer: { id: favorite.customerId } as any,
            product: { id: favorite.productId } as any,
        });

        await this.repository.save(fav);
        return { added: true };
    }
}
