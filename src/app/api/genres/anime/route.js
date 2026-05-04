import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const params = url.searchParams.toString();
  const direction = `https://api.jikan.moe/v4/genres/anime?${params}`;
  console.log(request.url);

  try {
    const response = await fetch(direction, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    // console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server Error /top/anime" },
      { status: 500 },
    );
  }
}
