import { TooltipWrap } from "@/components/tooltip-wrap";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FiEye } from "react-icons/fi";

export default function WSArticlePage() {
  return (
    <div>
      <div className=" h-16 px-3 flex items-center gap-x-3">
        <div>
          <h1 className="text-sm font-bold">Nouvel article</h1>
        </div>
        <div className="flex-1" />
        <TooltipWrap content="Prévisualiser">
          <Button variant="ghost" size="icon" className="">
            <FiEye className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </TooltipWrap>
        <div className="flex items-center space-x-3 py-2 rounded-md">
          <Label htmlFor="publish">Publié</Label>
          <Switch id="publish" className="" />
        </div>
      </div>
    </div>
  );
}
