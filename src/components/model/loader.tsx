import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="text-sm flex items-center gap-2">
      <Loader2 className="animate-spin" size={15} />
      <span>Processing...</span>
    </div>
  );
};

export default Loader;
