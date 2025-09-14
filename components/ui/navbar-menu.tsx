"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { LinkProps } from "next/link";

const springTransition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      {href ? (
        <Link
          href={href}
          className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1"
          aria-label={item}
          onFocus={() => setActive(item)}
        >
          <motion.span transition={{ duration: 0.3 }}>{item}</motion.span>
        </Link>
      ) : (
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
          tabIndex={0}
          aria-label={item}
        >
          {item}
        </motion.p>
      )}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springTransition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={springTransition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-4 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

type HoveredLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  className?: string;
};

export const HoveredLink = ({ children, className, ...rest }: HoveredLinkProps) => {
  return (
    <Link
      {...rest}
      className={"text-neutral-700 dark:text-neutral-200 hover:text-black " + (className ?? "")}
    >
      {children}
    </Link>
  );
};
