// Column.tsx
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { CardType } from "@/types/task";
import TaskModal from "@/components/modalInput/TaskModal";
import { TodoButton, ShortTodoButton } from "@/components/button/TodoButton";
import ColumnDeleteModal from "@/components/columnCard/ColumnDeleteModal";
import { updateColumn, deleteColumn } from "@/api/columns";
import { getDashboardMembers, getCardDetail } from "@/api/card";
import { MemberType } from "@/types/users";
import { TEAM_ID } from "@/constants/team";
import { CardList } from "./CardList";
import CardDetailModal from "@/components/modalDashboard/CardDetailModal";
import { CardDetailType } from "@/types/cards";
import { toast } from "react-toastify";
import { useDashboardPermission } from "@/hooks/useDashboardPermission";
import FormModal from "@/components/modal/FormModal";

type ColumnProps = {
  columnId: number;
  title?: string;
  tasks?: CardType[];
  dashboardId: number;
  createdByMe: boolean;
  columnDelete: (columnId: number) => void;
  fetchColumnsAndCards: () => void;
};

export default function Column({
  columnId,
  title = "new Task",
  tasks = [],
  dashboardId,
  createdByMe,
  columnDelete,
  fetchColumnsAndCards,
}: ColumnProps) {
  const { canEditColumns } = useDashboardPermission(dashboardId, createdByMe);

  const [columnTitle, setColumnTitle] = useState(title);
  const [editTitle, setEditTitle] = useState(columnTitle);
  const [titleLength, setTitleLength] = useState<number>(0);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCardDetailModalOpen, setIsCardDetailModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardDetailType | null>(null);
  const [members, setMembers] = useState<
    {
      id: number;
      userId: number;
      nickname: string;
      profileImageUrl: string | null;
    }[]
  >([]);

  const maxColumnTitleLength = 15;

  // 카드리스트의 스크롤을 칼럼 영역으로 이동
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ 멤버 불러오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const result = await getDashboardMembers({ dashboardId });

        const parsed = result.map((m: MemberType) => ({
          id: m.id,
          userId: m.userId,
          nickname: m.nickname || m.email,
          profileImageUrl: m.profileImageUrl,
        }));

        setMembers(parsed);
      } catch (error) {
        console.error("멤버 불러오기 실패:", error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  const handleEditColumn = async (newTitle: string) => {
    if (!newTitle.trim()) {
      toast.error("칼럼 제목을 입력해 주세요.");
      return;
    }
    setIsColumnModalOpen(false);

    try {
      const updated = await updateColumn({ columnId, title: newTitle });
      setColumnTitle(updated.title);
      setIsColumnModalOpen(false);
      toast.success("칼럼 제목이 변경되었습니다.");
      fetchColumnsAndCards();
    } catch (error) {
      console.error("칼럼 제목 수정 실패:", error);
      toast.error("칼럼 제목 변경에 실패했습니다.");
    }
  };

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn({ columnId });
      setIsDeleteModalOpen(false);
      if (columnDelete) columnDelete(columnId);
      toast.success("칼럼이 삭제되었습니다.");
    } catch (error) {
      console.error("칼럼 삭제 실패:", error);
      toast.error("칼럼 삭제에 실패했습니다.");
    }
  };

  const handleCardClick = async (cardId: number) => {
    try {
      const detail = await getCardDetail(cardId);
      setSelectedCard(detail);
      setIsCardDetailModalOpen(true);
    } catch (e) {
      console.error("카드 상세 불러오기 실패:", e);
    }
  };

  return (
    <div
      className={`
      flex flex-col shrink-0 lg:items-center overflow-hidden p-4 mr-4 lg:my-0 mb-4
      border border-gray4 bg-[#F5F2FC] rounded-[12px]
      w-full lg:w-[370px] max-h-[325px] lg:max-h-[827px]
      `}
    >
      {/* 칼럼 헤더 */}
      <div className="shrink-0 mb-2">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 타이틀 + 카드 개수 */}
          <div className="flex items-center gap-2">
            <Image src="/svgs/ellipse.svg" alt="circle" width={8} height={8} />
            <h2
              className="text-black3 text-[16px] md:text-[18px] font-bold
            break-words sm:max-w-none max-w-[90px]"
            >
              {columnTitle}
            </h2>
            <span
              className="flex items-center justify-center leading-none
            w-[20px] h-[20px] bg-white text-primary text-14-m rounded-[4px]"
            >
              {tasks.length}
            </span>
          </div>
          {/* 오른쪽: 생성 버튼 + 설정 버튼 */}
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                if (!canEditColumns) {
                  toast.error("읽기 전용 대시보드입니다.");
                  return;
                }
                setIsTaskModalOpen(true);
              }}
              className="block lg:hidden"
            >
              <ShortTodoButton />
            </div>
            <div className="relative flex justify-end w-[22px] sm:w-[24px] h-[22px] sm:h-[24px]">
              <Image
                src="/svgs/settings.svg"
                alt="setting icon"
                fill
                priority
                className="object-contain cursor-pointer"
                onClick={() => {
                  if (!canEditColumns) {
                    toast.error("읽기 전용 대시보드입니다.");
                    return;
                  }
                  setEditTitle(columnTitle);
                  setTitleLength(columnTitle.length);
                  setIsColumnModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            onClick={() => {
              if (!canEditColumns) {
                toast.error("읽기 전용 대시보드입니다.");
                return;
              }
              setIsTaskModalOpen(true);
            }}
            className="mb-2 hidden lg:block"
          >
            <TodoButton />
          </div>
        </div>
      </div>

      {/* 스크롤바 컨테이너 */}
      <div className="flex flex-col lg:pl-[21px] overflow-y-auto w-full lg:w-[357px] rounded-md bg-[#F5F2FC]">
        {/* 카드 리스트 */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarGutter: "stable" }}
          ref={scrollRef}
        >
          <CardList
            columnId={columnId}
            teamId={TEAM_ID}
            initialTasks={tasks}
            onCardClick={(card) => handleCardClick(card.id)}
            scrollRoot={scrollRef}
          />
        </div>
      </div>

      {/* 카드 생성 모달 */}
      {isTaskModalOpen && (
        <TaskModal
          mode="create"
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          dashboardId={dashboardId}
          columnId={columnId}
          members={members}
          initialData={{
            status: columnTitle,
          }}
          onSubmit={fetchColumnsAndCards}
        />
      )}

      {/* 칼럼 관리 모달 */}
      {isColumnModalOpen && (
        <FormModal
          title="칼럼 이름 수정"
          inputLabel="이름"
          inputPlaceholder="변경할 이름을 입력해 주세요"
          inputValue={editTitle}
          onInputChange={(value) => {
            if (value.length <= maxColumnTitleLength) {
              setEditTitle(value);
              setTitleLength(value.length);
            }
          }}
          isInputValid={columnTitle.trim().length > 0}
          charCount={{
            current: titleLength,
            max: maxColumnTitleLength,
          }}
          onSubmit={() => {
            handleEditColumn(editTitle);
            setIsColumnModalOpen(false);
          }}
          submitText="변경"
          leftButtonText="삭제"
          onLeftButtonClick={() => {
            setIsColumnModalOpen(false);
            setIsDeleteModalOpen(true);
          }}
          onClose={() => setIsColumnModalOpen(false)}
        />
      )}

      {/* 칼럼 삭제 확인 모달 */}
      <ColumnDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteColumn}
      />

      {/* 카드 상세 모달 */}
      {isCardDetailModalOpen && selectedCard && (
        <CardDetailModal
          card={selectedCard}
          currentUserId={selectedCard.assignee.id}
          dashboardId={dashboardId}
          onClose={() => {
            setIsCardDetailModalOpen(false);
            setSelectedCard(null);
          }}
          onChangeCard={fetchColumnsAndCards}
          createdByMe={createdByMe}
        />
      )}
    </div>
  );
}
