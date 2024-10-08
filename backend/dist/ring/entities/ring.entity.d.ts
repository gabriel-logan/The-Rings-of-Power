import { Model } from "sequelize-typescript";
export declare class Ring extends Model {
    name: string;
    power: string;
    owner: string;
    forgedBy: string;
    image: string;
    url: string;
    userId: number;
}
