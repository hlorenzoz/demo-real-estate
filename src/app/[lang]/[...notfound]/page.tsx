import { redirect } from "next/navigation";

/**
 * CATCH-ALL REDIRECTOR
 * --------------------
 * Captures all unmatched routes within a locale and performs a 
 * permanent redirect to the unified 404 page.
 * 
 * This approach fixes the "Performance: NotFoundHandler cannot have 
 * a negative time stamp" error by avoiding nested notFound() calls 
 * during server-side capturing.
 */
export default async function CatchAllRedirect({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}/404`);
}
