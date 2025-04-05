export interface Assignee {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface CardDetailType {
  status: string;
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string | null;
  columnId: number;
  createdAt: string;
  updatedAt: string;
  dashboardId: number;
}
