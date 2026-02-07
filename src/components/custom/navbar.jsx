"use client";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar({ hamburgercolor }) {
  const [isOpen, setOpen] = useState(false);
  const toggleNavbar = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {/* Visual circle */}
        <div className="bg-black rounded-full border-2 border-white w-12 h-12 flex items-center justify-center pointer-events-none">
          {/* fake shii */}
        </div>

        {/* hamburger */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color={hamburgercolor || '#6d21bb'}
            size={23}
            className="translate-x-[1px]"  
          />
        </div>
      </div>


      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={
          isOpen
            ? { width: "38vw", opacity: 1, x: -40, y: 15 }
            : { width: 0, opacity: 0, x: 0, y: 15 }
        }
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="fixed top-2 right-14 h-10 bg-black text-white rounded-full border border-purple-400 flex items-center px-6 gap-8 z-600"
      >
        {isOpen && (
          <>
            <Link href="/" >
              <span className="font-tektur cursor-pointer font-medium" >Home</span>
            </Link>

            <Link href="/ServiceSelector">
              <span className="font-tektur  cursor-pointer font-medium">Services</span>
            </Link>

            <Link href="/">
              <span className="font-tektur cursor-pointer font-medium">Contribute</span>
            </Link>

            <Link href="/ProjectDB">
              <span className="font-tektur cursor-pointer font-medium">Database</span>
            </Link>

            <Link href="/DataSource">
              <span className="font-tektur cursor-pointer font-medium">Sauce</span>
            </Link>


            {/* <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button> */}
          </>
        )}
      </motion.div>
    </>
  );
}
