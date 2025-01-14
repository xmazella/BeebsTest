import { NextResponse } from "next/server";

const BASE_URL = "https://opendata.paris.fr/api/records/1.0/search/";
const DATASET = "que-faire-a-paris-";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    searchParams.append("dataset", DATASET);
    searchParams.append("rows", "20");

    const response = await fetch(`${BASE_URL}?${searchParams}`);
    const data = await response.json();

    return NextResponse.json({
      records: data.records,
      total: data.nhits,
      hasMore:
        data.nhits > 20 && Number(searchParams.get("start")) < data.nhits,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Une erreur est survenue ${error}` },
      { status: 500 }
    );
  }
}
