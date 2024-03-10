export interface QueueResponse {
  Id: string;
  QueueNumber: string;
  CreateAt: string;
  TableType: number;
  NumberOfPeople: number;
  Status: number;
  UserId: string;
  BranchId: string;
  TableId: string;
}

export interface QueueRequest {
  email: string;
  tableType: number;
  numberOfPeople: number;
  branchId: string;
}

export interface QueueResponseLower {
  id: string;
  queueNumber: string;
  createAt: string;
  tableType: number;
  numberOfPeople: number;
  status: number;
  userId: string;
  branchId: string;
  tableId: string;
}

export interface QueueRequestUpdateStatus {
  queueId: string;
}

export interface QueueRequestOkSuccess {
  tableId: string;
  notificationId: string;
}
