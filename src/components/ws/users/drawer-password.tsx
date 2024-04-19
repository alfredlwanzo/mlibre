import { changeUserPassword } from "@/actions/ws/users/change-password";
import { deleteUser } from "@/actions/ws/users/delete-user";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { SetStateAction, useState, Dispatch } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
    confirmNewPassword: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

type DrawerChangePasswordProps = {
  user?: UserType | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const DrawerChangePassword: React.FC<DrawerChangePasswordProps> = ({
  user,
  loading,
  setLoading,
}) => {
  const [showPWD, setShowPWD] = useState<boolean>(false);
  const [showConfirmPWD, setShowConfirmPWD] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { toast } = useToast();

  const formPWD = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (typeof user?.id === "number") {
      setOpenDelete(false);
      setLoading(true);
      const updatedUser = await changeUserPassword({
        ...formData,
        userId: user.id,
      }).catch(() => {
        toast({
          title: "Echec",
          variant: "destructive",
          description: (
            <div>Une erreur s&apos;est produite. Veuillez réessayer!</div>
          ),
        });
        setLoading(false);
      });
      if (updatedUser) {
        toast({
          title: "Modifié",
          variant: "success",
          description: "Le mot de passe a été bien modifié",
        });
        setLoading(false);
        formPWD.reset();
      }
    }
  };

  return (
    <Drawer open={openDelete} onOpenChange={setOpenDelete}>
      {/* <DrawerTrigger asChild> */}
      <Button
        disabled={loading}
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();
          setOpenDelete(true);
        }}
        className=" w-fit"
        size="sm"
      >
        Changer le mot de passe
      </Button>
      {/* </DrawerTrigger> */}
      <DrawerContent>
        <Form {...formPWD}>
          <form onSubmit={formPWD.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>
                  Changer le mot de passe de {user?.name}
                </DrawerTitle>
                <DrawerDescription>
                  Vous avez le pouvoir de changer le mot de passe des
                  utilisateurs
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4">
                <div>
                  <FormField
                    control={formPWD.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative flex">
                            <Input
                              {...field}
                              type={showPWD ? "text" : "password"}
                              placeholder=""
                              className={cn("w-full font-black pr-12")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className=" absolute right-0 rounded-l-none"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowPWD((prev) => !prev);
                              }}
                            >
                              {showPWD ? (
                                <EyeOffIcon className="text-muted-foreground" />
                              ) : (
                                <EyeIcon className=" text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={formPWD.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <FormLabel>Confirmer le mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative flex">
                            <Input
                              {...field}
                              type={showConfirmPWD ? "text" : "password"}
                              placeholder=""
                              className={cn("w-full font-black pr-12")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className=" absolute right-0 rounded-l-none"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowConfirmPWD((prev) => !prev);
                              }}
                            >
                              {showConfirmPWD ? (
                                <EyeOffIcon className="text-muted-foreground" />
                              ) : (
                                <EyeIcon className=" text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button type="submit">Changer</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Annuler</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
