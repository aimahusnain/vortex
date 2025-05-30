"use client";
// React
import { FC } from "react";
// Animation
import { motion } from "framer-motion";
// Styles
import s from "./styles/Hero.module.scss";
import { FaPlay } from "react-icons/fa";
// Components
import { ButtonLink } from "@/components/ui/Button/buttonLink";
import { Button } from "@nextui-org/react";
// Next
import Link from "next/link";
import Image from "next/image";
// Font
import { Lexend } from "next/font/google";
const font = Lexend({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const Hero: FC = ({}) => {
  const DATA_COMPANIES = [
    { pathImg: "/images/HomePage/hero/1.svg" },
    { pathImg: "/images/HomePage/hero/2.svg" },
    { pathImg: "/images/HomePage/hero/3.svg" },
    { pathImg: "/images/HomePage/hero/4.svg" },
    { pathImg: "/images/HomePage/hero/5.svg" },
    { pathImg: "/images/HomePage/hero/6.svg" },
  ];
  // Animation
  const animation = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`${s.hero} `}
    >
      <div className="container">
        <section className={`${s.wrapper}  text-center`}>
          <article className={`${s.content} py-32 sm:py-44`}>
            <motion.h1
              custom={1}
              variants={animation}
              style={font.style}
              className="relative text-black mx-auto max-w-4xl tracking-tight font-medium text-balance"
            >
              Transform Your Landscaping{" "}
              <span className="relative whitespace-nowrap lg:whitespace-normal">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="z-10 absolute left-0 top-2/3 h-[0.58em] w-full fill-bluecustom/30"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span className="relative z-20 text-bluecustom">Business With ONSITE</span>
              </span>{" "}
            </motion.h1>
            <motion.p
              custom={2}
              variants={animation}
              className="mt-6 mx-auto max-w-xl text-md sm:text-lg tracking-tight text-slate-700"
            >
             Save time, increase profits, and automate your business
            </motion.p>
            <motion.div
              custom={3}
              variants={animation}
              className={`${s.actions} mt-6`}
            >
              <ButtonLink
                size="md"
                value="Get 14 days free"
                styles=" shadow-md bg-black text-white font-medium rounded-full mr-5"
                href="/signUp"
              />

              <Button
                target="blank"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="shadow-sm bg-white border-1 border-slate-200 rounded-full text-black font-medium"
                as={Link}
              >
                <FaPlay size={12} color={"#2563EB"} />
                Watch video
              </Button>
            </motion.div>
          </article>
          <div className={`${s.companies}`}>
            <h5 style={font.style} className="text-black font-normal">
              Trusted by these six companies so far
            </h5>
            <div className="my-10">
              {DATA_COMPANIES.map((item, i) => (
                <Image
                  key={i}
                  src={item.pathImg}
                  alt="Image"
                  width={140}
                  height={150}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.section>
  );
};