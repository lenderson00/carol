import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export const publicRoutes: string[] = ["/"];

export const authRoutes = ["/entrar", "/registrar", "/resetar-senha"];

export const defaultRedirects = {
  isNotAuthenticated: "/entrar",
  onAuthPageToLoggedUser: "/",
  onboarding: "/onboarding",
};

type NextAuthRequest = NextRequest & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth?: any;
};

const { auth } = NextAuth(authOptions);

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
     */
    "/((?!api/|_next/|_proxy/|sw.js|swe-worker-development.js|ingest/|pagead/js/adsbygoogle.js|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};

export default auth(async (req: NextAuthRequest) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-current-path", nextUrl.pathname);

  const isLogged = !!req.auth;


  // Check route types
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith("/api/");
  const isPublicRoute = publicRoutes.includes(pathname);
  const isNewPasswordRoute = pathname === "/nova-senha";
  const path = nextUrl.pathname;

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Allow API routes to pass through
  if (isApiRoute) {
    return response;
  }

  if (path.includes("/docs")) {
    return response;
  }

  // Allow public routes to pass through
  if (isPublicRoute) {
    return response;
  }

  // Handle unauthenticated users
  if (!isLogged) {
    // Allow access to auth routes
    if (isAuthRoute) {
      return response;
    }

    // Redirect to login for protected routes
    return NextResponse.redirect(
      new URL(defaultRedirects.isNotAuthenticated, nextUrl),
    );
  }

  // Redirect logged in users away from auth routes
  if (isAuthRoute) {
    return NextResponse.redirect(
      new URL(defaultRedirects.onAuthPageToLoggedUser, nextUrl),
    );
  }

  if (isNewPasswordRoute) {
    return response;
  }




  // If role is not valid for a logged-in user reaching this point (which means isLogged is true).
  // This is an unexpected state for a logged-in user on a path that wasn't handled by earlier checks.
  // It implies the user is logged in, but their role is missing or not a string.
  // console.warn(`Middleware: User is logged in, but role is missing or invalid ('${role}') for path ${pathname}. Passing through without rewrite.`);
  return response; // Pass through without rewrite
});
