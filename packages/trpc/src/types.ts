import type {
  TBoilDetailResponse,
  TBoilListResponse,
  TBoilStatsResponse,
  TCellsContainListResponse,
  TDeleteCellsContainRecordInput,
  TDeleteUserRecordInput,
  TGetBoilDetailInput,
  TGetBoilsListInput,
  TGetBoilsStatsInput,
  TGetCellsContainListInput,
  TGetMaterialsListInput,
  TGetTrademarksListInput,
  TGetUsersListInput,
  TLoginInput,
  TLoginResponse,
  TMaterialsListResponse,
  TRegisteredUser,
  TRegisterInput,
  TRolesListResponse,
  TTrademarkListResponse,
  TUpdateUserRolesInput,
  TUsersListResponse,
} from '@repo/schemas';

export interface ITrademarkService {
  getTrademarks: (input: TGetTrademarksListInput) => Promise<TTrademarkListResponse>;
}

export interface IBoilService {
  getBoils: (input: TGetBoilsListInput) => Promise<TBoilListResponse>;
  getStats: (input: TGetBoilsStatsInput) => Promise<TBoilStatsResponse>;
  getDetail: (input: TGetBoilDetailInput) => Promise<TBoilDetailResponse>;
}

export interface IMaterialService {
  getMaterials: (input: TGetMaterialsListInput) => Promise<TMaterialsListResponse>;
}

export interface IAuthService {
  login: (input: TLoginInput) => Promise<TLoginResponse>;
  register: (input: TRegisterInput) => Promise<TLoginResponse>;
  me: (userId: number) => Promise<TLoginResponse['user']>;
  logout: (refreshToken: string) => Promise<{ success: boolean }>;
  refresh: (refreshToken: string) => Promise<TLoginResponse>;
}

export interface ICellService {
  getCellsContain: (input: TGetCellsContainListInput) => Promise<TCellsContainListResponse>;
  deleteCellsContain: (input: TDeleteCellsContainRecordInput) => Promise<{ success: boolean }>;
}

export interface IUserService {
  getUsers: (input: TGetUsersListInput) => Promise<TUsersListResponse>;
  deleteUser: (input: TDeleteUserRecordInput) => Promise<{ success: boolean }>;
  updateUserRoles: (input: TUpdateUserRolesInput) => Promise<{ success: boolean }>;
}

export interface IRoleService {
  getRoles: () => Promise<TRolesListResponse>;
}

export interface ITrpcContext {
  authService: IAuthService;
  trademarkService: ITrademarkService;
  boilService: IBoilService;
  cellService: ICellService;
  materialService: IMaterialService;
  userService: IUserService;
  roleService: IRoleService;
  res: any;
  req: any;
  user: TRegisteredUser | null;
}
