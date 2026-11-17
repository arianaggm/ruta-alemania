import { NextResponse, type NextRequest } from "next/server";
import { getSiteUrl, isApprovedHost } from "./app/_lib/site-url";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (!isApprovedHost(request.headers.get("host"), getSiteUrl())) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
