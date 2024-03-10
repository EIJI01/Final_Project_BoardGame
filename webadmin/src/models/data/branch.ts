export interface BranchAllIdResponse {
  id: string;
  address: string;
  branchName: string;
  playPricePerHour: number;
  buffetPrice: number;
}

export interface CreateBranchRequest {
  branchName: string;
  address: string;
  playPricePerHour: number;
  buffetPrice: number;
}
