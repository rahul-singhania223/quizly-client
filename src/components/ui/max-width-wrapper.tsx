import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "max-w-screen-lg w-screen mx-auto px-3 lg:px-4 pt-20 pb-10 lg:pt-20",
        true && className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
