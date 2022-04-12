import api from '@/api';
import { CommonResponse } from '@/utils/define';
import { LoginReq, LoginRes } from '@/api/modules/auth/types';

// eslint-disable-next-line import/prefer-default-export
export const loginAPI = (loginReq: LoginReq): CommonResponse<LoginRes> =>
  api.apiInstance.get(`/auth/${loginReq.type}/callback`, {
    params: { code: loginReq.code },
  });
