import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import axiosInstance from "@/api/axiosInstance";
import { TEAM_ID } from "@/constants/team";

export interface StatusOption {
  label: string;
  value: number;
}

interface Column {
  id: number;
  title: string;
}

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

export default function StatusSelect({
  value,
  onChange,
  label,
  required,
}: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);

  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);

  const selectedStatus = statusOptions.find((opt) => opt.label === value);

  useEffect(() => {
    console.log("📌 TEAM_ID:", TEAM_ID);
    console.log("📌 dashboardId:", dashboardId);

    if (!TEAM_ID || isNaN(dashboardId)) {
      console.warn("❌ TEAM_ID 또는 dashboardId가 유효하지 않습니다.");
      return;
    }

    const loadOptions = async () => {
      try {
        const res = await axiosInstance.get(`/${TEAM_ID}/columns`, {
          params: { dashboardId },
        });

        console.log("✅ 상태 목록 응답:", res.data);

        const options = (res.data.data as Column[]).map((col) => ({
          label: col.title,
          value: col.id,
        }));

        setStatusOptions(options);
      } catch (err) {
        console.error("❌ 상태 목록 불러오기 실패:", err);
      }
    };

    loadOptions();
  }, [dashboardId]);

  return (
    <div className="inline-flex flex-col items-start gap-2.5 w-full max-w-[520px]">
      {label && (
        <p className="font-18m text-[var(--color-black)]">
          {label}
          {required && <span className="text-[var(--color-purple)]">*</span>}
        </p>
      )}

      <div className="relative w-full">
        <div
          className="flex items-center justify-between h-[48px] px-4 border border-[var(--color-gray3)] rounded-md cursor-pointer focus-within:border-[var(--primary)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedStatus ? (
            <div className="flex items-center gap-2 bg-[#F3EDFF] rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-[#5D2EFF]" />
              <span className="text-sm text-[#5D2EFF]">
                {selectedStatus.label}
              </span>
            </div>
          ) : (
            <span className="text-sm text-[var(--color-gray2)]">
              상태를 선택해주세요
            </span>
          )}
          <Image
            src="/svgs/arrow-down.svg"
            width={20}
            height={20}
            alt="dropdown"
          />
        </div>

        {isOpen && (
          <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 px-2 py-2">
            {statusOptions.map((status) => (
              <li
                key={status.value}
                onClick={() => {
                  onChange(status.label);
                  setIsOpen(false);
                }}
                className={clsx(
                  "flex items-center justify-between cursor-pointer mb-1 last:mb-0 rounded-full px-3 py-1 hover:bg-[#F3EDFF]",
                  value === status.label && "bg-[#F3EDFF]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5D2EFF]" />
                  <span className="text-sm text-[#5D2EFF]">{status.label}</span>
                </div>
                {value === status.label && (
                  <span className="text-[#5D2EFF] text-sm">✔</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
