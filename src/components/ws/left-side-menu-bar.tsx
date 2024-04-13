'use client'
import { ModeToggle } from "@/components/mode-toggle";
import { FiHome, FiUsers } from "react-icons/fi";
import { PiGear } from "react-icons/pi";
import { UserAvatar } from "@/components/ws/user-avatar";
import { Separator } from "@/components/ui/separator";
import { WSMenu } from "./menu";
import { WSMenuItem, WSMenuItemType } from "./menu-item";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { BiBookContent } from "react-icons/bi";
import { LiaHashtagSolid } from "react-icons/lia";

const menuItems: WSMenuItemType[] = [
  {
    key: "dashboard",
    label: "Dashbord",
    href: "/ws",
    icon: <FiHome className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    key: "articles",
    label: "Articles",
    href: "/ws/articles",
    icon: <BiBookContent className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    key: "tags",
    label: "Tags",
    href: "/ws/tags",
    icon: <LiaHashtagSolid className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    key: "users",
    label: "Auteurs et Lecteurs",
    href: "/ws/users",
    icon: <FiUsers className="h-[1.2rem] w-[1.2rem]" />,
  },
];

export function LeftSideMenuBar() {
  const {theme}=useTheme()
  return (
    <aside className="h-full flex flex-col items-center p-3 border-r">
      <Link href="/ws">
        <Button variant="link">
          <svg
            className=" text-primary h-[1.2rem] w-[1.2rem]"
            width="1477"
            height="1307"
            viewBox="0 0 1477 1307"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              // fill-rule="evenodd"
              // clip-rule="evenodd"
              d="M425.958 677.867L346.307 498.025L309.945 677.867L192.2 1271H0L263.193 0H283.972L633.742 686.513L737.634 916.503L841.526 686.513L1184.37 0H1203.42L1477 1271H1286.53L1158.4 677.867L1120.3 498.025L1051.04 677.867L980.562 813.5H893.4L738.7 1167L584.7 813.5H496.042L425.958 677.867ZM748.794 1244.82C748.794 1239.4 744.388 1235 738.952 1235C733.516 1235 729.109 1239.4 729.109 1244.82V1297.18C729.109 1302.6 733.516 1307 738.952 1307C744.388 1307 748.794 1302.6 748.794 1297.18V1244.82ZM630.685 1257.91C630.685 1252.49 626.278 1248.09 620.842 1248.09C615.407 1248.09 611 1252.49 611 1257.91V1284.09C611 1289.51 615.407 1293.91 620.842 1293.91C626.278 1293.91 630.685 1289.51 630.685 1284.09V1257.91ZM670.055 1257.91C670.055 1252.49 665.648 1248.09 660.212 1248.09C654.776 1248.09 650.37 1252.49 650.37 1257.91V1284.09C650.37 1289.51 654.776 1293.91 660.212 1293.91C665.648 1293.91 670.055 1289.51 670.055 1284.09V1257.91ZM709.424 1257.91C709.424 1252.49 705.018 1248.09 699.582 1248.09C694.146 1248.09 689.74 1252.49 689.74 1257.91V1284.09C689.74 1289.51 694.146 1293.91 699.582 1293.91C705.018 1293.91 709.424 1289.51 709.424 1284.09V1257.91ZM788.164 1257.91C788.164 1252.49 783.757 1248.09 778.322 1248.09C772.886 1248.09 768.479 1252.49 768.479 1257.91V1284.09C768.479 1289.51 772.886 1293.91 778.322 1293.91C783.757 1293.91 788.164 1289.51 788.164 1284.09V1257.91ZM827.534 1257.91C827.534 1252.49 823.127 1248.09 817.691 1248.09C812.256 1248.09 807.849 1252.49 807.849 1257.91V1284.09C807.849 1289.51 812.256 1293.91 817.691 1293.91C823.127 1293.91 827.534 1289.51 827.534 1284.09V1257.91ZM866.904 1257.91C866.904 1252.49 862.497 1248.09 857.061 1248.09C851.625 1248.09 847.219 1252.49 847.219 1257.91V1284.09C847.219 1289.51 851.625 1293.91 857.061 1293.91C862.497 1293.91 866.904 1289.51 866.904 1284.09V1257.91Z"
              fill={theme==="dark"?"#fff":"#000"}
              // className="text-primary"
            />
          </svg>
        </Button>
      </Link>
      <Separator className="my-3" />
      <WSMenu items={menuItems} />
      <div className="flex-1" />
      <nav className="flex flex-col gap-y-3">
        <ModeToggle />
        <Separator />
        <WSMenuItem
          item={{
            key: "settings",
            label: "Paramètres",
            icon: <PiGear className="h-[1.2rem] w-[1.2rem]" />,
            href: "/ws/settings",
          }}
        />
        <UserAvatar />
      </nav>
    </aside>
  );
}
