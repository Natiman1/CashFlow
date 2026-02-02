import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  console.log("Proxy running for:", request.nextUrl.pathname);
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
