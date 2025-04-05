import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";

export interface StatusOption {
  label: string;
  value: number;
}

interface Column {
  id: number;
  title: string;
}

export const useStatusOptions = () => {
  const router = useRouter();
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamId = router.query.teamId as string;
    const dashboardId = Number(router.query.dashboardId);

    if (!teamId || isNaN(dashboardId)) {
      console.warn("❗ teamId 또는 dashboardId가 유효하지 않습니다.");
      return;
    }

    const fetch = async () => {
      try {
        const res = await axiosInstance.get(apiRoutes.columns(), {
          params: { dashboardId },
        });

        const options = (res.data.data as Column[]).map((col) => ({
          label: col.title,
          value: col.id,
        }));

        setStatusOptions(options);
      } catch (err) {
        console.error("상태 목록 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [router.query.teamId, router.query.dashboardId]);

  return { statusOptions, loading };
};
