import { Skill } from '@/api/modules/skill';

interface ProfileRes {
  id: number;
  name?: string; // 비가입자는 name: undefined
  profileImageUrl: string;
  intro?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
}
interface EditProfileReq {
  name?: string;
  intro?: string;
}

export { ProfileRes, EditProfileReq };
