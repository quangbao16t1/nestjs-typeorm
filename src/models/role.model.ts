import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Role extends Model {
  @Column({
    primaryKey: true
  })
  id: number;

  @Column
  name: string;
}
