import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoIosHeart } from "react-icons/io";

const date = new Date();

export const HelpSettings = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Card className="shadow-none border-none ">
          <CardHeader className="px-0">
            <CardTitle className="text-lg font-semibold text-foreground leading-3">Mlibre</CardTitle>
            <CardDescription>Version 0.1.0</CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-none border-none ">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-semibold text-foreground leading-3">Contactez-nous</CardTitle>
            <CardDescription>
              Nous aimerions connaitre votre avis sur mlibre
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="flex flex-col gap-y-1">
              <Button
                className="w-fit underline p-0 h-fit font-normal"
                variant="ghost"
              >
                Contactez-nous
              </Button>
              <Button
                className="w-fit underline p-0 h-fit font-normal"
                variant="ghost"
              >
                Licences
              </Button>
              <Button
                className="w-fit underline p-0 h-fit font-normal"
                variant="ghost"
              >
                Conditions et politique de confidentialité
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-muted-foreground text-sm">
          <p className="">© {date.getFullYear()} Mlibre</p>
          <p className="">
            Made with <IoIosHeart className=" inline text-[#ff0000]" /> from DRC
          </p>
        </div>
      </div>
    </div>
  );
};
