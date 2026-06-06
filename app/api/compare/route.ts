import { NextResponse } from "next/server";

import { getCollegesForComparison } from "@/services/compare.service";
import {
  compareCollegesQuerySchema,
  compareCollegesSchema,
} from "@/validations/compare";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get("ids");

  if (!idsParam) {
    return NextResponse.json(
      { error: "Missing ids query parameter" },
      { status: 400 },
    );
  }

  const parsed = compareCollegesQuerySchema.safeParse(idsParam);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().formErrors },
      { status: 400 },
    );
  }

  const colleges = await getCollegesForComparison(parsed.data);

  if (colleges.length === 0) {
    return NextResponse.json(
      { error: "No matching colleges found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: colleges, count: colleges.length });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = compareCollegesSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const colleges = await getCollegesForComparison(parsed.data.ids);

  if (colleges.length === 0) {
    return NextResponse.json(
      { error: "No matching colleges found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: colleges, count: colleges.length });
}
