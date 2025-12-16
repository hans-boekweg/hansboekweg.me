import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error("Failed to fetch education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { degree, field, institution, year, honors, coursework, order } = body;

    const education = await prisma.education.create({
      data: {
        degree,
        field,
        institution,
        year,
        honors: honors || null,
        coursework: coursework ? JSON.stringify(coursework) : null,
        order: order || 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("Failed to create education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}
