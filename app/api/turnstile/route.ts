import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return NextResponse.json({ success: true, configured: false });

  const { token } = await request.json() as { token?: string };
  if (!token) return NextResponse.json({ success: false }, { status: 400 });

  const form = new URLSearchParams({ secret, response: token });
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) form.set("remoteip", remoteIp);

  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  const result = await verification.json() as { success?: boolean };
  return NextResponse.json({ success: result.success === true }, { status: result.success ? 200 : 400 });
}
