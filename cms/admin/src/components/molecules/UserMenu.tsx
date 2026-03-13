"use client";

import { useEffect, useRef } from "react";
import type { UserRole } from "@/src/utils/auth";

type UserMenuProps = {
  open: boolean;
  email?: string;
  role?: UserRole;
  onClose: () => void;
  onNavigateProducts: () => void;
  onSwitchUser: () => void;
  onLogout: () => void;
};

const UserMenu = ({
  open,
  email,
  role,
  onClose,
  onNavigateProducts,
  onSwitchUser,
  onLogout,
}: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-4 top-16 z-20 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
    >
      <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
        {email ?? "No email available"}
      </div>
      <div className="px-3 py-2 text-xs text-slate-500">Role: {role ?? "unknown"}</div>

      <button
        type="button"
        onClick={() => {
          onClose();
          onNavigateProducts();
        }}
        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
      >
        Products
      </button>

      <button
        type="button"
        onClick={() => {
          onClose();
          onSwitchUser();
        }}
        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
      >
        Switch User
      </button>

      <button
        type="button"
        onClick={() => {
          onClose();
          onLogout();
        }}
        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-700 hover:bg-rose-50"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
