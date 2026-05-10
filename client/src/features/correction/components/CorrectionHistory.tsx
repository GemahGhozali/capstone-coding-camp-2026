import CorrectionHistoryItem from "./CorrectionHistoryItem";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { correctionHistoryQueryOptions } from "../api/correction.queries";
import type { CorrectionHistory } from "../types/correction.type";
import type { TabFilters } from "./TabsFilter";

interface CorrectionHistoryProps {
  searchQuery: string;
  filter: TabFilters;
  onCloseSidebar: () => void;
}

export default function CorrectionHistory({ searchQuery, filter, onCloseSidebar }: CorrectionHistoryProps) {
  const navigate = useNavigate();
  const { correctionId } = useParams();

  const correctionHistoryLoader = useLoaderData<CorrectionHistory[]>();
  const { data: corrections } = useQuery({ ...correctionHistoryQueryOptions(), initialData: correctionHistoryLoader });

  const filteredCorrections = filterCorrection(corrections, searchQuery, filter);

  const handleClickHistory = (id: string) => {
    onCloseSidebar();
    navigate(`/correction/${id}`);
  };

  return (
    <div className="overflow-y-auto grow flex flex-col gap-4 md:gap-6 px-4 md:px-6 pb-4 md:pb-6">
      {filteredCorrections.map((correction) => (
        <CorrectionHistoryItem key={correction.id} onClick={() => handleClickHistory(correction.id)} isActive={correction.id === correctionId} {...correction} />
      ))}
    </div>
  );
}

function filterCorrection(correction: Array<CorrectionHistory>, searchQuery: string, filter: TabFilters) {
  return correction.filter((correction) => {
    const matchSearch = correction.question.toLowerCase().includes(searchQuery.toLowerCase());

    const range = getScoreRange(filter);
    const matchFilter = !range || (correction.finalScore >= range.min && correction.finalScore <= range.max);

    return matchSearch && matchFilter;
  });
}

function getScoreRange(filter: TabFilters) {
  if (filter === "Nilai Tinggi") return { min: 76, max: 100 };
  if (filter === "Nilai Menengah") return { min: 41, max: 75 };
  if (filter === "Nilai Rendah") return { min: 0, max: 40 };
  return null;
}
