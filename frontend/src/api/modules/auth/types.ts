import { SocialType } from '@/utils/define';

interface LoginReq {
  type: SocialType;
  code: string;
}

interface LoginRes {
  id: number;
  name: string;
  profileImageUrl: string;
  token: string;
}

export { LoginReq, LoginRes };
