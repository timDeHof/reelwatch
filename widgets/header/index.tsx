import React from 'react';

import Link from 'next/link';
import { IconMovie, IconList, IconBell, IconSearch, IconUser } from '@tabler/icons-react';

import { Routes } from '@/shared/config/routes';
import Search from '@/src/pages/search';


interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = '' }: NavLinkProps) => (
  <Link
    href={href}
    className={`${className} no-underline`}
    onClick={(e) => {
      e.preventDefault();
      // Handle navigation here if needed
      window.location.href = href;
    }}
  >
    {children}
  </Link>
);

const Header = ({ user, isLoggedIn }: { user: any; isLoggedIn: boolean }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* The application logo */}
          <NavLink href={Routes.home} className="flex items-center space-x-2 transition hover:opacity-75">
            <IconMovie className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text">ReelWatch</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-6 md:flex">
            <NavLink href="/search" className="flex items-center space-x-1 text-gray-600 transition hover:text-purple-600">
              <IconSearch className="w-4 h-4" />
              <span>Discover</span>
            </NavLink>
            <NavLink href="/watchlist" className="flex items-center space-x-1 text-gray-600 transition hover:text-purple-600">
              <IconList className="w-4 h-4" />
              <span>My Watchlist</span>
            </NavLink>
            {isLoggedIn && (
              <NavLink href="/notifications" className="relative text-gray-600 transition hover:text-purple-600">
                <IconBell className="w-5 h-5" />
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                  2
                </span>
              </NavLink>
            )}
          </nav>
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                  <IconUser className="w-5 h-5" />
                  <span className="hidden md:inline">Profile</span>
                </button>
                <button
                  onClick={() => user?.logout()}
                  className="px-4 py-2 text-sm font-medium text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <NavLink
                  href={Routes.login}
                  className="px-4 py-2 text-sm font-medium text-purple-600 transition border border-purple-600 rounded-lg hover:bg-purple-50"
                >
                  Login
                </NavLink>
                <NavLink
                  href={Routes.register}
                  className="px-4 py-2 text-sm font-medium text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
