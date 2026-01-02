"use client";

import { useEffect, useRef } from "react";

export default function TweetEmbed({ tweetId }: { tweetId: string }) {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const win = window as typeof window & { twttr?: { widgets: { load: (node?: HTMLElement) => void } } };
    if (typeof window !== "undefined" && win.twttr) {
      win.twttr.widgets.load(tweetRef.current || undefined);
    }
  }, [tweetId]);

  return (
    <div className="my-6" ref={tweetRef}>
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={`https://twitter.com/x/status/${tweetId}`}>
          Loading tweet...
        </a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
}
