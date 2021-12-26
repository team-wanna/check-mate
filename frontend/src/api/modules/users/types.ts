import { Index } from '@/api/modules/skills';

interface ProfileRes {
  id: number;
  name?: string; // 비가입자는 name: undefined
  profileImageUrl: string;
  intro?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  skills: Index[];
}
interface EditProfileReq {
  name?: string;
  intro?: string;
}

export { ProfileRes, EditProfileReq };
