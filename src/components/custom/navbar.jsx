"use client";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar({hamburgercolor}) {
  const [isOpen, setOpen] = useState(false);
  const toggleNavbar = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <div className="fixed top-5 right-7 z-50 bg-black rounded-full p-1 border border-white border-solid border-2">
        <Hamburger toggled={isOpen} toggle={setOpen} color={hamburgercolor || "#6d21bb"} />
      </div>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={
          isOpen
            ? { width: "38vw", opacity: 1, x: -40, y: 15 }
            : { width: 0, opacity: 0, x: 0, y: 15 }
        }
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="fixed top-2 right-14 h-12 bg-white  rounded-full border border-black flex items-center px-6 gap-8 z-40"
      >
        {isOpen && (
          <>  
            <Link href ="/" >
            <span className="cursor-pointer font-medium" >Home</span>
            </Link>

            <Link href ="/ServiceSelector">
            <span className="cursor-pointer font-medium">Services</span>
            </Link>
            
            <Link href ="/Contri">
            <span className="cursor-pointer font-medium">Contribute</span>
            </Link>
          
            <Link href ="/ProjectDB">
            <span className="cursor-pointer font-medium">Database</span>
            </Link>
            
            <Link href ="/DataSource">
            <span className="cursor-pointer font-medium">Sauce</span>
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
