import { Column, CreateDateColumn, Entity, IsNull, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;


    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    phoneNumber: string;

    @Column({
        nullable: true
    })
    birthday: Date;

    @Column()
    roleId: number;

    @CreateDateColumn({ name: 'createdAt', type: 'timestamp', nullable: true })
    createdAt: Date;

    @CreateDateColumn({ name: 'updatedAt', type: 'timestamp', nullable: true })
    updatedAt: Date;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'roleId' })
    role?: Role
}