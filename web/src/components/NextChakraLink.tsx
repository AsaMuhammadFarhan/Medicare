import { As, Link, ResponsiveValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

interface NextChakraLinkProps {
  isExternal?: boolean;
  href: string;
  w?: ResponsiveValue<string | number>;
  width?: ResponsiveValue<string | number>;
  maxW?: ResponsiveValue<string | number>;
  h?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  maxH?: ResponsiveValue<string | number>;
  borderRadius?: string | string[];
  as?: As<any>;
  title?: string;
  color?: string;
  fontWeight?: ResponsiveValue<string | number>;
}

export const NextChakraLink: React.FC<NextChakraLinkProps> = ({
  children,
  isExternal = false,
  href = '/',
  w,
  width,
  maxW,
  h,
  height,
  maxH,
  borderRadius = '0px',
  as,
  title,
  color,
  fontWeight,
}) => {
  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{ textDecor: 'none' }}
        borderRadius={borderRadius}
        fontWeight={fontWeight}
        isExternal={isExternal}
        title={title ?? href}
        h={height ?? h}
        w={width ?? w}
        color={color}
        maxW={maxW}
        maxH={maxH}
        as={as}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export const NextChakraLinkNoFocus: React.FC<NextChakraLinkProps> = ({
  children,
  isExternal = false,
  href = '/',
  w,
  width,
  maxW,
  h,
  height,
  maxH,
  borderRadius = '0px',
  as,
  title,
  color,
  fontWeight,
}) => {
  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{ textDecor: 'none' }}
        borderRadius={borderRadius}
        fontWeight={fontWeight}
        isExternal={isExternal}
        title={title ?? href}
        h={height ?? h}
        w={width ?? w}
        color={color}
        _focus={{}}
        maxW={maxW}
        maxH={maxH}
        as={as}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export const NextChakraLinkWithHover: React.FC<NextChakraLinkProps> = ({
  children,
  isExternal = false,
  href = '/',
  w,
  width,
  maxW,
  h,
  height,
  maxH,
  borderRadius = '0px',
  as,
  title,
  color,
  fontWeight,
}) => {
  return (
    <NextLink href={href} passHref>
      <Link
        borderRadius={borderRadius}
        isExternal={isExternal}
        fontWeight={fontWeight}
        title={title ?? href}
        h={height ?? h}
        w={width ?? w}
        color={color}
        _focus={{}}
        maxW={maxW}
        maxH={maxH}
        as={as}
      >
        {children}
      </Link>
    </NextLink>
  );
};
