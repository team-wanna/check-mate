import api from '@/api';
import { CommonResponse } from '@/utils/define';
import { SkillRes } from '@/api/modules/skills/types';

const getSkillsAPI = (search: string): CommonResponse<SkillRes> =>
  api.apiInstance.get('/skills', {
    params: { search },
  });

export { getSkillsAPI };
