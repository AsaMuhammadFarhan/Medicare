import React from "react";
import {
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface NextChakraLinkProps {
  isExternal?: boolean;
  href?: string;
  needHover?: boolean;
};

export const NextChakraLink: React.FC<NextChakraLinkProps> = ({ children, isExternal = false, href = "/", needHover = true }) => {
  return (
    <NextLink href={href} passHref>
      <Link _hover={needHover ? undefined : { textDecor: "none" }} isExternal={isExternal}>
        {children}
      </Link>
    </NextLink>
  );
};