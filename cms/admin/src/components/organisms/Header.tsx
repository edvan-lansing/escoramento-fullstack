"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HamburgerIcon } from "@/src/components/atoms/icons";
import UserMenu from "@/src/components/molecules/UserMenu";
import { clearAuthSession, getCurrentUser, type AuthUser } from "@/src/utils/auth";

type HeaderProps = {
  onSwitchUserRequest?: () => void;
};

const Header = ({ onSwitchUserRequest }: HeaderProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("auth:changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth:changed", handleAuthChange);
    };
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateToProducts = () => {
    router.push("/products");
  };

  const switchUser = () => {
    onSwitchUserRequest?.();
  };

  const logout = () => {
    clearAuthSession();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-700/40 bg-slate-900/95 text-white backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <h1 className="text-lg font-bold tracking-tight sm:text-xl">
          Escoramento CMS
        </h1>

        <button
          type="button"
          aria-label="menu"
          onClick={openMenu}
          className="rounded-lg border border-slate-600 p-2 hover:bg-slate-800"
        >
          <HamburgerIcon />
        </button>

        <UserMenu
          open={isMenuOpen}
          email={user?.email}
          role={user?.role}
          onClose={closeMenu}
          onNavigateProducts={navigateToProducts}
          onSwitchUser={switchUser}
          onLogout={logout}
        />
      </div>
    </header>
  );
};

export default Header;
