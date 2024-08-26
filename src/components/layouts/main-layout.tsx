import { FC } from "react";
import { Button } from "../ui/button";

export const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-screen pt-20">
      <div className="w-full fixed left-0 top-0 z-30 shadow h-20 bg-orange-300"></div>

      <div className="w-full min-h-full pl-80 relative">
        <div className="flex fixed left-0 top-0 pt-24 pl-6">
          <div className="flex flex-col gap-3">
            <Button>hello world</Button>
            <Button>hello world</Button>
            <Button>hello world</Button>
            <Button>hello world</Button>
          </div>
        </div>
        <div className="z-10 flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};
