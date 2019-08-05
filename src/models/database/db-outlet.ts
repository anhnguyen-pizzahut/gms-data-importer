import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
 
@Table({
  tableName: 'outlets',
  timestamps: false,
})
export default class DbOutlet extends Model<DbOutlet> {

  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  client_id: number;

  @Column
  name: string;

  @Column
  code: number;

  @Column
  uuid: string;

  @Column
  description: string;

  @Column
  address: string;

  @Column
  street: string;

  @Column
  lat: number;

  @Column
  long: number;

  @Column
  timezone: string;

  @Column
  phone: string;

  @Column
  tier: number;

  @Column
  active: number;

  @Column
  disposition: string;

  @Column
  min_cart: string;

  @Column
  quote_time: string;

  @Column
  division: string;

  @Column
  customize: string;

  @Column
  area_code: string;

  @Column
  owner_code: string;

  @Column
  owner_name: string;

  @Column
  online_order: boolean;

  @Column
  offline_order: boolean;

  @Column
  alcohol_drinks_available: boolean;

  @Column
  payment_accepted: string;

  @Column
  delivery_fee: number;

  @Column
  from_date: Date;

  @Column
  to_date: Date;

  @Column
  is_open: boolean;

  @Column
  aggregators: string;

  // @CreatedAt
  // @Column
  // createdAt: Date;

  // @UpdatedAt
  // @Column
  // updatedAt: Date;
}