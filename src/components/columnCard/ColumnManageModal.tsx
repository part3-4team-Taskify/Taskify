import { useState } from "react";
import { Modal } from "../modal/Modal";
import { CustomBtn } from "../button/CustomButton";
import Input from "../input/Input";
import Image from "next/image";

type ColumnManageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeleteClick: () => void;
  columnTitle: string;
  onEditSubmit: (newTitle: string) => void;
};

export default function ColumnManageModal({
  isOpen,
  onClose,
  onDeleteClick,
  columnTitle,
  onEditSubmit,
}: ColumnManageModalProps) {
  const [newTitle, setNewTile] = useState(columnTitle);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="w-[327px] sm:w-[568px]"
      height="h-[258px] sm:h-[266px]"
    >
      <div className="relative flex flex-col gap-5">
        <Image
          src="/svgs/close.svg"
          alt="close icon"
          width={24}
          height={24}
          priority
          className="absolute  right-4 cursor-pointer hover:opacity-70"
          onClick={onClose}
        />
        <h2 className="text-2xl font-bold">칼럼 관리</h2>
        <label className="font-medium flex flex-col gap-2">
          이름
          <Input
            type="text"
            value={newTitle}
            onChange={(value) => setNewTile(value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEditSubmit(newTitle);
              }
            }}
          />
        </label>
        <div className="flex justify-between mt-1.5">
          <CustomBtn variant="outlineDisabled" onClick={onDeleteClick}>
            삭제
          </CustomBtn>
          <CustomBtn onClick={() => onEditSubmit(newTitle)}>변경</CustomBtn>
        </div>
      </div>
    </Modal>
  );
}
