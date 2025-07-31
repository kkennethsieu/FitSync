"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import Link from "next/link";
import "nprogress/nprogress.css"; // required!
import "@/styles/nprogress.css"; // optional custom styling

NProgress.configure({ showSpinner: false });

export default function LinkWithProgress({ href, children, ...props }) {
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    NProgress.start();

    const MIN_DURATION = 1000;
    const start = Date.now();

    try {
      await router.push(href);
    } finally {
      const elapsed = Date.now() - start;
      const remaining = MIN_DURATION - elapsed;

      if (remaining > 0) {
        setTimeout(() => NProgress.done(), remaining);
      } else {
        NProgress.done();
      }
    }
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
