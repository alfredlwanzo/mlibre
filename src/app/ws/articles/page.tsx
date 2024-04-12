import { TooltipWrap } from "@/components/tooltip-wrap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LiaEdit } from "react-icons/lia";

export default function ArticlesPage() {
  return (
    <div className=" bg-ws-background">
      <div className="h-16 flex items-center px-3">
        <h1 className=" font-bold flex-1">Articles</h1>
        <TooltipWrap content="Écrire un article">
          <Link href="/ws/articles/new">
            <Button variant="outline" className=" bg-transparent">
              <LiaEdit className="h-[1.2rem] w-[1.2rem] mr-2" />
              <span>Écrire</span>
            </Button>
          </Link>
        </TooltipWrap>
      </div>
    </div>
  );
}
