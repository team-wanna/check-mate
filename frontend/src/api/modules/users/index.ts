import api from '@/api';
import { CommonResponse } from '@/utils/define';
import { Skill } from '@/api/modules/skill';
import { ProfileRes, EditProfileReq } from '@/api/modules/users/types';

const getProfile = (): CommonResponse<ProfileRes> =>
  api.apiInstance.get('/users/me');

const createUserSkill = (value: string): CommonResponse<Skill> =>
  api.apiInstance.post(`/users/me/skills?value=${value}`);

const deleteUserSkill = (value: string): CommonResponse<Skill> =>
  api.apiInstance.delete(`/users/me/skills?value=${value}`);

const editProfile = (data: EditProfileReq): CommonResponse<ProfileRes> =>
  api.apiInstance.patch('/users/me', data);

const editProfileImage = (data: FormData): CommonResponse<ProfileRes> =>
  api.apiInstance.post('/users/me/upload', data);

export {
  getProfile,
  createUserSkill,
  deleteUserSkill,
  editProfile,
  editProfileImage,
};
