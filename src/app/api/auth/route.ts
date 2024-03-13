import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const access_token = cookies().get("access_token");

    if (!access_token) {
      return new NextResponse("Unauthenticated user", { status: 401 });
    }

    const user = jwt.verify(
      access_token.value,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    if (!user) {
      return new NextResponse("Token expired", { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
