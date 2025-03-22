import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface MemberType {
  id: number;
  profileImageUrl: string;
  nickname: string;
}

/*dummy data*/
const user = {
  nickname: "배유철",
  initials: "B",
};
const dummyData: MemberType[] = [
  {
    id: 1,
    profileImageUrl: "../svgs/dummy-icon.png",
    nickname: "조민지",
  },
  { id: 2, profileImageUrl: "../svgs/dummy-icon.png", nickname: "황혜진" },
  { id: 3, profileImageUrl: "../svgs/dummy-icon.png", nickname: "김교연" },
  { id: 4, profileImageUrl: "../svgs/dummy-icon.png", nickname: "정종우" },
  { id: 5, profileImageUrl: "../svgs/dummy-icon.png", nickname: "임용균" },
];

const HeaderMyPage = () => {
  /*멤버 목록 profileImageUrl loading*/
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<MemberType[]>([]);
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

  /*테스트용 api 요청 코드, api 폴더로 옮길 예정*/
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get<{ results: MemberType[] }>(
          "https://sp-taskify-api.vercel.app/13-4/members"
        );

        setMembers(
          response.data?.results.length ? response.data.results : dummyData
        );
      } catch (error) {
        console.error("API 요청 실패:", error);

        setMembers(dummyData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <header className="w-full h-[50px] sm:h-[60px] md:h-[70px] flex items-center justify-center bg-white border-b-[1px] border-b-[#D9D9D9]">
      <div className="w-full flex items-center justify-between pl-[18vw]">
        <div className="flex items-center">
          <p className="hidden lg:block text-base text-black3 font-bold md:text-xl">
            계정관리
          </p>
        </div>

        <div className="flex items-center">
          <div className="flex space-x-[6px] md:space-x-[16px] pr-[40px]">
            <button
              onClick={goToDashboardEdit}
              className="flex items-center justify-center w-[49px] h-[30px] md:w-[85px] md:h-[36px] lg:w-[88px] lg:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px] cursor-pointer"
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
              className="flex items-center justify-center w-[73px] h-[30px] md:w-[109px] md:h-[36px] lg:w-[116px] lg:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px] cursor-pointer"
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

          {/*4개의 프로필 아이콘 표시, 나머지 멤버 숫자 +n 아이콘으로 표시*/}
          <div className="flex -space-x-3">
            {isLoading ? (
              <p className="text-gray-500 text-sm">로딩 중...</p>
            ) : (
              <>
                {members.slice(0, 4).map((member, index) => (
                  <img
                    key={member.id}
                    src={member.profileImageUrl || "../svgs/dummy-icon.png"}
                    alt={member.nickname}
                    className="w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full border-[2px] border-white"
                  />
                ))}
                {members.length > 4 && (
                  <div className="w-[34px] h-[34px] md:w-[38px] md:h-[38px] flex items-center justify-center rounded-full border-[2px] border-white bg-[#F4D7DA] font-16m text-[#D25B68]">
                    +{members.length - 4}
                  </div>
                )}
              </>
            )}
          </div>

          {/*구분선*/}
          <div className="pl-[15px] pr-[20px] md:pl-[25px] md:pr-[30px] lg:pl-[30px] lg:pr-[35px]">
            <div className="flex items-center justify-center h-[34px] md:h-[38px] w-[1px] bg-[var(--color-gray3)]"></div>
          </div>

          {/*유저 프로필 아이콘 & 유저 닉네임*/}
          <div className="flex items-center pr-[10px] md:pr-[30px] lg:pr-[80px] gap-[12px]">
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[var(--color-green)] text-bold text-white">
              {user.initials /*profileImageUrl로 변경*/}
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

export default HeaderMyPage;
