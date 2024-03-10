export interface SendSuccessRequest {
  userId: string;
  tableId: string;
}

export interface SendNotSuccessRequest {
  userId: string;
}

export interface NotificationResponseHub {
  Id: string;
  CreateAt: string;
  Type: number;
  TableId: string;
  NotificationStatus: number;
  UserId: string;
}
