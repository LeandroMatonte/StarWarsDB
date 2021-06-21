import {
    Entity, PrimaryGeneratedColumn,
    BaseEntity, Column, ManyToMany
} from 'typeorm';

import { User } from "./User"

@Entity()
export class Planets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    climate: string;

    @Column()
    diameter: number;

    @Column()
    gravity: string;

    @Column()
    population: number;

    @Column()
    terrain: string;

    @Column()
    image_url: string;

    @Column()
    type: string;
}