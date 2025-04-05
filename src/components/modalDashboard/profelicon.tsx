import React from "react";
import Image from "next/image";
import RandomProfile from "../table/member/RandomProfile";

export interface ProfileIconProps {
  id: number;
  nickname: string;
  profileImageUrl: string;
  imgClassName: string;
  fontClassName: string;
  userId: number;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  nickname,
  profileImageUrl,
}) => (
  <div className="relative w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full overflow-hidden">
    {profileImageUrl ? (
      <Image
        src={profileImageUrl}
        alt="유저 프로필 아이콘"
        fill
        className="object-cover"
      />
    ) : (
      <RandomProfile name={nickname} />
    )}
  </div>
);
