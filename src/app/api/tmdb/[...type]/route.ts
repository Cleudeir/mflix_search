import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const query = request.url;
  const type = query.split("/").slice(-1)[0];
  try {
    const url = `${process.env.BACK_URL}/tmdb/${type}`  
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      cache:"no-cache"
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, url: type });
  }
}
