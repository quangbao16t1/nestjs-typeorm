import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 45})
  name: string;

  @CreateDateColumn({name: 'createdAt', type: 'timestamp', nullable: true})
  createdAt: Date;

  @CreateDateColumn({name: 'updatedAt', type: 'timestamp', nullable: true})
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users?: User[]
}
