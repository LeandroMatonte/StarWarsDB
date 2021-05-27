import {
    Entity, PrimaryGeneratedColumn,
    BaseEntity, Column, ManyToMany
} from 'typeorm';
import {User} from "./User"

@Entity()
export class Characters extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    height: number;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    image_url: string;
} 