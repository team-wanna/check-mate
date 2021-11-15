import api from '@/api';
import { CommonResponse, SocialType } from '@/utils/define';

interface LoginResponse {
  id: number;
  name: string;
  profileImageUrl: string;
  token: string;
}

// eslint-disable-next-line import/prefer-default-export
export const loginAPI = (
  type: SocialType,
  code: string,
): CommonResponse<LoginResponse> =>
  api.apiInstance.get(`/auth/${type}/callback`, {
    params: { code },
  });
