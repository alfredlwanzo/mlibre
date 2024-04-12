"use client";
import { SearchBar } from "@/components/searchBar";
import { TooltipWrap } from "@/components/tooltip-wrap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";

export default function CategoriesPage() {
  const router = useRouter();
  return (
    <div className=" bg-ws-background">
      <div className="h-16 flex items-center px-3 space-x-4">
        <h1 className=" font-bold">Tags</h1>
        <div className="flex-1">
          <SearchBar
            onValueChange={({value}) => {
              router.push(`/ws/tags/?q=${value}`);
            }}
          />
        </div>
        <TooltipWrap content="Créer une tag">
          <Link href="/ws/tag/new">
            <Button variant="outline" className=" bg-transparent">
              <HiPlus className="h-[1.2rem] w-[1.2rem] mr-2" />
              <span>Créer</span>
            </Button>
          </Link>
        </TooltipWrap>
      </div>
    </div>
  );
}
