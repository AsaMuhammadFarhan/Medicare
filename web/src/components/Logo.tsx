import { chakra } from "@chakra-ui/react";
import themeColor from "../utils/color";

const Logo = ({
  color = themeColor.primaryColor,
  size = "48px",
  onClick,
}: {
  color?: string;
  size?: string;
  onClick?: () => void;
}) => {
  return (
    <chakra.svg
      viewBox="0 0 128 128"
      userSelect="none"
      onClick={onClick}
      height={size}
      color={color}
      width="auto"
    >
      <path
        d="M-18674.043-7728.692h284.914c-59.447 114.231-157.586 207.28-309.061 287.909-3.686 1.94-8.049-.501-11.734-2.442-152.541-81.308-251.068-171.235-310.516-285.466h100.176c14.158 0 27.154-2.975 33.555-15.588l24.922 143.615c2.617 14.845 13.867 28.243 28.512 31.639 20.268 4.754 40.535-7.03 45.287-27.308l55.373-239.58 22.012 83.301c4.169 16.784 19.203 23.92 36.56 23.92zm362.881-222.317c0 38.131-10.084 88.875-33.262 145.732 0 .194-.098 1.613-.195 1.807l-4.75 11.316h-295.193l-52.852-214.002c-4.072-16.397-18.619-28.556-35.59-29.041-17.939-.486-33.65 11.434-37.725 28.898l-48.971 212.528-14.838-84.392c-2.23-12.614-10.668-23.325-22.4-28.273-19.201-8.15-41.312 1.982-49.459 21.193l-38.887 93.089h-114.139c-26.379-63.461-38.082-117.365-38.082-157.825 0-116.916 82.541-222.444 209.398-222.444v.097c88.799 0 160.076 67.142 183.35 97.608 23.371-30.466 85.906-97.608 183.076-97.608 124.615.001 210.519 104.4 210.519 221.317zm-352.213 184.24-57.604-228.053c-1.357-5.531-6.109-13.102-11.832-13.102h-1.26c-5.527 0-10.086 3.026-11.346 8.46l-76.805 332.16-36.27-206.406c-1.26-6.792-7.758-11.205-14.643-9.943-4.074.776-7.564 7.494-9.213 11.375l-43.145 105.509h-160.107c-6.982 0-12.703 12.379-12.801 19.269-.096 6.986 5.432 6.116 12.414 6.116h168.834c5.041 0 9.6-.76 11.539-5.417l29.764-80.749 39.564 225.261c1.262 6.888 7.855 11.275 14.645 10.014 4.945-.874 8.824-4.914 9.988-9.765l78.938-343.21 47.227 196.093c1.455 5.627 6.498 7.772 12.219 7.772h300.818l9.211-25.385h-300.135z"
        transform="matrix(.16202 0 0 .16202 3094.419 1328.807)"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      />
    </chakra.svg>
  )
}

export default Logo;