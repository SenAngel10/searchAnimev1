import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams.toString();
  const direction = `https://api.jikan.moe/v4/top/anime?${params}`;
  console.log(request.url);

  try {
    const response = await fetch(direction, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    // console.log(result);

    const data = result.data;
    const next = result.pagination;
    return NextResponse.json({ data: data, next: next });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server Error /top/anime" },
      { status: 500 },
    );
  }
}
