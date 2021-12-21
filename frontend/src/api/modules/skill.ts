import api from '@/api';
import { CommonResponse } from '@/utils/define';

interface Skill {
  id: number;
  name: string;
  value: string;
}

const getSkillsAPI = (search: string): CommonResponse<Skill> =>
  api.apiInstance.get('/skills', {
    params: { search },
  });

export { Skill, getSkillsAPI };
