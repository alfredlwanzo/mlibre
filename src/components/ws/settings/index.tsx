"use client";

import { TooltipWrap } from "@/components/tooltip-wrap";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PiGear } from "react-icons/pi";

export const SettingsSheet = () => {
  return (
    <Sheet >
      <SheetTrigger>
      <TooltipWrap content="Paramètres" side="right">
        <Button
          variant="ghost"
          size="icon"
          className={cn( "relative")}
        >
          <PiGear className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </TooltipWrap>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Paramètres</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
