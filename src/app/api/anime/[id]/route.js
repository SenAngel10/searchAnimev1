import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  //nos tra el path dinamico de la request que estamos podiendo
  const parametros = await params;
  console.log(parametros);
  const id = parametros.id;
  console.log(id);

  //ponemos la direccion a donde queremos ir
  const direction = `https://api.jikan.moe/v4/anime/${id}`;

  try {
    //esperamos el fecth y guardamos en cache con revalidate
    const response = await fetch(direction, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    const data = result;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 },
    );
  }
}
