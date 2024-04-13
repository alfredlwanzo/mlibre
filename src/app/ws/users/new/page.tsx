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
import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EyeIcon } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Le format de l'adresse mail n'est pas valide" }),
  password: z.string().min(6, {
    message: "Le mot de passe doit comporter au moins 6 caractères.",
  }),

  name: z
    .string()
    .min(4, {
      message: "Le nom doit comporter au moins 4 caractères.",
    })
    .trim(),
  bio: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  role: z.enum(["subscriber", "author", "editor", "admin", "owner"]),
  imageUrl: z.string(),
  blocked: z.boolean(),
  verified: z.boolean(),
});

type RoleOption = {
  label: string;
  value: "subscriber" | "author" | "editor" | "admin" | "owner";
};

const roles: RoleOption[] = [
  { label: "Abonné", value: "subscriber" },
  { label: "Auteur", value: "author" },
  { label: "Éditeur", value: "editor" },
  { label: "Administrateur", value: "admin" },
  //   { label: "Owner", value: "owner" },
];

export default function WSNewUserPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      imageUrl: "",
      role: "subscriber",
      blocked: false,
      verified: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={cn(" bg-ws-background min-h-screen")}>
          <div className=" h-16 px-3 flex items-center gap-x-5">
            <div>
              <h1 className="text-sm font-bold">Nouveau compte</h1>
            </div>
            <div className="flex-1" />

            <TooltipWrap content="Enregister les modifications">
              <LoadingButton
                type="submit"
                variant="default"
                loading={true}
                disabled
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
                disabled
                onClick={() => {
                  router.back();
                }}
              >
                <GrClose className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </TooltipWrap>
          </div>

          <div className="grid grid-cols-1 lg:gap-x-3 lg:grid-cols-6 max-w-screen-lg mx-auto min-w-60 bg-background border lg:rounded-lg">
            <div className=" col-span-2 lg:border-r">
              <ScrollArea className=" lg:h-[calc(100vh-66px)] ">
                <Card className=" border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Compte</CardTitle>
                    <CardDescription>
                      Profil personnel pour chaque utilisateur (Abonné, Auteur,
                      Éditeur, Contributeur, Administrateur, etc.)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className=" space-y-4 flex flex-col  ">
                      <div>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className=" ">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder=""
                                  className={cn("w-full font-black")}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className=" ">
                              <FormLabel>Mot de passe</FormLabel>
                              <FormControl>
                                <div className="relative flex">
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder=""
                                  className={cn("w-full font-black pr-12")}
                                />
                                <Button variant="ghost" size="icon" className=" absolute right-0 rounded-l"><EyeIcon/></Button>
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className=" ">
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder=""
                                  className={cn("w-full font-black")}
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
                          name="bio"
                          render={({ field }) => (
                            <FormItem className=" ">
                              <FormLabel>Biographie <FormDescription className=" inline">(Optionel)</FormDescription></FormLabel>
                              <FormControl>
                                <AutosizeTextarea
                                  {...field}
                                  className="text-muted-foreground"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rôle</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un rôle" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem
                                      key={role.value}
                                      value={role.value}
                                    >
                                      {role.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                Le compte est-il vérifié et conforme?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled
                                aria-readonly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="blocked"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ">
                            <div className="space-y-0.5">
                              <FormLabel>Blocage</FormLabel>
                              <FormDescription>
                                Bloquez le compte s&apos;il a publié de fausses
                                informations ou violé la ligne éditoriale
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled
                                aria-readonly
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
              <ScrollArea className=" lg:h-[calc(100vh-66px)] pl-6 py-6 "></ScrollArea>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
