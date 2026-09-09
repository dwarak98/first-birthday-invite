import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { listRsvps } from "@/lib/db";

export const dynamic = "force-dynamic";

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const rows = await listRsvps();
  const header = ["name", "attending", "people", "language", "created_at"];
  const body = rows.map((row) =>
    [
      csvCell(row.name),
      row.attending ? "yes" : "no",
      row.people,
      row.locale,
      row.createdAt,
    ].join(","),
  );
  const csv = [header.join(","), ...body].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=rsvps.csv",
    },
  });
}
