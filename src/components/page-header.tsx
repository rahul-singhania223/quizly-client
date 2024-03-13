import React from "react";

import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <Separator className="mt-4" />
    </div>
  );
};

export default PageHeader;
