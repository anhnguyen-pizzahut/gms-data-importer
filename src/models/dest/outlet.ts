import {Table, Column, Model} from 'sequelize-typescript';
 
@Table
export class DbOutlet extends Model<DbOutlet> {
  @Column
  id: number;

  @Column
  name: string;

  @Column
  code: number;
 
  @Column
  clientId: number;
}
