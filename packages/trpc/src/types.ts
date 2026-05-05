import type { TBoilListResponse, TGetBoilsListInput, TGetTrademarksListInput, TTrademarkListResponse } from "@repo/schemas";

export interface ITrademarkService {
  getTrademarks: (input: TGetTrademarksListInput) => Promise<TTrademarkListResponse>;
}

export interface IBoilService {
  getBoils: (input: TGetBoilsListInput) => Promise<TBoilListResponse>;
}
export interface ITrpcContext {
  trademarkService: ITrademarkService;
  boilServise: IBoilService;
}
