"use client";

import { useShare } from "@/hooks/use-share-model";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { WhatsApp } from "@/icons/whatsapp";

const ShareModel = () => {
  const { open, onClose, quiz } = useShare();

  const { toast } = useToast();

  if (!open) return null;

  const quizPlayLink = location.origin + "/play/" + quiz?.id;

  const handleWhatsappShare = () => {
    const encodedText = encodeURIComponent(`Let's solve some questions - `);

    const whatsAppUrl = `whatsapp://send?text=${encodedText} ${quizPlayLink}`;

    window.open(whatsAppUrl, "_blank");
  };

  const onCopy = () => {
    window.navigator.clipboard.writeText(quizPlayLink);

    toast({
      title: "Link copied to the clipboard",
    });
  };

  const options = [
    {
      title: "whatsApp",
      icon: <WhatsApp className="w-8 h-8" />,
      onShare: handleWhatsappShare,
    },
  ];

  return (
    <div className="fixed z-30 inset-0 bg-black/30 flex items-center justify-center">
      <div className="p-5 py-7 border rounded-lg w-full max-w-md bg-background relative mx-3">
        <h2 className="text-lg font-semibold">Share With</h2>
        <div className="mt-3 flex gap-3">
          {options.map((option, index) => (
            <>
              <div
                onClick={option.onShare}
                className="p-2 shadow-md ring-1 w-fit rounded-lg"
                key={index}
              >
                <span>{option.icon}</span>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col gap-4 items-center mt-5">
          <Input value={quizPlayLink} />
          <Button onClick={onCopy}>Copy link</Button>
        </div>

        <Button
          onClick={onClose}
          variant={"ghost"}
          className="absolute top-2 right-2 p-2 h-fit"
        >
          <X size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ShareModel;
