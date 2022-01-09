import { Skill } from '@/api/modules/skills/types';

interface Profile {
  id: number;
  name: string;
  profileImageUrl: string;
  intro: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
}
interface EditProfile {
  name: string;
  intro: string;
}

export { Profile, EditProfile };
