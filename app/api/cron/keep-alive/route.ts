// app/api/cron/keep-alive/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.error("Cron keep-alive: unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(`Cron keep-alive: success at ${new Date().toISOString()}`);
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Cron keep-alive: failed", err);
    return NextResponse.json(
      { success: false, error: "Ping failed" },
      { status: 500 },
    );
  }
}
