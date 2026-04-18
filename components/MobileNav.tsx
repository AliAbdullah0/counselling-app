import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";

export default function MobileNav() {
  // const [open,setOpen] = useState(false)  no need to manage state manually as Drawer component handles it internally it will keep the component server component
  return (
    <div className="sm:hidden py-4">
      <Drawer>
        <DrawerTrigger asChild>
          <MenuIcon className="w-6 h-6 text-black" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-black text-xl">
              CounsellingApp
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-6 px-8 py-8">
            <Link
              href="/"
              className="text-black font-semibold hover:text-cyan-900 text-lg"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-black font-semibold hover:text-cyan-900 text-lg"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-black font-semibold hover:text-cyan-900 text-lg"
            >
              Contact
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
