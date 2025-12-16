import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "main" },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { 
      heroTitle, 
      heroSubtitle, 
      heroDescription, 
      heroLocation,
      aboutText,
      aboutTitle,
      focusAreas,
      stats,
      email,
      phone,
      linkedin, 
      twitter, 
      calendly,
      github,
      instagram,
      tiktok,
      whatsapp,
      youtube,
      facebook,
      dribbble,
      behance,
      medium,
      skillsTitle,
      skillsDescription,
      experienceTitle,
      experienceDescription,
      projectsTitle,
      projectsDescription,
      educationTitle,
      educationDescription,
      contactTitle,
      contactDescription,
      resumeUrl,
    } = body;

    const settings = await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: {
        heroTitle,
        heroSubtitle,
        heroDescription,
        heroLocation,
        aboutText,
        aboutTitle,
        focusAreas,
        stats,
        email,
        phone,
        linkedin,
        twitter,
        calendly,
        github,
        instagram,
        tiktok,
        whatsapp,
        youtube,
        facebook,
        dribbble,
        behance,
        medium,
        skillsTitle,
        skillsDescription,
        experienceTitle,
        experienceDescription,
        projectsTitle,
        projectsDescription,
        educationTitle,
        educationDescription,
        contactTitle,
        contactDescription,
        resumeUrl,
      },
      create: {
        id: "main",
        heroTitle,
        heroSubtitle,
        heroDescription,
        heroLocation,
        aboutText,
        aboutTitle,
        focusAreas,
        stats,
        email,
        phone,
        linkedin,
        twitter,
        calendly,
        github,
        instagram,
        tiktok,
        whatsapp,
        youtube,
        facebook,
        dribbble,
        behance,
        medium,
        skillsTitle,
        skillsDescription,
        experienceTitle,
        experienceDescription,
        projectsTitle,
        projectsDescription,
        educationTitle,
        educationDescription,
        contactTitle,
        contactDescription,
        resumeUrl,
      },
    });

    // Revalidate the home page to show updated settings
    revalidatePath("/");

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
