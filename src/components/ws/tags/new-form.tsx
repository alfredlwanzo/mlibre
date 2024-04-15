"use client";
import { TooltipWrap } from "@/components/tooltip-wrap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, formatSlug } from "@/lib/utils";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoadingButton } from "@/components/ui/loading-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createTag } from "@/actions/ws/tags/create-tag";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TagType } from "@/lib/types";
import { RecentTagsList } from "./recent-tags";

export const newTagformSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom du tag doit comporter au moins 2 caractères.",
    })
    .trim(),
  slug: z.string(),
  description: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  imageUrl: z.string(),
  published: z.boolean(),
  verified: z.boolean(),
});

type NewTagFormProps = {
  recentTags?: TagType[];
};

export const NewTagForm: React.FC<NewTagFormProps> = ({ recentTags }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newTagformSchema>>({
    resolver: zodResolver(newTagformSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      published: true,
      verified: true,
    },
  });

  async function onSubmit(values: z.infer<typeof newTagformSchema>) {
    setLoading(true);
    const tag = await createTag(values).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
    if (tag) {
      toast({
        title: "Enregisté",
        variant: "success",
        description: "Le tag a été bien enregistrer",
      });
      setLoading(false);
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={cn(" bg-ws-background min-h-screen")}>
          <div className=" h-16 px-3 flex items-center gap-x-5">
            <div>
              <h1 className="text-sm font-bold">Nouveau tag</h1>
            </div>
            <div className="flex-1" />
            <div className="flex items-center space-x-3 py-2 rounded-md">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row space-x-2 items-center rounded-lg border px-3 py-1">
                    <FormLabel>Publié</FormLabel>
                    <FormControl className="p-0 m-0">
                      <Switch
                        checked={field.value}
                        disabled={loading}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <TooltipWrap content="Enregister les modifications">
              <LoadingButton
                type="submit"
                variant="default"
                loading={loading}
                disabled={loading}
                className=""
              >
                Enregistrer
              </LoadingButton>
            </TooltipWrap>
            <TooltipWrap content="Fermer l'éditeur">
              <Button
                variant="ghost"
                className=""
                size="icon"
                type="button"
                disabled={loading}
                onClick={(e) => {
                    e.preventDefault()
                  router.back();
                }}
              >
                <GrClose className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </TooltipWrap>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 max-w-screen-lg mx-auto min-w-60 bg-background border lg:rounded-lg">
            <div className=" col-span-2 lg:border-r">
              <ScrollArea className=" lg:h-[calc(100vh-66px)] ">
                <Card className=" border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Tag</CardTitle>
                    <CardDescription>
                      Un mot ou un groupe de mots court utilisé pour identifier
                      ou classifier du contenu, comme les articles, les images,
                      les vidéos, etc.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className=" space-y-4 flex flex-col  ">
                      <div>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className=" ">
                                <div className="relative flex items-center">
                              <FormLabel className="absolute left-3 text-2xl font-black text-primary">
                                #
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Nom du tag"
                                  className={cn(
                                    " pl-7 w-full bg-transparent text-2xl font-black text-primary"
                                  )}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    form.setValue(
                                      "slug",
                                      formatSlug(e.target.value)
                                    );
                                  }}
                                />
                              </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem className="items-center ">
                              <FormLabel className=" text-primary">
                                Slug
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Nom du tag"
                                  className={cn(
                                    " w-full bg-transparent text-primary"
                                  )}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem className=" ">
                              <FormLabel>Bref description du tag</FormLabel>
                              <FormControl>
                                <AutosizeTextarea
                                  {...field}
                                  className="text-muted-foreground"
                                />
                              </FormControl>
                              <FormMessage />
                              {/* <FormDescription className="">
                              Bref texte decrivant le tag
                            </FormDescription> */}
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-0.5 rounded-lg border p-3">
                        <FormLabel>Image de couverture</FormLabel>
                        <div>
                          <Button variant="outline" size="sm" type="button">
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Zone de contrôles</CardTitle>
                    <CardDescription>
                      L&apos;équipe de fact-checking, a pour rôle principal de
                      vérifier la véracité des informations, déclarations ou
                      affirmations publiées
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="verified"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ">
                            <div className="space-y-0.5">
                              <FormLabel>Vérification</FormLabel>
                              <FormDescription>
                                Le tag est-il vérifié et conforme à la ligne
                                éditoriale?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={loading}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
            <div className=" col-span-4">
              <ScrollArea className=" lg:h-[calc(100vh-66px)] ">
                <RecentTagsList tags={recentTags}/>
              </ScrollArea>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};