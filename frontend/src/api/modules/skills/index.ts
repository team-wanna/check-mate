import api from '@/api';
import { CommonResponse } from '@/utils/define';
import { Skill } from '@/api/modules/skills/types';

const getSkillsAPI = (search: string): CommonResponse<Skill> =>
  api.apiInstance.get('/skills', {
    params: { search },
  });

// eslint-disable-next-line import/prefer-default-export
export { getSkillsAPI };
