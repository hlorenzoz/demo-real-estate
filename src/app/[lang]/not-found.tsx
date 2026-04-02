import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * GLOBAL NOT FOUND TRIGGER
 * ------------------------
 * This component is automatically rendered by Next.js when notFound()
 * is invoked anywhere in the /[lang] subtree.
 * 
 * We unify the experience by redirecting to the /[lang]/404 route.
 */
export default async function GlobalNotFound() {
  // We need to determine the language. We can try to extract it from headers or use a default.
  // In most cases where notFound() is called, we already have a lang in the URL.
  
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  
  // Basic heuristic: check if referer contains /es/
  const isSpanish = referer.includes("/es/") || referer.endsWith("/es");
  const lang = isSpanish ? "es" : "en";

  redirect(`/${lang}/404`);
}
