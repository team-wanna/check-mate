import api from '@/api';
import { CommonResponse } from '@/utils/define';

interface LoginResponse {
  id: number;
  name: string;
  profileImageUrl: string;
  token: string;
}

interface EditProfileRequest {
  name?: string;
  profileImageUrl?: string;
  intro?: string;
}

interface EditProfileResponse {
  id: number;
  provider: string;
  subId: string;
  name: string;
  profileImageUrl: string;
  intro: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export const loginGoogleAPI = (code: string): CommonResponse<LoginResponse> =>
  api.apiInstance.get('/auth/google/callback', {
    params: { code },
  });
export const editProfileAPI = (
  data: EditProfileRequest,
): CommonResponse<EditProfileResponse> =>
  api.apiInstance.patch('/users/me', data);
