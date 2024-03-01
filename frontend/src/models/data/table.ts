export interface TableResponse {
  id: string;
  tableNumber: string;
  type: TableType;
  status: StatusTable;
  branchId: string;
}

export enum TableType {
  TABLE = 0,
  NINTENDO = 1,
}

export enum StatusTable {
  EMPTY = 0,
  NO_EMPTY = 1,
  COMING = 2,
}

export interface TableResponseHub {
  Id: string;
  TableNumber: string;
  Type: TableType;
  Status: StatusTable;
  BranchId: string;
}
