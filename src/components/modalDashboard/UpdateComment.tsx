// ✅ UpdateComment.tsx
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteComment, updateComment } from "@/api/comment";
import { Comment } from "@/types/comments";
import { ProfileIcon } from "./profelicon";
import formatDate from "./formatDate";

interface UpdateCommentProps {
  comment: Comment;
  currentUserId: number;
  teamId: string;
}

export default function UpdateComment({
  comment,
  currentUserId,
}: UpdateCommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const queryClient = useQueryClient();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedContent(comment.content);
  };

  const handleDelete = async () => {
    await deleteComment({ commentId: comment.id });
    queryClient.invalidateQueries({ queryKey: ["comments", comment.cardId] });
  };

  const handleSave = async () => {
    await updateComment(comment.id, {
      ...comment,
      content: editedContent,
    });
    queryClient.invalidateQueries({ queryKey: ["comments", comment.cardId] });
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3 items-start w-full">
      {/* 프로필 */}
      <ProfileIcon
        userId={comment.author.id}
        nickname={comment.author.nickname}
        profileImageUrl={comment.author.profileImageUrl}
        imgClassName="w-8 h-8"
        fontClassName="text-sm"
        id={0}
      />

      {/* 댓글 내용 */}
      <div className="flex flex-col w-full space-y-1">
        {/* 작성자 + 시간 */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold text-black">
            {comment.author.nickname}
          </span>
          <span>{formatDate(comment.createdAt)}</span>
        </div>

        {/* 본문 */}
        {isEditing ? (
          <>
            <textarea
              className="w-full p-2 text-sm"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              aria-label="댓글"
            />
            <div className="flex gap-2 mt-1 text-sm">
              <button
                onClick={handleSave}
                disabled={editedContent === comment.content}
              >
                저장
              </button>
              <button onClick={handleEditToggle}>취소</button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm whitespace-pre-wrap break-words">
              {comment.content}
            </p>
            {currentUserId === comment.author.id && (
              <div className="flex gap-2 text-xs text-gray-500 mt-1">
                <button onClick={handleEditToggle}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
