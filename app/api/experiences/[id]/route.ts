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
    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...experience,
      achievements: JSON.parse(experience.achievements),
    });
  } catch (error) {
    console.error("Failed to fetch experience:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
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
    const { title, company, companyUrl, location, period, description, achievements, order } = body;

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        title,
        company,
        companyUrl,
        location,
        period,
        description,
        achievements: achievements ? JSON.stringify(achievements) : undefined,
        order,
      },
    });

    // Revalidate the home page to show updated data
    revalidatePath("/");

    return NextResponse.json({
      ...experience,
      achievements: JSON.parse(experience.achievements),
    });
  } catch (error) {
    console.error("Failed to update experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
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
    await prisma.experience.delete({
      where: { id },
    });

    // Revalidate the home page to show updated data
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
