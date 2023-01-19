import { IEditableItem } from "./IEditableItem";

export interface IContactInfo extends IEditableItem {
    id?: number,
    personalEmail: string,
    companyEmail: string,
    phoneNumber: string,
}