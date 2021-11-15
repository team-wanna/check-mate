import api from '@/api';
import { CommonResponse, SocialType } from '@/utils/define';

interface GetProfileRes {
  id: number;
  provider: SocialType;
  subId: string;
  name?: string;
  profileImageUrl: string;
  intro?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export const getProfile = (): CommonResponse<GetProfileRes> =>
  api.apiInstance.get('/users/me');

export interface EditProfileReq {
  name?: string;
  intro?: string;
}
interface EditProfileRes {
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
export const editProfile = (
  data: EditProfileReq,
): CommonResponse<EditProfileRes> => api.apiInstance.patch('/users/me', data);

type EditProfileImageRes = EditProfileRes;
export const editProfileImage = (
  data: FormData,
): CommonResponse<EditProfileImageRes> =>
  api.apiInstance.post('/users/me/upload', data);
