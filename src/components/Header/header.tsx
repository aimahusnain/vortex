"use client";

// React
import { FC, useEffect, useState } from "react";
// Animation
import { motion } from "framer-motion";
// Styles
import s from "./styles/Header.module.scss";
// Next
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
// NextUI
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
// ScrollLink
import { Link as ScrollLink } from "react-scroll";
// Font
import { Lexend } from "next/font/google";
// import { BannerAdvertising } from "../ui/banners/bannerAdvertising";
const font = Lexend({
  subsets: ["latin"],
  weight: ["500"],
});

export const Header: FC = ({}) => {
  const pathName = usePathname().replace("/", "");
  const hideNavigation = pathName === "login" || pathName.startsWith("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScroll, setScroll] = useState(false);

  // Data
  const DATA_LINKS = [
    { value: "Features", href: "features" },
    { value: "Testimonials", href: "testimonials" },
    { value: "Pricing", href: "price" },
    { value: "FAQ", href: "faq" },
  ];
  const DATA_TOGGLE_MENU = [
    { value: "Features", href: "features" },
    { value: "Testimonials", href: "testimonials" },
    { value: "Pricing", href: "price" },
    { value: "FAQ", href: "faq" },
  ];

  // SetScroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY != 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, [isScroll]);

  // Animation
  const animation = {
    hidden: {
      opacity: 0,
    },
    visible: () => ({
      opacity: 1,
      transition: { delay: 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };
  return (
    <>
      {!hideNavigation && (
        <>
          {/* <BannerAdvertising /> */}
          <Navbar
            className={` ${s.navBar}  ${
              isScroll ? "shadow-sm shadow-black/10" : ""
            }  `}
            isBlurred={!isMenuOpen}
            position="sticky"
            disableAnimation
            onMenuOpenChange={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            maxWidth="full"
            height={"4.5em"}
          >
            <div className="container">
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={animation}
                className={s.wrapper}
              >
                <nav className={s.nav}>
                  <ScrollLink
                    className={`${s.logo} hover:opacity-80 transition-opacity cursor-pointer`}
                    onClick={() => setIsMenuOpen(false)}
                    spy={true}
                    smooth={true}
                    duration={800}
                    to={"top"}
                  >
                    <Image
                      src={"./Logo.svg"}
                      width={40}
                      height={40}
                      alt="Logo"
                    />
                    <h5 style={font.style} className="text-black  text-lg">
                      Vor<span className="text-bluecustom">tex</span>
                    </h5>
                  </ScrollLink>
                  <ul className="hidden md:grid">
                    {DATA_LINKS.map((link, i) => (
                      <ScrollLink
                        className={`transition-all text-sm  hover:text-bluecustom hover:bg-slate-100 px-3 py-2 rounded-lg cursor-pointer`}
                        activeStyle={{
                          backgroundColor: "#f1f5f9",
                          color: "#2563EB",
                        }}
                        key={i}
                        to={link.href}
                        spy={true}
                        smooth={true}
                        duration={800}
                      >
                        {link.value}
                      </ScrollLink>
                    ))}
                  </ul>
                </nav>
                <div className={s.actions}>
                  <Link
                    className="hidden md:inline-block transition-all text-sm text-slate-700 hover:text-bluecustom hover:bg-slate-100 px-3 py-2 rounded-lg"
                    href={"/login"}
                  >
                    Sign In
                  </Link>
                  <Button
                    as={Link}
                    className="bg-bluecustom text-white py-2 px-3 rounded-full text-sm font-medium hover:bg-white hover:text-bluecustom transition-all border-2 border-bluecustom shadow-md"
                    href={"/signUp"}
                  >
                    Get started{" "}
                    <span className="hidden lg:inline-block">today</span>
                  </Button>
                  {/* BurgerMenu */}
                  <NavbarMenuToggle className="sm:hidden" />
                </div>
              </motion.section>
            </div>
            {/* ToggleMenu */}
            <NavbarMenu className={`navbarMenu pt-5 bg-slate-50`}>
              {DATA_TOGGLE_MENU.map((item, i) => (
                <NavbarMenuItem key={i}>
                  <ScrollLink
                    activeStyle={{
                      color: "#2563EB",
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    spy={true}
                    smooth={true}
                    duration={800}
                    className={`w-full`}
                    to={item.href}
                  >
                    {item.value}
                  </ScrollLink>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </Navbar>
        </>
      )}
    </>
  );
};