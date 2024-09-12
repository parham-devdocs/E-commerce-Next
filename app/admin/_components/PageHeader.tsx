import { ReactNode } from "react";

export default function PageHeader({ children }: { children: ReactNode }) {
  return <h1 className=" text-4xl mb-8">{children}</h1>;
}
