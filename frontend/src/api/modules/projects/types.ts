import { Skill } from '@/api/modules/skills/types';

interface GetProjectsReq {
  page: number;
  size: number;
  locations: string[];
  skills: string[];
  popular: boolean;
}

interface GetProjectsRes {
  id: number;
  title: string;
  logoImageUrl: string | null;
  intro: string;
  location: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
}

export { GetProjectsReq, GetProjectsRes };
