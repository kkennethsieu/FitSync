"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function LoadingProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Simulate progress start/end on route change
    handleStart();
    const timeout = setTimeout(handleStop, 600); // You can adjust timing

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
