import { AxiosResponse } from 'axios';

export type SocialType = 'google' | 'facebook' | 'github';

// API
interface CommonData<T> {
  success: boolean;
  data: Array<T>;
}
export type CommonResponse<T> = Promise<AxiosResponse<CommonData<T>>>;

// Store
export interface RootState {
  token: string;
}
