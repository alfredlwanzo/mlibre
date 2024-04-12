"use client";

import * as React from "react";
import { LiaUserSolid } from "react-icons/lia";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FiLogOut } from "react-icons/fi";
import { TooltipWrap } from "../tooltip-wrap";
import { Button } from "../ui/button";
import { PiGear } from "react-icons/pi";
import { useRouter } from "next/navigation";

export function UserAvatar() {
  const router=useRouter()
  return (
    <DropdownMenu>
      <TooltipWrap content="Compte utilisateur">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </TooltipWrap>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>demo@witrine.app</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>
          <LiaUserSolid className="mr-2 " />
          Profil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <FiLogOut className="mr-2" />
          Déconnexion
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {router.push("/ws/settings")}}>
          <PiGear className="mr-2" />
          Paramètres
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
