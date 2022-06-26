import { EntityRepository, Repository } from 'typeorm';

import { People_onboard } from '../entity/People_onboard';
import { applyFilters, EntityQuery } from './people_onboardUtils';

@EntityRepository(People_onboard)
export class People_onboardRepository extends Repository<People_onboard> {

    filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC" ): Promise<[People_onboard[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            return qb
                .skip(page * size)
                .take(size)
                .orderBy(`e.${field}`, sort)

                .getManyAndCount();
        } else {
            return qb
                .skip(page * size)
                .take(size)

                .getManyAndCount();
        }
    }
}
