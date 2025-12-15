import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await hash(process.env.ADMIN_PASSWORD || "admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@example.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: adminPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Seed projects
  const projects = [
    {
      title: "Digital Transformation Initiative",
      description: "Led end-to-end digital transformation for a €500M manufacturing company, modernizing operations across 12 facilities",
      role: "Program Director",
      challenges: "Achieved €15M annual savings and 40% productivity improvement within 18 months.",
      tags: JSON.stringify(["Change Management", "Digital Strategy", "Process Optimization", "ERP Implementation"]),
      size: "large",
      order: 1,
    },
    {
      title: "Market Expansion Strategy",
      description: "Developed and executed market entry strategy for Nordic expansion of fintech platform",
      role: "Strategy Lead",
      challenges: "Captured 12% market share in first year, generating €8M new revenue.",
      tags: JSON.stringify(["Market Analysis", "Go-to-Market", "Partnership Development"]),
      size: "medium",
      demoUrl: "https://example.com/case-study",
      order: 2,
    },
    {
      title: "Post-Merger Integration",
      description: "Managed integration of €75M acquisition, aligning operations and culture",
      role: "Integration Lead",
      challenges: "Retained 95% of key talent and achieved synergy targets 6 months early.",
      tags: JSON.stringify(["M&A", "Change Management", "Team Building"]),
      size: "small",
      order: 3,
    },
    {
      title: "Operational Excellence Program",
      description: "Implemented lean methodology across supply chain operations",
      role: "Program Manager",
      challenges: "Reduced lead times by 35% and inventory costs by €4M.",
      tags: JSON.stringify(["Lean Six Sigma", "Supply Chain", "KPI Development"]),
      size: "small",
      order: 4,
    },
    {
      title: "Strategic Partnership Platform",
      description: "Built B2B partnership ecosystem connecting 200+ enterprise vendors with SMB clients",
      role: "Business Owner",
      challenges: "Generated €20M GMV in first year with 85% partner retention rate.",
      tags: JSON.stringify(["Business Development", "Platform Strategy", "Vendor Management", "Revenue Growth"]),
      size: "medium",
      demoUrl: "https://example.com/platform",
      order: 5,
    },
    {
      title: "Corporate Innovation Lab",
      description: "Established innovation hub to drive new product development and startup partnerships",
      role: "Founding Director",
      challenges: "Launched 5 new product lines and 3 successful startup investments.",
      tags: JSON.stringify(["Innovation Strategy", "Venture Building", "R&D Management", "Startup Ecosystem"]),
      size: "large",
      order: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20) },
      update: project,
      create: {
        id: project.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20),
        ...project,
      },
    });
  }
  console.log("✅ Projects seeded:", projects.length);

  // Seed experiences
  const experiences = [
    {
      title: "Chief Operating Officer",
      company: "TechScale Ventures",
      companyUrl: "https://example.com",
      location: "Amsterdam, Netherlands",
      period: "2021 - Present",
      description: "Leading operations and strategic initiatives for a €100M+ technology investment portfolio.",
      achievements: JSON.stringify([
        "Drove 45% revenue growth across portfolio companies through operational improvements",
        "Led M&A integration of 3 acquisitions, achieving synergy targets 6 months ahead of schedule",
        "Built and scaled operations team from 15 to 50+ professionals across 5 countries",
        "Implemented data-driven decision framework reducing operating costs by €8M annually",
      ]),
      order: 1,
    },
    {
      title: "Director of Business Development",
      company: "Global Dynamics Group",
      companyUrl: "https://example.com",
      location: "Rotterdam, Netherlands",
      period: "2017 - 2021",
      description: "Spearheaded business expansion and strategic partnerships across European markets.",
      achievements: JSON.stringify([
        "Generated €25M in new revenue through strategic partnership development",
        "Expanded market presence to 8 new European countries within 3 years",
        "Negotiated and closed enterprise contracts worth €50M+ total contract value",
        "Developed go-to-market strategy that increased market share by 35%",
      ]),
      order: 2,
    },
    {
      title: "Senior Strategy Consultant",
      company: "McKinsey & Company",
      companyUrl: "https://mckinsey.com",
      location: "Amsterdam, Netherlands",
      period: "2013 - 2017",
      description: "Advised Fortune 500 clients on strategic transformation and operational excellence.",
      achievements: JSON.stringify([
        "Led 20+ strategic engagements across technology, retail, and financial services sectors",
        "Delivered €100M+ in identified cost savings for clients through process optimization",
        "Developed proprietary frameworks for digital transformation adopted firm-wide",
      ]),
      order: 3,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20) },
      update: exp,
      create: {
        id: exp.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20),
        ...exp,
      },
    });
  }
  console.log("✅ Experiences seeded:", experiences.length);

  // Seed site settings
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      heroTitle: "Hans Boekweg",
      heroSubtitle: "Business Strategy & Operations Leader",
      heroDescription: "Driving business growth through strategic planning, operational excellence, and data-driven decision making.",
      email: "hans.boekweg@example.com",
      linkedin: "https://linkedin.com/in/hansboekweg",
      twitter: "https://twitter.com/hansboekweg",
      calendly: "https://calendly.com/hansboekweg",
    },
  });
  console.log("✅ Site settings created");

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
