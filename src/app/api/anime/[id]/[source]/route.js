import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const parametros = await params;
  console.log(parametros);

  const src = parametros.source;
  const id = parametros.id;
  const direction = `https://api.jikan.moe/v4/anime/${id}/${src}`;

  try {
    const response = await fetch(direction, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Fallo en Source" }, { status: 500 });
  }
}
