"use client";
import { deleteArticle } from "@/actions/ws/articles/delete-article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { ArticleType } from "@/lib/types";
import { getHSLColor } from "@/lib/utils";
import { LucideExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type ArticleCardProps = {
  article: ArticleType;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { toast } = useToast();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setOpenDelete(false);
    setLoading(true);
    const deletedArticle = await deleteArticle({ articleId: article.id }).catch(
      () => {
        toast({
          title: "Echec",
          variant: "destructive",
          description: (
            <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
          ),
        });
        setLoading(false);
      }
    );
    if (deletedArticle) {
      toast({
        title: "Supprimé",
        variant: "success",
        description: "L'article a été bien supprimer",
      });
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 bg-background rounded-lg">
      <div className="flex flex-col ">
        <div className="flex space-x-1">
          <Link href={`/ws/articles/${article.id}`}>
            <h3 className="font-semibold  tracking-tight">{article.title}</h3>
          </Link>
          <Link
            href={`/${article.slug}`}
            target="_blank"
            className="text-muted-foreground hover:text-primary"
          >
            <LucideExternalLink className=" h-[1.2rem] w-[1.2rem]" />
          </Link>
        </div>

        <div className="">
          {article.tags?.map((tag) => (
            <Badge key={tag.tagId} variant="secondary" className="mr-1">
              <span style={{ color: getHSLColor(`${tag.tag?.name}`) }}>#</span>
              {tag.tag?.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:items-end py-4 md:py-0 ">
        <div>
          {article.blocked && (
            <Badge variant="destructive" className="w-fit mr-1">
              Bloqué
            </Badge>
          )}
          {article.published ? (
            <Badge className="w-fit">Publié</Badge>
          ) : (
            <Badge className="w-fit">En attente de plublication</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Le {article.updatedAt.toLocaleDateString("fr")}
        </p>
        <h3 className="text-sm font-semibold text-muted-foreground leading-none tracking-tight">
          {article?.author?.name ?? ""}
        </h3>
      </div>
      <div className="flex justify-end items-end space-x-3">
        <Link href={`/ws/articles/${article.id}`}>
          <Button variant="secondary" size="sm" disabled={loading}>
            Modifier
          </Button>
        </Link>
        <Popover open={openDelete} onOpenChange={setOpenDelete}>
          <PopoverTrigger disabled={loading}>
            <LoadingButton
              variant="ghost"
              size="sm"
              loading={loading}
              type="button"
            >
              Supprimer
            </LoadingButton>
          </PopoverTrigger>
          <PopoverContent className=" border-none">
            <div>
              <h3 className="text-sm font-semibold">
                Voulez-vous supprimer: {article.title}?
              </h3>
              <p className=" text-sm opacity-90">
                Si oui, cet article sera supprimé définitivement. Noter que
                cette opération est irréversible.
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
      </div>
    </div>
  );
};
