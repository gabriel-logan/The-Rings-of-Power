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

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const url = process.env.IMAGES_URL ?? "http://localhost:3000/uploads";
      return process.env.NODE_ENV === "development"
        ? `${url}/${this.getDataValue("image")}`
        : this.getDataValue("image");
    },
  })
  public url!: string;
}
