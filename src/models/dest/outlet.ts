import {Table, Column, Model, PrimaryKey} from 'sequelize-typescript';
 
@Table
export default class DbOutlet extends Model<DbOutlet> {

  @PrimaryKey
  @Column
  id: number;

  @Column
  client_id: number;

  @Column
  name: string;

  @Column
  code: string;
}
