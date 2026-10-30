import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (
    !process.env.VBT_REVALIDATE_SECRET ||
    secret !== process.env.VBT_REVALIDATE_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // revalidateTag signature in Next.js 16 requires a profile arg for "use cache";
  // for fetch-based ISR tags the runtime accepts one arg — cast accordingly.
  (revalidateTag as unknown as (tag: string) => void)("vbt");
  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
