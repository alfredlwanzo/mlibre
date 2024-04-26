import { IoIosHeart } from "react-icons/io";

const date = new Date();

export function SiteFooter() {
  return (
    <footer className=" border-t">
      <div className="copyright px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Made with <IoIosHeart className=" inline text-[#ff0000]" /> from DRC
        </p>
        <p className="text-xs text-muted-foreground">© {date.getFullYear()} Mlibre</p>
      </div>
    </footer>
  );
}
