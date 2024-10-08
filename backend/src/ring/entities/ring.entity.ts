import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Ring extends Model {
  @Column({
    allowNull: false,
  })
  public name!: string;

  @Column({
    allowNull: false,
  })
  public power!: string;

  @Column({
    allowNull: false,
  })
  public owner!: string;

  @Column({
    allowNull: false,
  })
  public forgedBy!: string;

  @Column({
    allowNull: false,
  })
  public image!: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return this.getDataValue("image");
    },
  })
  public url!: string;
}
