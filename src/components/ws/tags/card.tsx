"use client";
import { deleteTag } from "@/actions/ws/tags/delete-tag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { TagType } from "@/lib/types";
import { cn, getHSLColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TagCardProps = {
  tag: TagType;
  withDescription?: boolean;
  withActions?: boolean;
  className?:string
};
export const TagCard: React.FC<TagCardProps> = ({
  tag,
  withDescription = false,
  withActions = false,
  className
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setOpenDelete(false);
    setLoading(true);
    const deletedTag = await deleteTag(tag.id).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
    if (deletedTag) {
      toast({
        title: "Supprimé",
        variant: "success",
        description: "Le tag a été bien supprimer",
      });
      setLoading(false);
    }
  };

  return (
    <Card className={cn("flex flex-col shadow-none",className)}>
      <CardHeader className="flex flex-col">
        <Link href={`/ws/tags/${tag.slug}`}>
          <CardTitle className=" ">
            <Badge className=" bg-opacity-10">
              <span className={cn()} style={{ color: getHSLColor(tag.name) }}>
                #
              </span>
              {tag.name}
            </Badge>
          </CardTitle>
        </Link>
        <CardDescription
          className={cn("flex-1", withDescription ? "block" : "hidden")}
        >
          {tag.description}
        </CardDescription>
      </CardHeader>
      <div className="flex-1" />
      <CardFooter className={cn("space-x-3", withActions ? "flex" : "hidden")}>
        {tag.imageUrl && (
          <Image src={tag.imageUrl} alt="" height={64} width={64} />
        )}
        <Button
          className=""
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/ws/tags/${tag.slug}`);
          }}
        >
          Modifier
        </Button>

        <Popover open={openDelete} onOpenChange={setOpenDelete}>
          <PopoverTrigger disabled={loading}>
            <LoadingButton
              variant="ghost"
              size="sm"
              loading={loading}
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Supprimer
            </LoadingButton>
          </PopoverTrigger>
          <PopoverContent className=" border-none">
            <div>
              <h3 className="text-sm font-semibold">
                Voulez-vous supprimer #{tag.name}?
              </h3>
              <p className=" text-sm opacity-90">
                Si oui, ce tag sera retiré de tout contenu qui l&apos;utilise.
                Noter que cette opération est irréversible.
              </p>
            </div>
            <div className="flex justify-end space-x-3 mt-3">
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Oui
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setOpenDelete(false);
                }}
              >
                Non
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};