import Tab from "@/components/ui/Tab";

export type TabFilters = "Semua" | "Nilai Tinggi" | "Nilai Menengah" | "Nilai Rendah";

interface TabsFilterProps {
  activeTab: TabFilters;
  onSelect: (value: TabFilters) => void;
}

export default function TabsFilter({ activeTab, onSelect }: TabsFilterProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide py-4 md:py-6 shrink-0">
      <div className="flex gap-2 *:shrink-0 px-4 md:px-6 w-max">
        <Tab isActive={activeTab === "Semua"} onClick={() => onSelect("Semua")}>
          Semua Koreksi
        </Tab>
        <Tab isActive={activeTab === "Nilai Tinggi"} onClick={() => onSelect("Nilai Tinggi")}>
          Nilai Tinggi
        </Tab>
        <Tab isActive={activeTab === "Nilai Menengah"} onClick={() => onSelect("Nilai Menengah")}>
          Nilai Menengah
        </Tab>
        <Tab isActive={activeTab === "Nilai Rendah"} onClick={() => onSelect("Nilai Rendah")}>
          Nilai Rendah
        </Tab>
      </div>
    </div>
  );
}
