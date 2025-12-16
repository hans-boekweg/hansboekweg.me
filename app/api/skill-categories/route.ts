import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(
      categories.map((cat: { id: string; title: string; color: string; skills: string; order: number; createdAt: Date; updatedAt: Date }) => ({
        ...cat,
        skills: JSON.parse(cat.skills) as string[],
      }))
    );
  } catch (error) {
    console.error("Failed to fetch skill categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, color, skills, order } = body;

    const category = await prisma.skillCategory.create({
      data: {
        title,
        color: color || "blue",
        skills: JSON.stringify(skills || []),
        order: order || 0,
      },
    });

    revalidatePath("/");

    return NextResponse.json({
      ...category,
      skills: JSON.parse(category.skills) as string[],
    });
  } catch (error) {
    console.error("Failed to create skill category:", error);
    return NextResponse.json(
      { error: "Failed to create skill category" },
      { status: 500 }
    );
  }
}
