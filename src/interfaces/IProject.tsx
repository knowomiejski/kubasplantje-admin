import { IEditableItem } from "./IEditableItem";

export interface IProject extends IEditableItem {
    id?: number,
    projectName: string,
    description: string,
    client: string,
    link?: string,
    usedTechIds?: number[]
}