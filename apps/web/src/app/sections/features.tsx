import {
  Card,
  CardAction,
  CardDescription,
  CardIcon,
  CardLabel,
  CardTitle,
} from "@/components/layout/card";
import LinkBtn from "@/components/ui/link-btn";
import SectionHeader from "@/components/ui/section-header";
import { ArrowUpRight, ScanEye, BarChart2, Wallet, ShieldCheck } from "lucide-react";
const FeaturesSection = () => {
  const data = {
      features: [
      {
        icon: ScanEye,
        label: "Tracking",
        title: "Automatic expense categorization",
        description:
          "Log transactions once and CashFlow organizes them into clear categories so you always know where your money goes.",
        href: "#",
      },
      {
        icon: BarChart2,
        label: "Analytics",
        title: "Clear financial insights",
        description:
          "See spending patterns, trends, and summaries that help you make better decisions month after month.",
        href: "#",
      },
      {
        icon: Wallet,
        label: "Budgets",
        title: "Budget awareness",
        description:
          "Set spending limits by category and stay informed before overspending becomes a problem.",
        href: "#",
      },
      {
        icon: ShieldCheck,
        label: "Privacy",
        title: "Your data stays yours alone",
        description:
          "Bank-level encryption protects every transaction you record.",
        href: "#",
      },
    ],
  };

  return (
    <section id="features" className="h-full px-5 md:px-12 md:py-26 py-16 mx-auto max-w-5xl flex flex-col justify-between items-center gap-10 md:gap-20">
      {/* <div className="text-center">
        <p className="text-300 md:text-400 font-semibold uppercase text-gray-900">Features</p>
        <h2 className="text-800 md:text-1000 font-medium text-gray-900">What makes CashFlow work</h2>
        <p className="text-300 md:text-400 text-gray-400">Built for people who want real answers about their money</p>
      </div> */}
      <SectionHeader
        label="Features"
        title="What makes CashFlow work"
        description="Built for people who want real answers about their money"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
        {data.features.map((feature) => {
          const Icon = feature.icon as React.ElementType;
          return (
          <div key={feature.title} >
            <Card variant="feature">
              <CardIcon>{Icon ? <Icon className="w-12 h-12" /> : null}</CardIcon>
              <CardLabel>{feature.label}</CardLabel>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
              <CardAction>
                <LinkBtn href="#">
                  Explore more
                  <ArrowUpRight className="w-4 h-4" />
                </LinkBtn>
              </CardAction>
            </Card>
          </div>
        )})}
      </div>
    </section>
  );
};

export default FeaturesSection;
