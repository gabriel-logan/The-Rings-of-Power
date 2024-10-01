import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Ring extends Model {
  @Column
  public name!: string;

  @Column
  public power!: string;

  @Column
  public owner!: string;

  @Column
  public forgedBy!: string;

  @Column
  public image!: string;

  @Column({ type: DataType.VIRTUAL })
  public url!: string;
}