import api from '@/api';
import { CommonResponse } from '@/utils/define';
import { GetProjectsReq, GetProjectsRes } from '@/api/modules/projects/types';

// eslint-disable-next-line import/prefer-default-export
export const getProjectsAPI = (
  getProjectsReq: GetProjectsReq,
): CommonResponse<GetProjectsRes> =>
  api.apiInstance.get('/projects', {
    params: {
      page: getProjectsReq.page ?? 1,
      size: getProjectsReq.size ?? 15,
      locations: getProjectsReq.locations ?? [],
      skills: getProjectsReq.skills ?? [],
    },
  });
