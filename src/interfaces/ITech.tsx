import { TechCategories } from "../enums/TechCategories";
import { IEditableItem } from "./IEditableItem";

export interface ITech extends IEditableItem {
    [x: string]: any;
    id?: number,
    techName: string,
    category: TechCategories,
    skillRating: number,
    usedInProjects?: number[]
}