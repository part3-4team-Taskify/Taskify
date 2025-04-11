import { useMemo, useRef, useState } from "react";
import { MoreVertical, X } from "lucide-react";
import CardDetail from "./CardDetail";
import CommentList from "./CommentList";
import CardInput from "@/components/modalInput/CardInput";
import { Representative } from "@/components/modalDashboard/Representative";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/api/comment";
import { deleteCard, EditCard } from "@/api/card";
import type { CardDetailType } from "@/types/cards";
import TaskModal from "@/components/modalInput/TaskModal";
import { useClosePopup } from "@/hooks/useClosePopup";
import { getColumn } from "@/api/columns";
import { toast } from "react-toastify";

interface CardDetailModalProps {
  card: CardDetailType;
  currentUserId: number;
  dashboardId: number;
  onClose: () => void;
  onChangeCard?: () => void;
}

interface ColumnType {
  id: number;
  title: string;
  status: string;
}

export default function CardDetailPage({
  card,
  currentUserId,
  dashboardId,
  onClose,
  onChangeCard,
}: CardDetailModalProps) {
  const [cardData, setCardData] = useState<CardDetailType>(card);
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const popupRef = useRef(null);
  useClosePopup(popupRef, () => setShowMenu(false));

  const { data: columns = [] } = useQuery<ColumnType[]>({
    queryKey: ["columns", dashboardId],
    queryFn: () => getColumn({ dashboardId, columnId: card.columnId }),
  });

  const columnName = useMemo(() => {
    return (
      columns.find((col) => String(col.id) === String(cardData.columnId))
        ?.title || "알 수 없음"
    );
  }, [columns, cardData.columnId]);

  const { mutate: createCommentMutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["comments", card.id] });
    },
  });

  const { mutate: deleteCardMutate } = useMutation({
    mutationFn: () => deleteCard(card.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      if (onChangeCard) onChangeCard();
      onClose();
      toast.success("카드가 삭제되었습니다.");
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    createCommentMutate({
      content: commentText,
      cardId: card.id,
      columnId: card.columnId,
      dashboardId,
    });
  };

  const { mutateAsync: updateCardMutate } = useMutation({
    mutationFn: (data: Partial<CardDetailType>) => EditCard(cardData.id, data),
    onSuccess: (updatedCard) => {
      setCardData(updatedCard);
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  return (
    <>
      {/* 모달 고정 div */}
      <div
        className="fixed inset-0 bg-black/30 z-50
      flex items-center justify-center px-4 sm:px-6"
      >
        {/* 카드 컨테이너 */}
        <div
          className="relative flex flex-col bg-white rounded-lg shadow-lg
          lg:w-[730px] sm:w-[678px] w-[327px] min-h-[710px]"
        >
          <div className="flex items-center justify-center px-6 pt-6 pb-2">
            {/* 내부 아이템 컨테이너 */}
            <div className="flex flex-col lg:w-[674px] sm:w-[614px] w-[295px]">
              {/* 헤더 */}
              <div className="flex justify-between sm:mb-4 mb-2">
                {/* 카드 제목 */}
                <h2 className="text-black3 font-bold sm:text-[24px] text-[20px]">
                  {cardData.title}
                </h2>
                {/* 버튼 컨테이너 */}
                <div
                  className="relative flex items-center sm:gap-[24px] gap-[16px]"
                  ref={popupRef}
                >
                  {/* 메뉴 버튼 */}
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="w-7 h-7 flex items-center justify-center hover:cursor-pointer"
                    title="수정하기"
                    type="button"
                  >
                    <MoreVertical className="w-8 h-8 text-black3 cursor-pointer" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 top-10 p-2 w-27 bg-white border border-[#D9D9D9] z-40 rounded-lg">
                      <button
                        className="block w-full px-4 py-2 text-base text-gray-800 hover:bg-[#F1EFFD] hover:text-[#5534DA] rounded-sm cursor-pointer"
                        type="button"
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setShowMenu(false);
                        }}
                      >
                        수정하기
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-base text-gray-800 hover:bg-[#F1EFFD] hover:text-[#5534DA] rounded-sm cursor-pointer"
                        type="button"
                        onClick={() => deleteCardMutate()}
                      >
                        삭제하기
                      </button>
                    </div>
                  )}
                  {/* 닫기 버튼 */}
                  <button onClick={handleClose} title="닫기">
                    <X className="w-7 h-7 flex items-center justify-center hover:cursor-pointer" />
                  </button>
                </div>
              </div>

              {/* 카드 내용 */}
              <div className="relative flex w-full">
                <CardDetail card={cardData} columnName={columnName} />
                <div className="absolute right-0">
                  <Representative card={card} />
                </div>
              </div>
              {/* 댓글 입력창 */}
              <div className="w-full lg:max-w-[445px] md:max-w-[420px] mt-4">
                <p className="mb-1 text-black3 font-medium sm:text-[16px] text-[14px]">
                  댓글
                </p>
                <CardInput
                  hasButton
                  small
                  value={commentText}
                  onTextChange={setCommentText}
                  onButtonClick={handleCommentSubmit}
                  placeholder="댓글 작성하기"
                />
              </div>

              {/* 댓글 목록 (스크롤 가능) */}
              <div
                className="w-full max-w-[450px] sm:max-h-[180px] max-h-[70px]
              mt-2 overflow-y-auto"
              >
                <CommentList
                  cardId={card.id}
                  currentUserId={currentUserId}
                  teamId={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      {isEditModalOpen && (
        <TaskModal
          mode="edit"
          columnId={card.columnId}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={async (data) => {
            const matchedColumn = columns.find(
              (col) => col.title === data.status
            );
            try {
              await updateCardMutate({
                columnId: matchedColumn?.id,
                assignee: { ...cardData.assignee, nickname: data.assignee },
                title: data.title,
                description: data.description,
                dueDate: data.deadline,
                tags: data.tags,
                imageUrl: data.image || undefined,
              });

              if (onChangeCard) onChangeCard();
              setIsEditModalOpen(false);
              toast.success("카드가 수정되었습니다.");
            } catch (err) {
              console.error("카드 수정 실패:", err);
              toast.error("카드 수정에 실패했습니다.");
            }
          }}
          initialData={{
            status: columnName,
            assignee: cardData.assignee.nickname,
            title: cardData.title,
            description: cardData.description,
            deadline: cardData.dueDate,
            tags: cardData.tags,
            image: cardData.imageUrl ?? "",
          }}
          members={[{ nickname: cardData.assignee.nickname }]}
        />
      )}
    </>
  );
}
