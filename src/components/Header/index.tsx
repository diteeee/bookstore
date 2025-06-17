import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/assets/icons/logo.svg";
import cs from "classnames";
import { signOut, useSession } from "next-auth/react";
import Button from "@/components/shared/Button";
import { useState } from "react";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact Us", pathName: "/contact" },
    { name: "Books", pathName: "/blogs" },
    { name: "Special Editions", pathName: "/blogs/special" },
    { name: "News", pathName: "/news" },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    signOut({ callbackUrl: "/sign-in" });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="py-2 fixed z-50 bg-white border-b w-full transition-all duration-300 shadow-sm">
      <div className="container m-auto flex items-center justify-between">
        <Link href="/">
          <picture>
            <img className="h-10" src={Logo.src} alt="Logo" style={{ marginLeft: '10px' }} />
          </picture>
        </Link>

        <nav className="hidden md:flex flex-1 justify-center gap-10 items-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={cs("text-black", {
                "underline font-semibold": router.pathname === item.pathName,
              })}
            >
              {item.name}
            </Link>
          ))}
          {status === "authenticated" && (
            <Link
              href="/dashboard"
              className={cs("text-black", {
                "underline font-semibold": router.pathname === "/dashboard",
              })}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden md:flex gap-5 items-center mr-6">
          {status === "authenticated" ? (
            <>
              <Link href="/profile" passHref>
                <Button text="Profile" onClick={() => {}}/>
              </Link>
              <Button onClick={handleSignOut} text="Sign Out" />
            </>
          ) : (
            <>
              <Button onClick={() => router.push("/sign-up")} text="Sign Up" />
              <Button
                onClick={() => router.push("/sign-in")}
                text="Sign In"
                variant="secondary"
              />
            </>
          )}
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center focus:outline-none"
          style={{ marginRight: '10px' }}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={cs(
          "fixed top-0 right-0 h-full w-64 bg-white shadow-xl rounded-l-2xl p-6 transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
          {
            "translate-x-0": mobileMenuOpen,
            "translate-x-full": !mobileMenuOpen,
          }
        )}
      >
        <button
          onClick={toggleMobileMenu}
          aria-label="Close Menu"
          className="self-end mb-6 text-gray-700 hover:text-black focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-5">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={cs(
                "text-black text-lg font-medium",
                {
                  "underline font-semibold": router.pathname === item.pathName,
                }
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {status === "authenticated" && (
            <Link
              href="/dashboard"
              className={cs(
                "text-black text-lg font-medium",
                {
                  "underline font-semibold": router.pathname === "/dashboard",
                }
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex-grow" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/profile"
                  className="text-emerald-700 font-medium text-lg hover:underline block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-700 font-medium text-lg hover:underline block text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="text-emerald-700 font-medium text-lg hover:underline block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
                <Link
                  href="/sign-in"
                  className="text-emerald-700 font-medium text-lg hover:underline block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Header;
