import { Button } from "@/components/ui/button";
import { LeftSideMenuBar } from "@/components/ws/left-side-menu-bar";

export default function WSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="  h-screen flex  2xl:border 2xl:rounded-xl">
      <LeftSideMenuBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
