"use client";

import { SerwistProvider } from "@serwist/next/react";

export function PWAProvider({ swUrl }: { swUrl: string }) {
  return <SerwistProvider swUrl={swUrl} />;
}
