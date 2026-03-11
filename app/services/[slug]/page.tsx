import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";
import { Metadata } from "next";

// Data store (can be moved to a DB or CMS in the future)
const servicesData: Record<string, any> = {
  "software-products": {
    title: "Software Products",
    shortDescription: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms.",
    fullDescription: "At 3Dots, we understand that a successful software product is more than just code. It's about solving real problems, delivering seamless user experiences, and scaling flawlessly. Our Software Products service covers the entire lifecycle—from the initial MVP to a fully featured enterprise platform.",
    features: [
      {
        title: "Custom Web Applications",
        description: "Tailored web platforms built with React, Next.js, and Node.js for high performance and scalability."
      },
      {
        title: "Enterprise Systems",
        description: "Robust ERPS and CRMs designed to streamline your business operations and securely handle large data volumes."
      },
      {
        title: "Cloud Architecture",
        description: "Scalable, secure, and highly available infrastructure leveraging AWS, GCP, or Azure best practices."
      }
    ],
    benefits: ["Faster Time-to-Market", "Scalable Infrastructure", "User-Centric Design", "Reliable & Secure"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
  },
  "intelligent-workflows": {
    title: "Intelligent Workflows",
    shortDescription: "We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools.",
    fullDescription: "Modern businesses run on efficiency. Through our Intelligent Workflows service, we integrate AI and modern automation tools to connect your isolated systems, automate mundane tasks, and unlock new levels of productivity. Whether it's data synchronization or AI-driven decision making, we build it.",
    features: [
      {
        title: "AI-Powered Automation",
        description: "Leverage LLMs and Machine Learning to automate complex decision-making and data extraction."
      },
      {
        title: "Process Optimization",
        description: "Identify bottlenecks in your operations and implement customized software scripts to streamline them."
      },
      {
        title: "Third-Party Integrations",
        description: "Seamlessly connect your CRM, ERP, and communication tools via custom APIs and webhooks."
      }
    ],
    benefits: ["Reduced Operational Costs", "Higher Accuracy", "Seamless Connectivity", "24/7 Automation"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
  }
};

// Generate metadata for each service dynamically for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

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
      images: [service.image],
    },
    alternates: {
      canonical: `/services/${slug}`,
    }
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];

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
      "url": "https://3dots-agency.com" // Replace with actual URL
    },
    "serviceType": service.title,
    "image": service.image,
  };

  return (
    <>
      {/* Inject JSON-LD to completely optimize search engine ranking */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Client component containing the animations and UI */}
      <ServiceDetailClient data={service} />
    </>
  );
}
