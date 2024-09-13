import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Spinner(props: {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) {
  return (
    <LoaderCircle
      size={24}
      className={cn("shrink-0 animate-spin", props.className)}
    />
  );
}
