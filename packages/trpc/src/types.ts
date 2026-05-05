import { TEmployeeAppResponse, TGetEmployeeListInputApp } from './schemas';
import { TGetTrademarksListInput, TTrademarkListResponse } from './schemas/trademark';

export interface IAppEmployeeService {
  getEmployees: (input: TGetEmployeeListInputApp) => Promise<TEmployeeAppResponse>;
}

export interface ITrademarkService {
  getTrademarks: (input: TGetTrademarksListInput) => Promise<TTrademarkListResponse>;
}
export interface ITrpcContext {
  // appEmployeeService: IAppEmployeeService;
  trademarkService: ITrademarkService;
}
