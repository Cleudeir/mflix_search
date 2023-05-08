import { NextRequest, NextResponse } from "next/server";

const parserUrl = (url: string) => {
  return url
    .split("__")
    .join(":")
    .split("/")
    .splice(4)
    .join("/")
    .replace("https/", "https://")
    .replace("http:/", "http://");
};

export async function GET(request: NextRequest) {
  const url = parserUrl(request.url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, url });
  }
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const url = parserUrl(request.url);
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, url });
  }
}
