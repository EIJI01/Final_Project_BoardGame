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
export interface ScanSystemJoinCardResponse {
  Id: string;
  Status: boolean;
  StartTime: string;
  StopTime: string;
  TotalPrice: number;
  TableId: string;
  BranchId: string;
  CardNumber: string;
}
export interface ScanSystemResponseLower {
  id: string;
  status: boolean;
  startTime: string;
  stopTime: string;
  totalPrice: number;
  tableId: string;
  cardId: string;
}

export interface GetScanSystemByTableId {
  tableId: string;
}
export interface GetScanSystemByCardId {
  cardId: string;
}
export interface GetScanSystemByCardNumber {
  cardNumber: string;
}

export interface CheckoutRequest {
  scanSystemId: string;
  totalPrice: number;
}

export interface ChangeTableRequest {
  scanSystemId: string;
  tableId: string;
}

export interface DeleteScanSystemRequest {
  scanSystemId: string;
}

export interface UpdateScanSystemRequest {
  scanSystemId: string;
  startTime?: string;
  stopTime?: string;
  totalPrice?: number;
}
