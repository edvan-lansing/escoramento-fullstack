"use client";

import type { PropsWithChildren } from "react";
import Header from "@/src/components/organisms/Header";

type AdminLayoutProps = PropsWithChildren<{
  onSwitchUserRequest?: () => void;
}>;

const AdminLayout = ({ children, onSwitchUserRequest }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-100/80">
      <Header onSwitchUserRequest={onSwitchUserRequest} />

      <main className="mx-auto w-full max-w-350 px-3 py-6 sm:px-4 lg:px-5 sm:py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
