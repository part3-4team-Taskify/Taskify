import React from "react";
import RandomProfile from "../table/member/RandomProfile";
import Image from "next/image";
import { MemberType, UserType } from "@/types/users";

/*멤버 프로필 아이콘*/
interface MemberIconProps {
  members: MemberType;
  variant?: "mydashboard" | "dashboard" | "edit" | "mypage";
}

export const MemberProfileIcon: React.FC<MemberIconProps> = ({ members }) => (
  <div className="relative flex items-center justify-center w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full border-[2px] border-white overflow-hidden">
    {members.profileImageUrl ? (
      <Image
        src={members.profileImageUrl}
        alt="멤버 프로필 아이콘"
        fill
        className="object-cover"
      />
    ) : (
      <RandomProfile name={members.nickname} />
    )}
  </div>
);

/*유저 프로필 아이콘*/
interface UserIconProps {
  user: UserType;
}

export const UserProfileIcon: React.FC<UserIconProps> = ({ user }) => (
  <div className="relative w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full overflow-hidden">
    {user.profileImageUrl ? (
      <Image
        src={user.profileImageUrl}
        alt="유저 프로필 아이콘"
        fill
        className="object-cover"
      />
    ) : (
      <RandomProfile name={user.nickname} />
    )}
  </div>
);
