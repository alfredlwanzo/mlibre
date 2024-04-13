"use client";
import { SearchBar } from "@/components/searchBar";
import { TooltipWrap } from "@/components/tooltip-wrap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";

export default function CategoriesPage() {
  const router = useRouter();
  return (
    <div className=" bg-ws-background">
      <div className="h-16 flex items-center px-3 space-x-4">
        <h1 className=" font-bold">Auteurs et Lecteurs</h1>
        <div className="flex-1">
          <SearchBar
            onValueChange={({ value }) => {
              router.push(`/ws/users/?q=${value}`);
            }}
          />
        </div>
        <TooltipWrap content="Créer un compte">
          <Link href="/ws/users/new">
            <Button variant="outline" className=" bg-transparent">
              <HiPlus className="h-[1.2rem] w-[1.2rem] mr-2" />
              <span>Créer</span>
            </Button>
          </Link>
        </TooltipWrap>
      </div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
