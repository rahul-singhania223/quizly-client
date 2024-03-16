"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types";

interface AvatarProps {
  imageUrl?: string | undefined;
  className?: string;
  author?: Partial<User>;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, className, author }) => {
  const router = useRouter();

  const { user } = useUser();

  return (
    <button
      onClick={() => {
        router.push(user?.id === author?.id ? "/me" : `/author/${author?.id}`);
      }}
      className={cn(
        "relative w-10 h-10 !p-0 rounded-full overflow-hidden",
        true && className
      )}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          className="object-cover rounded-full"
          alt=""
          fill
        />
      )}

      {!imageUrl && (
        <div className="w-full h-full bg-green-600 text-xl rounded-full flex items-center justify-center">
          {author?.name?.slice(0, 1)}
        </div>
      )}

      {!imageUrl && <div>{}</div>}
    </button>
  );
};

export default Avatar;
