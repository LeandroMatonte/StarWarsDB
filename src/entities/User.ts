import {
    Entity, PrimaryGeneratedColumn,
    BaseEntity, Column, ManyToMany, JoinTable
} from 'typeorm';

import { Planets } from "./Planets"
import { Characters } from "./Characters"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Planets, {cascade: true})
    @JoinTable()
    Planets: Planets[];

    @ManyToMany(() => Characters, {cascade: true})
    @JoinTable()
    Characters: Characters[];
}