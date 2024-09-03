import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  const response = NextResponse.next();

  if (token) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/home", "/protected-page", "/login", "/signup"],
};
