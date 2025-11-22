"use client";

import Link from "next/link";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";
import { getCategories, slugifyCategory } from "@/lib/news-utils";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data, isLoading } = useSWR("/api/news", fetcher);
  const categories = getCategories(data || []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const maxVisibleCategories = 5;
  const visibleCategories = categories.slice(0, maxVisibleCategories);
  const hiddenCategories = categories.slice(maxVisibleCategories);

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo, categories, and menu */}
        <div className="flex justify-between md:grid md:grid-cols-3 items-center py-4">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center">
              <span className="text-white text-xl font-bold">Sparkwaves</span>
            </Link>
          </div>

          <div className="justify-self-center hidden md:flex items-center space-x-8">
            {/* Visible Categories */}
            {visibleCategories.map((category) => (
              <Link
                key={category}
                href={`/category/${slugifyCategory(category)}`}
                className={cn(
                  "font-medium text-sm whitespace-nowrap transition-colors duration-200",
                  "text-white hover:text-accent-purple"
                )}
              >
                {category}
              </Link>
            ))}

            {/* Mega Menu for Additional Categories */}
            {hiddenCategories.length > 0 && (
              <div className="relative">
                <button
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  className={cn(
                    "flex items-center font-medium text-sm whitespace-nowrap transition-colors duration-200",
                    "text-white hover:text-accent-purple"
                  )}
                >
                  More
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {/* Mega Menu Dropdown - Compact */}
                {isMegaMenuOpen && (
                  <div
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto"
                  >
                    <div className="px-2">
                      <h3 className="text-xs font-semibold text-gray-900 mb-2 px-2 py-1">
                        More Categories
                      </h3>
                      <div className="space-y-1">
                        {hiddenCategories.map((category) => (
                          <Link
                            key={category}
                            href={`/category/${slugifyCategory(category)}`}
                            className="block px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 hover:text-accent-blue rounded transition-colors duration-200"
                            onClick={() => setIsMegaMenuOpen(false)}
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="justify-self-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-accent-purple md:block"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Hamburger menu */}
        {isMobileMenuOpen && (
          <div className="flex flex-col space-y-2 py-4 border-t border-gray-600">
            <Link
              href="/gallery"
              className="font-medium text-sm text-white hover:text-accent-purple transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>

            <Link
              href="/videos"
              className="font-medium text-sm text-white hover:text-accent-purple transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Videos
            </Link>

            <Link
              href="/blogs"
              className="font-medium text-sm text-white hover:text-accent-purple transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blogs
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
