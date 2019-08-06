import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';

import DbOutlet from './db-outlet';

@Table({
  tableName: 'opening_hours',
  timestamps: true
})
export default class DbOutletOpeningHour extends Model<DbOutletOpeningHour> {
  @PrimaryKey
  @Column({
    autoIncrement: true
  })
  id: number;

  @Column
  client_id: number;

  @ForeignKey(() => DbOutlet)
  @Column
  outlet_id: number;

  @BelongsTo(() => DbOutlet)
  outlet: DbOutlet;

  @Column
  day: string;

  @Column
  opening: string;

  @Column
  closing: string;

  @Column
  active: boolean;

  @CreatedAt
  @Column({
    field: 'created_at'
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at'
  })
  updatedAt: Date;
}
