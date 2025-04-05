/* 댓글 생성 */
export interface CreateCommentType {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

/* 댓글 작성자 정보 */
export interface CommentAuthorType {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

/* 댓글 정보 (조회 및 수정 후 반환되는 데이터 구조) */
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: CommentAuthorType;
}

/* 댓글 수정 시 전송할 데이터 (업데이트할 댓글 내용) */
export interface UpdateCommenttype {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: CommentAuthorType;
}

/* 댓글 삭제 시 필요한 파라미터 */
export interface DeleteCommentParams {
  commentId: number;
}

//컴포넌트 props
export interface UpdateCommentProps {
  currentUserId: number;
  teamId: string;
  comment: Comment;
}
