import { Skill } from '@/api/modules/skills/types';

interface GetProjectListReq {
  page: number;
  size: number;
  locations: string[];
  skills: string[];
  popular: boolean;
}

interface GetProjectListRes {
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

interface GetProjectInfoRes {
  id: number;
  ownerId: string;
  title: string;
  logoImageUrl: string;
  intro: string;
  description: string;
  location: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}

export { GetProjectListReq, GetProjectListRes, GetProjectInfoRes };
