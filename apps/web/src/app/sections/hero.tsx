import { Button } from "@/components/ui/button";
import LinkBtn from "@/components/ui/link-btn";
import { ArrowUpRight } from "lucide-react";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="mx-auto max-w-5xl h-full flex flex-col justify-between items-center gap-8 px-5 md:px-16 md:py-26 py-16">
      <div className="text-center flex flex-col gap-4 max-w-3xl ">
        <h1 className="text-900 md:text-1100 font-bold text-gray-900 leading-tight">
          Take control of your money
        </h1>
        <p className="text-gray-400 text-300 md:text-400 ">
          CashFlow gives you clarity on where every dollar goes. Track expenses,
          visualize spending patterns, and build the budget that works for your
          life.
        </p>
        <div className="flex gap-4 items-center justify-center mt-8">
          <Button size="sm" >Get started</Button>
          <LinkBtn href="#">
            Learn more
            <ArrowUpRight className="w-4 h-4" />
          </LinkBtn>
        </div>
      </div>
      <div>
        <Image src="/Desktop-1.png" alt="Hero image" width={800} height={720} />
      </div>
    </section>
  );
};

export default HeroSection;
