"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { type AppStore, makeStore } from "./store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // One store instance per request/client — created once via a ref so it is
  // not recreated on re-render. See Redux's Next.js App Router guidance.
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
