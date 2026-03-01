  "use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon">☰</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-black text-xl">CounsellingApp</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-6 px-8 py-4">
            <Link href="/" onClick={() => setOpen(false)} className="text-black font-semibold hover:text-cyan-900 text-lg">Home</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-black font-semibold hover:text-cyan-900 text-lg">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-black font-semibold hover:text-cyan-900 text-lg">Contact</Link>
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button className="w-full">Login</Button>
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}