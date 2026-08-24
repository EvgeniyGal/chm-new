"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "border-navy/10 bg-white text-navy",
          title: "text-navy",
          description: "text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
