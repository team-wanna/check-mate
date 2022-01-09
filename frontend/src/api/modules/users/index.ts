import api from '@/api';
import { CommonResponse } from '@/utils/define';
import { Skill } from '@/api/modules/skills/types';
import { Profile, EditProfile } from '@/api/modules/users/types';

const getUserProfileAPI = (): CommonResponse<Profile> =>
  api.apiInstance.get('/users/me');

const createUserSkill = (value: string): CommonResponse<Skill> =>
  api.apiInstance.post(`/users/me/skills?value=${value}`);

const deleteUserSkill = (value: string): CommonResponse<Skill> =>
  api.apiInstance.delete(`/users/me/skills?value=${value}`);

const editProfile = (data: EditProfile): CommonResponse<Profile> =>
  api.apiInstance.patch('/users/me', data);

const editProfileImage = (data: FormData): CommonResponse<Profile> =>
  api.apiInstance.post('/users/me/upload', data);

export {
  getUserProfileAPI,
  createUserSkill,
  deleteUserSkill,
  editProfile,
  editProfileImage,
};
