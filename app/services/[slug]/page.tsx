import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServiceDetailClient from "./ServiceDetailClient";
import { Metadata } from "next";
import { ServiceInput } from "@/lib/validations";

// Generate metadata for each service dynamically for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | 3Dots Services`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} - 3Dots`,
      description: service.shortDescription,
      images: service.image ? [service.image] : [],
    },
    alternates: {
      canonical: `/services/${slug}`,
    }
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service) {
    notFound();
  }

  // Generate strict JSON-LD Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDescription,
    "provider": {
      "@type": "Organization",
      "name": "3Dots",
      "url": "https://3dots-agency.com"
    },
    "serviceType": service.title,
    "image": service.image,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ServiceDetailClient data={service as unknown as ServiceInput} />
    </>
  );
}
