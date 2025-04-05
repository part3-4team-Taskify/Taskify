import { TEAM_ID } from "@/constants/team";

export const apiRoutes = {
  // 로그인
  login: () => `/${TEAM_ID}/auth/login`, //post

  // 비밀번호 변경
  password: () => `/${TEAM_ID}/auth/password`, //put

  // 카드
  cards: () => `/${TEAM_ID}/cards`, //post,get
  cardDetail: (cardId: number) => `/${TEAM_ID}/cards/${cardId}`, //get,put,delete

  // 칼럼
  columns: () => `/${TEAM_ID}/columns`, //post,get
  columnDetail: (columnId: number) => `/${TEAM_ID}/columns/${columnId}`, //put,delete
  columnCardImage: (columnId: number) =>
    `/${TEAM_ID}/columns/${columnId}/card-image`, //post

  // 댓글
  comments: () => `/${TEAM_ID}/comments`, //post,get
  commentsDetail: (commentId: number) => `/${TEAM_ID}/comments/${commentId}`, //put,delete

  // 대시보드
  dashboards: () => `/${TEAM_ID}/dashboards`, //post,get
  dashboardDetail: (dashboardId: number) =>
    `/${TEAM_ID}/dashboards/${dashboardId}`, //get,put,delete

  // 대시보드 초대하기
  dashboardInvite: (dashboardId: number) =>
    `/${TEAM_ID}/dashboards/${dashboardId}/invitations`, //post,get
  dashboardInviteDelete: (dashboardId: number, invitationId: number) =>
    `/${TEAM_ID}/dashboards/${dashboardId}/invitations/${invitationId}`, //delete

  // 초대받은 대시보드
  invitations: () => `/${TEAM_ID}/invitations`, //get
  invitationDetail: (invitationId: number) =>
    `/${TEAM_ID}/invitations/${invitationId}`, //put

  // Members
  members: () => `/${TEAM_ID}/members`, //get
  memberDetail: (memberId: number) => `/${TEAM_ID}/members/${memberId}`, //delete

  // Users
  users: () => `/${TEAM_ID}/users`, //post
  usersMe: () => `/${TEAM_ID}/users/me`, //get,put
  userMeImage: () => `/${TEAM_ID}/users/me/image`, //post
};
