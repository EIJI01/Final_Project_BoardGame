export interface ScanSystemRequest {
  tableId: string;
  cardId: string;
}

export interface ScanSystemByNumberRequest {
  tableId: string;
  cardNumber: string;
}

export interface ScanSystemResponse {
  Id: string;
  Status: boolean;
  StartTime: string;
  StopTime: string;
  TotalPrice: number;
  TableId: string;
  CardId: string;
}

export interface GetScanSystemByTableId {
  tableId: string;
}

export interface CheckoutRequest {
  scanSystemId: string;
}

export interface ChangeTableRequest {
  scanSystemId: string;
  tableId: string;
}

export interface DeleteScanSystemRequest {
  scanSystemId: string;
}
