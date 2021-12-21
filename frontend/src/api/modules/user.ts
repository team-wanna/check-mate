import api from '@/api';
import { CommonResponse, SocialType } from '@/utils/define';
import { Skill } from '@/api/modules/skill';

export interface GetProfileRes {
  id: number;
  provider: SocialType;
  subId: string;
  name?: string;
  profileImageUrl: string;
  intro?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  email: string;
  skills: Skill[];
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

export const createUserSkill = (value: string): CommonResponse<Skill> =>
  api.apiInstance.post(`/users/me/skills?value=${value}`);

export const deleteUserSkill = (value: string): CommonResponse<Skill> =>
  api.apiInstance.delete(`/users/me/skills?value=${value}`);
