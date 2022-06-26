import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Nullable } from '../utils';

/**
 * Schema for people_onboard entity
 */
export const people_onboardSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        nome_completo: TypeBox.Type.String({ default: '' }),

        camarote: TypeBox.Type.String({ default: '' }),

        funcao: TypeBox.Type.String({ default: '' }),

        embarque: TypeBox.Type.String({ default: '' }),

        desembarque: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

/**
 * Input type for editing and creating people_onboard
 */
export const people_onboardInputSchema = TypeBox.Type.Object({

        nome_completo: TypeBox.Type.String({ default: '' }),

        camarote: TypeBox.Type.String({ default: '' }),

        funcao: TypeBox.Type.String({ default: '' }),

        embarque: TypeBox.Type.String({ default: '' }),

        desembarque: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

export type People_onboardInput = TypeBox.Static<typeof people_onboardInputSchema>;

@Entity()
export class People_onboard implements TypeBox.Static<typeof people_onboardSchema> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        nome_completo!: string;

        @Column({ default: '' })
        camarote!: string;

        @Column({ default: '' })
        funcao!: string;

        @Column({ default: '' })
        embarque!: string;

        @Column({ default: '' })
        desembarque!: string;

}
