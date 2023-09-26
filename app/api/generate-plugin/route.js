import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();

  try {
    const {
      pluginName,
      pluginSlug,
      pluginUri,
      pluginDescription,
      pluginVersion,
      pluginAuthorName,
      pluginAuthorUri,
      pluginTextDomain,
    } = data;

    return NextResponse.json("Plugin generated successfully!", { status: 200 });
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
