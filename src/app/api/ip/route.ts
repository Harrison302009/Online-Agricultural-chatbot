import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const ip =
    (await req.headers.get("x-forwarded-for")?.split(",")[0]) || (await req.ip);

  if (!ip) {
    return new Response(JSON.stringify({ error: "IP address not found" }), {
      status: 400,
    });
  }

  const geoRes = await fetch(
    `https://ipinfo.io/${ip}/json?token=d4ce7cc65497d7`,
  );
  const geoData = await geoRes.json();
  console.log(geoData);
  return new Response(JSON.stringify(geoData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
