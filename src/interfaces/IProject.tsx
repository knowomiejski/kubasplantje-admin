import { IEditableItem } from "./IEditableItem";
import { ITech } from "./ITech";

export interface IProject extends IEditableItem {
    id?: number,
    projectName: string,
    description: string,
    client: string,
    link?: string,
    usedTechs?: ITech[]
    usedTechIds?: number[]
}