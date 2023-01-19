import { EditableListTypes } from "../enums/EditableListTypes";
import { IEditableItem } from "./IEditableItem";

export interface IEditableItemList {
    type: EditableListTypes,
    items: IEditableItem[],
    relientOn: [IEditableItem[]]
}