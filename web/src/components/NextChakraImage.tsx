import { Flex, ResponsiveValue, Skeleton } from '@chakra-ui/react'
import Image from 'next/image'

const NextChakraImage = ({
	// Box
	w,
	h,
	maxW,
	maxH,
	minW,
	minH,
	boxSize,
	borderRadius,
	m,
	mr,
	mt,
	mb,
	ml,
	mx,
	my,
	bgColor,
	bgGradient,
	// Image
	src,
	objectFit = "cover",
	alt,
	title,
	sizes,
}: {
	// Box
	w?: ResponsiveValue<string | number>;
	h?: ResponsiveValue<string | number>;
	maxW?: ResponsiveValue<string | number>;
	maxH?: ResponsiveValue<string | number>;
	minW?: ResponsiveValue<string | number>;
	minH?: ResponsiveValue<string | number>;
	boxSize?: ResponsiveValue<string | number>;
	borderRadius?: ResponsiveValue<string | number>;
	m?: ResponsiveValue<string | number>;
	mr?: ResponsiveValue<string | number>;
	mt?: ResponsiveValue<string | number>;
	mb?: ResponsiveValue<string | number>;
	ml?: ResponsiveValue<string | number>;
	mx?: ResponsiveValue<string | number>;
	my?: ResponsiveValue<string | number>;
	bgColor?: string;
	bgGradient?: string;
	// Image
	src: string | null | undefined;
	objectFit?: "-moz-initial" | "contain" | "cover" | "fill" | "inherit" | "initial" | "none" | "revert" | "scale-down" | "unset";
	alt?: string;
	title?: string;
	sizes?: string;
}) => {
	function getPixelResponsiveValue(value: ResponsiveValue<string | number> | undefined) {
		let final = 0;
		if (typeof value === "number") final = value * 4;
		if (typeof value === "string") final = parseInt(value);
		return final.toString();
	};
	function getSizes() {
		if (sizes) return sizes;
		if (boxSize) return getPixelResponsiveValue(boxSize);
		if (w || h || maxW || maxH) return Math.max(
			Number(getPixelResponsiveValue(w)),
			Number(getPixelResponsiveValue(h)),
			Number(getPixelResponsiveValue(maxW)),
			Number(getPixelResponsiveValue(maxH)),
		).toString();
		return undefined;
	};

	return (
		<Flex
			borderRadius={borderRadius}
			bgGradient={bgGradient}
			position="relative"
			overflow="hidden"
			bgColor={bgColor}
			boxSize={boxSize}
			flexShrink={0}
			maxW={maxW}
			maxH={maxH}
			minW={minW}
			minH={minH}
			mr={mr}
			mt={mt}
			mb={mb}
			ml={ml}
			mx={mx}
			my={my}
			w={w}
			h={h}
			m={m}
		>
			{src ? (
				<Image
					title={title ?? alt ?? undefined}
					alt={alt ?? alt ?? undefined}
					objectFit={objectFit}
					sizes={getSizes()}
					layout="fill"
					src={src}
				/>
			) : (
				<Skeleton w="100%" h="100%" alignSelf="center" justifySelf="center" />
			)}
		</Flex>
	)
};

export default NextChakraImage