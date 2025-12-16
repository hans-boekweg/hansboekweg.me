import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await prisma.skillCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Skill category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...category,
      skills: JSON.parse(category.skills) as string[],
    });
  } catch (error) {
    console.error("Failed to fetch skill category:", error);
    return NextResponse.json(
      { error: "Failed to fetch skill category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, color, skills, order } = body;

    const category = await prisma.skillCategory.update({
      where: { id },
      data: {
        title,
        color,
        skills: JSON.stringify(skills || []),
        order,
      },
    });

    revalidatePath("/");

    return NextResponse.json({
      ...category,
      skills: JSON.parse(category.skills) as string[],
    });
  } catch (error) {
    console.error("Failed to update skill category:", error);
    return NextResponse.json(
      { error: "Failed to update skill category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.skillCategory.delete({
      where: { id },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete skill category:", error);
    return NextResponse.json(
      { error: "Failed to delete skill category" },
      { status: 500 }
    );
  }
}
