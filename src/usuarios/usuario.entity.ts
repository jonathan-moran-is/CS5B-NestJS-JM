import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:50})
    nombre: string;

    @Column({length:50})
    apellido: string;

    @Column({length:300})
    avatar:string;
}
