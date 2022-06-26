import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { nome_completo } = query;

    if(nome_completo){
        qb.where("e.nome_completo like :name", { name:  `%${nome_completo}%` });
    }
    let { camarote } = query;

    if(camarote){
        qb.where("e.camarote like :name", { name:  `%${camarote}%` });
    }
    let { funcao } = query;

    if(funcao){
        qb.where("e.funcao like :name", { name:  `%${funcao}%` });
    }
    let { embarque } = query;

    if(embarque){
        qb.where("e.embarque like :name", { name:  `%${embarque}%` });
    }
    let { desembarque } = query;

    if(desembarque){
        qb.where("e.desembarque like :name", { name:  `%${desembarque}%` });
    }
    return qb;
}
