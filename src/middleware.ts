import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured yet, allow public access and /admin to display config status
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Avoid using getSession() as it isn't guaranteed to revalidate auth token against Supabase server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Helper to construct redirects that PRESERVE any cookies set by Supabase
  const createRedirectResponse = (targetUrl: URL) => {
    const redirectResponse = NextResponse.redirect(targetUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  };

  // ADMIN ROUTE PROTECTION
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin";

    // 1. Unauthenticated visitors trying to access protected admin pages
    if (!user && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.searchParams.set("redirect", pathname);
      return createRedirectResponse(url);
    }

    // 2. Authenticated user
    if (user) {
      // Verify admin status from public.admin_users
      const { data: adminProfile } = await supabase
        .from("admin_users")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

      const isAuthorizedAdmin = !!(adminProfile && adminProfile.is_active);

      // If user is on the login page and is already an authorized admin, redirect to dashboard
      if (isLoginPage && isAuthorizedAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/dashboard";
        return createRedirectResponse(url);
      }

      // If user is accessing protected admin pages but is not an authorized admin
      if (!isLoginPage && !isAuthorizedAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        url.searchParams.set("error", "unauthorized");
        return createRedirectResponse(url);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
