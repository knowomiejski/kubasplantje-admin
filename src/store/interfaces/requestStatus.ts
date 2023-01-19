import { Status } from "../enums/status";

export default interface RequestStatus {
    status: Status,
    error: string | null
}