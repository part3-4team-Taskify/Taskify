import { ProfileIcon } from "./ProfileIcon";
import { CardDetailType } from "@/types/cards";

interface RepresentativeProps {
  card: CardDetailType;
}

export const Representative = ({ card }: RepresentativeProps) => {
  return (
    <div
      className="flex flex-col gap-4 top-20 right-10 p-3.5 w-[181px] h-[155px] lg:[200px]
    rounded-lg bg-white border border-[#D9D9D9]"
    >
      {/* 담당자 컨테이너 */}
      <div className="">
        <p className="font-12sb text-black3 mb-1">담당자</p>
        <div className="flex items-center gap-2">
          <ProfileIcon
            userId={card.assignee.id}
            nickname={card.assignee.nickname}
            profileImageUrl={card.assignee.profileImageUrl ?? ""}
            id={card.assignee.id}
            imgClassName="w-6 h-6"
            fontClassName="font-14r"
          />
          <span className="font-normal text-black3 sm:text-[14px] text-[12px]">
            {card.assignee.nickname}
          </span>
        </div>
      </div>

      {/* 마감일 컨테이너 */}
      <div>
        <p className="font-12sb text-black3 mb-1">마감일</p>
        <p className="font-normal text-black3 sm:text-[14px] text-[12px]">
          {new Date(card.dueDate).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
