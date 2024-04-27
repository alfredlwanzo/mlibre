import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
import { Logo } from "../header/logo";
import { siteConfig } from "@/config/site";
import { docsConfig } from "@/config/docs";
import { MobileLink } from "../header/mobile-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const date = new Date();

export function SiteFooter() {
  return (
    <footer className=" bg-ws-background p-6 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href="/"
                  className="mr-6 flex items-center space-x-[0.8px]"
                >
                  <Logo className=" w-4 h-4" />
                  <span className="font-bold text-[18px] inline-block">
                    {siteConfig.name}
                  </span>
                </Link>
              </CardTitle>
              <CardDescription>{siteConfig.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm">
                  Ne manquez rien et inscrivez-vous à notre{" "}
                  <span>newsletter</span>!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader>
              <CardTitle className=" text-[18px]">Liens rapides</CardTitle>
            </CardHeader>
            <CardDescription>
              <div className="flex flex-col space-y-3">
                {docsConfig.mainNav?.map(
                  (item) =>
                    item.href && (
                      <MobileLink
                        key={item.href}
                        href={item.href}
                        // onOpenChange={setOpen}
                      >
                        {item.title}
                      </MobileLink>
                    )
                )}
              </div>
            </CardDescription>
            <CardContent></CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader>
              <CardTitle className=" text-[18px]">Contacts</CardTitle>
              <CardDescription>
                <ul>
                  <li>+243826776661</li>
                  <li>+243977778829</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-none shadow-none rounded-none bg-transparent">
            <CardHeader>
              <CardTitle className=" text-[18px]">Adresses</CardTitle>
              <CardDescription>
                Nord-Kivu, Butembo, com. Kimemi, Q. Vutsundo, cel. Mutsunga,
                N⁰89
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
      <div className="px-4 py-12 text-center">
        <p className="text-xs text-muted-foreground">
          Made with <IoIosHeart className=" inline text-[#ff0000]" /> from DRC
        </p>
        <p className="text-xs text-muted-foreground">
          © {date.getFullYear()} Mlibre
        </p>
      </div>
    </footer>
  );
}
