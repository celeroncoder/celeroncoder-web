import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const MARKDOWN_SUFFIX = ".md";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.endsWith(MARKDOWN_SUFFIX)) return NextResponse.next();

  let sourcePath = pathname.slice(0, -MARKDOWN_SUFFIX.length) || "/";
  if (sourcePath === "/index") sourcePath = "/";

  const destination = request.nextUrl.clone();
  destination.pathname = `/llm-markdown${sourcePath}`;

  return NextResponse.rewrite(destination);
}

export const config = {
  matcher: ["/((?!api/|admin/|_next/).*\\.md)"],
};
