import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getColumns } from "@/api/columns";
import { CardDetailType } from "@/types/cards";
import { getDashboardMembers } from "@/api/card";
import { ColumnType } from "@/types/task";

export function useCardDetailState(card: CardDetailType, dashboardId: number) {
  const [cardData, setCardData] = useState<CardDetailType>(card);

  // 🔹 전체 칼럼 목록 조회
  const { data: columns = [] } = useQuery<ColumnType[]>({
    queryKey: ["columns", dashboardId],
    queryFn: () => getColumns({ dashboardId }),
  });

  // 🔹 대시보드 멤버 목록 조회
  const { data: members = [] } = useQuery({
    queryKey: ["dashboardMembers", dashboardId],
    queryFn: () => getDashboardMembers({ dashboardId }),
  });

  // 🔹 칼럼 이름 가져오기 (방어 로직 포함)
  const columnName = useMemo(() => {
    if (!Array.isArray(columns)) return "알 수 없음";
    return (
      columns.find((col) => col.id === cardData.columnId)?.title || "알 수 없음"
    );
  }, [columns, cardData.columnId]);

  return {
    cardData,
    setCardData,
    columnName,
    columns,
    members,
  };
}
