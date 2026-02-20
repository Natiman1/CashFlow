import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/section-header";
import LinkBtn from "@/components/ui/link-btn";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const OverviewSection = () => {
  return (
    <section
      id="overview"
      className="h-full px-5 md:px-12 md:py-26 py-16 mx-auto max-w-5xl flex flex-col justify-between items-center gap-10 md:gap-20"
    >
      <SectionHeader
        label="Dashboard"
        title="See your money clearly"
        description="Real-time summaries and charts that tell the story of your spending."
      />
      <div className="flex gap-10 flex-col lg:flex-row justify-center items-center border border-gray-300 rounded-lg ">
        <div className="flex-1 p-4 md:py-6 md:px-18 lg:pl-8 lg:pr-0 ">
          <div className="">
            <p className="text-gray-600 text-300 md:text-400 ">Overview</p>
            <h2 className="text-gray-900 text-800  font-medium mb-4 leading-tight">
              Balance and spending at a glance
            </h2>
            <p className="text-gray-400 text-300 md:text-400 mb-6">
              Summary cards show your current balance, monthly spending, and
              budget status. Recent transactions appear below so nothing gets
              missed.
            </p>
          </div>
          <div className="flex justify-start gap-4">
            <Link href="/register">
              <Button size="sm">Get started</Button>
            </Link>
            <LinkBtn href="#">
              Explore
              <ArrowUpRight className="w-4 h-4" />
            </LinkBtn>
          </div>
        </div>

        <Image
          src="/Desktop-2.png"
          alt="Overview image"
          width={440}
          height={440}
        />
      </div>
    </section>
  );
};

export default OverviewSection;
