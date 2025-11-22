"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} Sparkwaves News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
