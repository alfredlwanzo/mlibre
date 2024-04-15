"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { z } from "zod";

export const formData = z.object({
  query: z.string().trim(),
});

export function SearchTagBar() {
  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
  });
  const router = useRouter();

  const search = (data: z.infer<typeof formData>) => {
    router.push(`/ws/tags?q=${data.query}`);
  };

  return (
    <Form {...form}>
      <form className="relative" onSubmit={form.handleSubmit(search)}>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem >
              <FormControl>
                <div className="flex items-center">
                <Input
                  {...field}
                  type="search"
                  placeholder="Rechercher ..."
                  className="flex-1 pr-12 bg-transparent"
                />
                <Button
                type="submit"
                className={cn("absolute bg-transparent right-0 rounded-l-none")}
                variant="outline"
                size="icon"
              >
                <FiSearch className=" " />
              </Button>
              </div>
              </FormControl>
              
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
