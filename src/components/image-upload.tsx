"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div className="my-3 relative flex gap-4">
      <div className="group w-1/6 aspect-video rounded-md relative overflow-hidden">
        {value && (
          <>
            <Image src={value} className="object-cover" alt="thumbnail" fill />

            <Button
              disabled={disabled}
              className="absolute hidden top-0 right-0 group-hover:block"
              variant={"destructive"}
              onClick={(url) => onRemove()}
            >
              <Trash size={"15"} />
            </Button>
          </>
        )}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset={"dwacgggx"}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div>
              <Button
                variant={"secondary"}
                onClick={onClick}
                type={"button"}
                className=""
                disabled={disabled || value ? true : false}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload an image
              </Button>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
