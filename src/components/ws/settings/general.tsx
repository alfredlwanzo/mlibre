import { upsertGeneralSettings } from "@/actions/ws/settings/upsert-settings";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AppStatusType, AppType, LanguageType } from "@/lib/types";
import { appStatusDescription, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Le titre doit comporter au moins 2 caractères.",
    })
    .trim(),
  description: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  language: z.enum(["fr", "en"]),
  status: z.enum(["online", "offline", "maintenance"]),
});

type LanguageOption = {
  label: string;
  value: LanguageType;
};

type AppStatusOption = {
  label: string;
  value: AppStatusType;
};

const languages: LanguageOption[] = [
  { label: "Français", value: "fr" },
  { label: "English", value: "en" },
];

const statuses: AppStatusOption[] = [
  { label: "En ligne", value: "online" },
  { label: "En maintenance", value: "maintenance" },
  { label: "Hors ligne", value: "offline" },
];

type GeneralSettingsProps = {
  settings: AppType | null;
};
export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: settings?.title,
      description: settings?.description,
      status: settings?.status,
      language: settings?.language,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const updatedSettings = await upsertGeneralSettings(values).catch(() => {
      toast({
        title: "Echec",
        variant: "destructive",
        description: (
          <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
        ),
      });
      setLoading(false);
    });
    if (updatedSettings) {
      toast({
        title: "Mise à jour",
        description: "Les mises à  jour ont été bien enregistrer",
      });
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card className="shadow-none border-none ">
            <CardHeader className="">
              <CardTitle className="text-lg font-semibold text-foreground leading-3">
                Title & Description
              </CardTitle>
              <CardDescription>
                Les détails pour identifier votre site web sur internet
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className=" ">
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="title"
                        placeholder=""
                        disabled={loading}
                        className={cn("w-full font-black")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className=" ">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <AutosizeTextarea
                        {...field}
                        className="text-muted-foreground"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="shadow-none border-none ">
            <CardHeader className="">
              <CardTitle className="text-lg font-semibold text-foreground leading-3">
                Langue
              </CardTitle>
              <CardDescription>
                Définir la langue de vos publications
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Langue</FormLabel> */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une langue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-none ">
            <CardHeader className="">
              <CardTitle className="text-lg font-semibold text-foreground leading-3">
                Statut du site
              </CardTitle>
              <CardDescription>
                {appStatusDescription(form.watch("status"))}
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Status</FormLabel> */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <LoadingButton
            loading={loading}
            disabled={loading}
            type="submit"
            className="w-full"
          >
            Mettre à jour
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};
