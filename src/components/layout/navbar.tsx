"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link href="/dashboard" className="font-semibold text-sm">
            Next.js Lab
          </Link>
          <ul className="flex items-center gap-4">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 text-sm transition-colors hover:text-foreground",
                    pathname === href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.firstName} {user.lastName}
            </span>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut size={15} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
