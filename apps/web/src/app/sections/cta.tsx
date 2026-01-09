import { Button } from "@/components/ui/button";
import LinkBtn from "@/components/ui/link-btn";
import SectionHeader from "@/components/ui/section-header";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const cta = () => {
  return (
    <section className="h-full px-5 md:px-12 md:py-26 py-16 mx-auto max-w-5xl flex flex-col justify-between items-center gap-10 md:gap-20">
      <div className="flex flex-col  justify-between items-center w-full gap-6 ">
        <SectionHeader
          title="Start managing your money"
          description="Get started with our personal finance tracker today."
        />
        <div className="flex justify-start gap-4">
          <Button size="sm">Get started</Button>
          <LinkBtn href="#">
            Explore
            <ArrowUpRight className="w-4 h-4" />
          </LinkBtn>
        </div>
      </div>
      <Image src="/Desktop-3.png" alt="Call to action image" width={800} height={400} />
    </section>
  );
};

export default cta;
