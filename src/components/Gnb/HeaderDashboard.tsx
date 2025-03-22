import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

/*dummy data*/
const user = {
  nickname: "배유철",
  initials: "B",
};

const headerDashboard = () => {
  /*관리 버튼 클릭 이벤트 함수*/
  const router = useRouter();
  const goToDashboardEdit = () => {
    router.push(`/dashboard/${dashboardid}/edit`);
  };
  /*초대하기 버튼 클릭 시 모달 팝업 오픈*/
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openInviteModal = () => {
    setIsModalOpen(true);
  };
  const closeInviteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="w-full h-[50px] sm:h-[60px] md:h-[70px] flex items-center justify-center bg-white border-b-[1px] border-b-[#D9D9D9]">
      <div className="w-full flex items-center justify-between pl-[18vw]">
        <div className="flex items-center">
          <p className="text-base text-black3 font-bold md:text-xl">
            내 대시보드
          </p>
        </div>

        <div className="flex items-center">
          <div className="flex space-x-[6px] md:space-x-[16px]">
            <button
              onClick={goToDashboardEdit}
              className="flex items-center justify-center w-[49px] h-[30px] md:w-[88px] md:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px] cursor-pointer"
            >
              <img
                src="../svgs/settings.svg"
                alt="관리 아이콘"
                className="w-[20px] h-[20px] hidden md:block"
              />
              <span className="text-sm md:text-base text-gray1">관리</span>
            </button>

            <button
              onClick={openInviteModal}
              className="flex items-center justify-center w-[73px] h-[30px] md:w-[116px] md:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px] cursor-pointer"
            >
              <img
                src="../svgs/add-box.svg"
                alt="초대하기 아이콘"
                className="w-[20px] h-[20px] hidden md:block"
              />
              <span className="text-sm md:text-base text-gray1">초대하기</span>
            </button>
            {/*임시 컴포넌트, 나중에 진짜 초대 모달 컴포넌트로 교체*/}
            {isModalOpen && <ModalInviting onClose={closeInviteModal} />}
          </div>

          <div className="pl-[15px] pr-[20px] md:pl-[25px] md:pr-[30px] lg:pl-[30px] lg:pr-[35px]">
            <div className="flex items-center justify-center h-[34px] md:h-[38px] w-[1px] bg-[var(--color-gray3)]"></div>
          </div>

          <div className="flex items-center pr-[10px] md:pr-[30px] lg:pr-[80px] gap-[12px]">
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[var(--color-green)] text-bold text-white">
              {
                user.initials //*profileImageUrl로 변경*//
              }
            </div>
            <span className="hidden md:block text-black3 md:text-base md:font-medium">
              {user.nickname}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default headerDashboard;
