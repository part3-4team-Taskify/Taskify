import { useState } from "react";
import { usePostGuard } from "@/hooks/usePostGuard";
import Input from "../input/Input";
import Image from "next/image";
import { createDashboard } from "@/api/dashboards";
import { toast } from "react-toastify";

interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface NewDashboardProps {
  teamId: string;
  onClose?: () => void;
  onCreate?: (newDashboard: Dashboard) => void;
}

export default function NewDashboard({ onClose, onCreate }: NewDashboardProps) {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [titleLength, setTitleLength] = useState<number>(0);

  const { guard: postGuard, isLoading } = usePostGuard();

  const maxTitleLength = 30;
  const colors = ["#7ac555", "#760DDE", "#FF9800", "#76A5EA", "#E876EA"];

  /* 대시보드 이름 글자수 제한 */
  const handleTitleChange = async (value: string) => {
    if (value.length <= maxTitleLength) {
      setTitle(value);
      setTitleLength(value.length);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      color: selected !== null ? colors[selected] : "",
    };

    try {
      await postGuard(async () => {
        const response = await createDashboard(payload);
        onCreate?.(response.data);
        onClose?.();
        toast.success("대시보드가 생성되었습니다.");
      });
    } catch (error) {
      console.error("대시보드 생성 실패:", error);
      toast.error("대시보드 생성에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/35 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[327px] sm:w-[584px] sm:h-[344px]">
        <h2 className="text-[20px] sm:text-[24px] font-bold text-black3">
          새로운 대시보드
        </h2>
        <div className="relative w-full">
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            label="대시보드 이름"
            labelClassName="font-medium text-black3 sm:text-[18px] text-[16px] mt-6"
            placeholder="뉴 프로젝트"
            className="max-w-[620px] mb-1 pr-14
          text-black3 font-normal sm:text-[18px] text-[16px]
          placeholder:sm:text-[18px] placeholder:text-[16px]"
          />
          <span
            className="absolute right-3 top-2/5 translate-y-6.5 font-light
            text-[12px] sm:text-[14px] text-gray1 sm:pr-1.5"
          >
            {titleLength} / {maxTitleLength}
          </span>
        </div>

        <div className="mt-3 flex relative">
          {colors.map((color, index) => (
            <div key={index} className="relative">
              <button
                className="cursor-pointer w-[30px] h-[30px] rounded-[15px] mr-2 transition-all duration-200 
                    hover:opacity-70 hover:scale-110"
                style={{ backgroundColor: color }}
                onClick={() => setSelected(index)}
              />
              {selected === index && (
                <Image
                  src="/svgs/check.svg"
                  alt="선택표시 이미지"
                  width={23}
                  height={23}
                  className="absolute top-4 left-4 transform -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 gap-2 flex justify-between">
          <button
            onClick={onClose}
            className="cursor-pointer
            sm:w-[256px] sm:h-[54px] w-[144px] h-[54px] rounded-[8px]
            border border-gray3 text-gray1"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || selected === null || isLoading}
            className={`sm:w-[256px] sm:h-[54px] w-[144px] h-[54px] rounded-[8px] 
            border border-gray3 text-white 
            ${!title || selected === null ? "bg-gray-300" : "bg-primary cursor-pointer"}`}
          >
            {isLoading ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>
    </div>
  );
}
