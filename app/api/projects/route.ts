import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    });

    // Parse tags JSON for each project
    const parsed = projects.map((p: { tags: string; [key: string]: unknown }) => ({
      ...p,
      tags: JSON.parse(p.tags),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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
    const { title, description, role, challenges, tags, size, demoUrl, githubUrl, featured, order } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        role,
        challenges,
        tags: JSON.stringify(tags || []),
        size: size || "medium",
        demoUrl,
        githubUrl,
        featured: featured ?? true,
        order: order ?? 0,
      },
    });

    // Revalidate the home page to show the new project
    revalidatePath("/");

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
