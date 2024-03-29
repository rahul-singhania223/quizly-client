import { cn } from "@/lib/utils";
import React from "react";

interface IconProps {
  className?: string;
}

export const GoogleLogo: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={cn("", true && className)}
      width="90"
      height="92"
      viewBox="0 0 90 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M90 47.1C90 44 89.7 40.8 89.2 37.8H45.9V55.5H70.7C69.7 61.2 66.4 66.2 61.5 69.4L76.3 80.9C85 72.8 90 61 90 47.1Z"
        fill="#4280EF"
      />
      <path
        d="M45.9 91.9C58.3 91.9 68.7 87.8 76.3 80.8L61.5 69.4C57.4 72.2 52.1 73.8 45.9 73.8C33.9 73.8 23.8 65.7 20.1 54.9L4.90002 66.6C12.7 82.1 28.5 91.9 45.9 91.9Z"
        fill="#34A353"
      />
      <path
        d="M20.1 54.8C18.2 49.1 18.2 42.9 20.1 37.2L4.90002 25.4C-1.59998 38.4 -1.59998 53.7 4.90002 66.6L20.1 54.8Z"
        fill="#F6B704"
      />
      <path
        d="M45.9 18.3C52.4 18.2 58.8 20.7 63.5 25.2L76.6 12C68.3 4.20001 57.3 1.18884e-05 45.9 0.100012C28.5 0.100012 12.7 9.90001 4.90002 25.4L20.1 37.2C23.8 26.3 33.9 18.3 45.9 18.3Z"
        fill="#E54335"
      />
    </svg>
  );
};
