import api from '@/api';
import { CommonResponse } from '@/utils/define';
import {
  GetProjectListReq,
  GetProjectListRes,
  GetProjectInfoRes,
} from '@/api/modules/projects/types';

const getProjectListAPI = (
  getProjectListReq: Partial<GetProjectListReq>,
): CommonResponse<GetProjectListRes> =>
  api.apiInstance.get('/projects', {
    params: {
      page: getProjectListReq.page ?? 1,
      size: getProjectListReq.size ?? 15,
      locations: getProjectListReq.locations ?? [],
      skills: getProjectListReq.skills ?? [],
      popular: getProjectListReq.popular,
    },
  });

const getProjectInfoAPI = (id: number): CommonResponse<GetProjectInfoRes> =>
  api.apiInstance.get(`/projects/${id}`);

export { getProjectListAPI, getProjectInfoAPI };
