import { IEditableItem } from "./IEditableItem";

export interface IFunFact extends IEditableItem {
    id?: number,
    funfact: string
}