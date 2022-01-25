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

const editProfileAPI = (data: Partial<EditProfile>): CommonResponse<Profile> =>
  api.apiInstance.patch('/users/me', data);

const editProfileImageAPI = (data: FormData): CommonResponse<Profile> =>
  api.apiInstance.post('/users/me/upload', data);

const editDefaultProfileImageAPI = (select: number): CommonResponse<Profile> =>
  api.apiInstance.delete(`/users/me/upload?select=${select}`);

export {
  getUserProfileAPI,
  createUserSkill,
  deleteUserSkill,
  editProfileAPI,
  editProfileImageAPI,
  editDefaultProfileImageAPI,
};
