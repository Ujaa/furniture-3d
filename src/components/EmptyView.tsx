import { PropsWithChildren } from "react";

export default function EmptyView({ children }: PropsWithChildren) {
  return (
    <div className="text-slate-300 text-sm w-full flex justify-center py-12 px-1">
      {children}
    </div>
  );
}
