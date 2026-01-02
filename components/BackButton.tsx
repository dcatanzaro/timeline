"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";

export default function BackButton() {
  const [href, setHref] = useState("/");

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#milestone-(\d+)$/);
    if (match) {
      startTransition(() => {
        setHref(`/#milestone-${match[1]}`);
      });
    }
  }, []);

  return (
    <Link
      href={href}
      className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 font-medium"
    >
      ← Volver
    </Link>
  );
}
