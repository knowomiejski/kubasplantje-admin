import RequestStatus from "./requestStatus";

export default interface RequestStatusWithId extends RequestStatus {
    id: number
}