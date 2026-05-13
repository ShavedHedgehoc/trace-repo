import type {
  TBoilDetailResponse,
  TBoilListResponse,
  TBoilStatsResponse,
  TGetBoilDetailInput,
  TGetBoilsListInput,
  TGetBoilsStatsInput,
  TGetTrademarksListInput,
  TLoginInput,
  TLoginResponse,
  TRegisteredUser,
  TRegisterInput,
  TTrademarkListResponse,
} from '@repo/schemas';

export interface ITrademarkService {
  getTrademarks: (input: TGetTrademarksListInput) => Promise<TTrademarkListResponse>;
}

export interface IBoilService {
  getBoils: (input: TGetBoilsListInput) => Promise<TBoilListResponse>;
  getStats: (input: TGetBoilsStatsInput) => Promise<TBoilStatsResponse>;
  getDetail: (input: TGetBoilDetailInput) => Promise<TBoilDetailResponse>;
}

export interface IAuthService {
  login: (input: TLoginInput) => Promise<TLoginResponse>;
  register: (input: TRegisterInput) => Promise<TLoginResponse>;
  me: (userId: number) => Promise<TLoginResponse['user']>;
  logout: (refreshToken: string) => Promise<{ success: boolean }>;
  refresh: (refreshToken: string) => Promise<TLoginResponse>;
}
export interface ITrpcContext {
  authService: IAuthService;
  trademarkService: ITrademarkService;
  boilService: IBoilService;
  res: any;
  req: any;
  user: TRegisteredUser | null;
}
