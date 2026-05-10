import { useState } from "react";
import { useLogout } from "@/features/auth";
import useAuthStore from "@/stores/auth.store";
import Button from "@/components/ui/Button";
import UserProfile from "@/components/ui/UserProfile";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import CorrectionHistory from "./CorrectionHistory";
import SidebarHeader from "./SidebarHeader";
import TabsFilter from "./TabsFilter";
import type { TabFilters } from "./TabsFilter";

interface SidebarProps {
  isClosed: boolean;
  onCloseSidebar: () => void;
}

export default function Sidebar({ isClosed, onCloseSidebar }: SidebarProps) {
  const [searchQuery, setSearchQuestion] = useState<string>("");
  const [tabFilter, setTabFilter] = useState<TabFilters>("Semua");

  const { mutate: logout } = useLogout();

  const user = useAuthStore((state) => state.user);

  return (
    <div
      className={`duration-300 ease-in-out transition-transform max-xl:h-full bg-white border-l border-neutral-300 w-full xl:max-w-130 flex flex-col overflow-hidden max-xl:absolute max-xl:top-0 max-xl:left-0 ${isClosed ? "max-xl:translate-x-full" : "max-xl:translate-x-0"}`}
    >
      <SidebarHeader searchQuery={searchQuery} onSearch={setSearchQuestion} onCloseSidebar={onCloseSidebar} />

      <TabsFilter activeTab={tabFilter} onSelect={setTabFilter} />

      <CorrectionHistory searchQuery={searchQuery} filter={tabFilter} onCloseSidebar={onCloseSidebar} />

      <div className="flex justify-between items-center xl:hidden p-4 md:p-6 bg-white shrink-0 border-t border-neutral-300">
        {user && <UserProfile direction="right" username={user.username} email={user.email} />}
        <Button size="large" icon={<LogoutIcon className="size-5 text-white" />} iconPosition="only" color="black" onClick={() => logout()} />
      </div>
    </div>
  );
}
