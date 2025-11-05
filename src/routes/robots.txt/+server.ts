export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://www.allstatetrailers.com/sitemap.xml`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
