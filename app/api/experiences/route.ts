import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    // Parse achievements JSON for each experience
    const parsed = experiences.map((e: { achievements: string; [key: string]: unknown }) => ({
      ...e,
      achievements: JSON.parse(e.achievements),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
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
    const { title, company, companyUrl, location, period, description, achievements, order } = body;

    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        companyUrl,
        location,
        period,
        description,
        achievements: JSON.stringify(achievements || []),
        order: order ?? 0,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Failed to create experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}
