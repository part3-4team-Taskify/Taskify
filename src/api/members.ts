import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";

// 대시보드 멤버 목록 조회
export const getMembers = async ({ dashboardId }: { dashboardId: number }) => {
  if (!dashboardId) {
    console.error("dashboardID가 없습니다.");
    return [];
  }
  const response = await axiosInstance.get(apiRoutes.members(), {
    params: {
      dashboardId,
    },
  });
  return response.data.members || [];
};

// 대시보드 멤버 삭제
export const deleteMembers = async (memberId: number) => {
  const response = await axiosInstance.delete(apiRoutes.memberDetail(memberId));
  return response.data;
};
