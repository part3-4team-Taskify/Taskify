import { apiRoutes } from "./apiRoutes";
import axiosInstance from "./axiosInstance";
import {
  CreateCommentType,
  UpdateCommenttype,
  DeleteCommentParams,
} from "../types/comments";
import { TEAM_ID } from "@/constants/team";

// 댓글 생성
export const createComment = async (data: CreateCommentType) => {
  const response = await axiosInstance.post(`/${TEAM_ID}/comments`, data);
  return response.data;
};

// 댓글 목록
export async function getComments({
  cardId,
  pageParam,
}: {
  cardId: number;
  pageParam: number;
}) {
  const response = await axiosInstance.get(apiRoutes.comments(), {
    params: {
      cardId,
      page: pageParam,
    },
  });

  return {
    comments: response.data.comments,
    nextPage: response.data.nextPage,
  };
}

// 댓글 수정
export const updateComment = async (
  commentId: number,
  data: UpdateCommenttype
) => {
  const response = await axiosInstance.put(
    apiRoutes.commentsDetail(commentId),
    data
  );
  return response.data;
};
// 댓글 삭제
export const deleteComment = async ({ commentId }: DeleteCommentParams) => {
  const response = await axiosInstance.delete(
    apiRoutes.commentsDetail(commentId)
  );
  return response.data;
};
