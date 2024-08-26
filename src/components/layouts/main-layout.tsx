import { FC } from "react";
import { SiteHeader } from "./site-header";
import { Button } from "../ui/button";

export const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-screen pt-20">
      <div className="w-full fixed left-0 top-0 z-30 bg-background shadow">
        <SiteHeader />
      </div>

      <div className="w-full h-full pl-[300px]">
        <div className="flex fixed left-0 top-0 w-[250px] pt-20">
          <Button>hello world</Button>
        </div>
        <div className="z-10 flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};
