import { FC } from "react";

export const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col pt-20">
      <div className="w-full min-h-20 bg-orange-300 fixed left-0 top-0"></div>

      <div className="flex-1 flex pl-[300px]">

        <div className="w-[300px] bg-red-300 h-full fixed left-0 top-20 overflow-auto">
          <div className="w-full h-[300px] bg-slate-500">Hello owrld</div>
        </div>

        <div className="flex-1 bg-sky-500">{children}</div>
      </div>
    </div>
  );
};
