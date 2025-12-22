import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="RhodesHub Admin", charset="UTF-8"',
    },
  });
}

function forbidden() {
  return new NextResponse("Access denied.", { status: 403 });
}

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const pass = process.env.ADMIN_BASIC_AUTH_PASS;

  if (!user || !pass) {
    return new NextResponse(
      "Admin Basic Auth is not configured. Set ADMIN_BASIC_AUTH_USER and ADMIN_BASIC_AUTH_PASS.",
      { status: 500 }
    );
  }

  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml")
  ) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  const base64Credentials = authHeader.slice("Basic ".length).trim();
  let decoded = "";
  try {
    decoded = atob(base64Credentials);
  } catch {
    return unauthorized();
  }

  const [incomingUser, incomingPass] = decoded.split(":");

  if (incomingUser !== user || incomingPass !== pass) {
    return forbidden();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
