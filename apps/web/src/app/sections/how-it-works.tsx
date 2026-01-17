import { Card, CardBadge, CardDescription, CardTitle } from "@/components/layout/card";
import SectionHeader from "@/components/ui/section-header";

const howItWorks = () => {
  const data = {
    steps: [
      {
        
        label: "1",
        title: "Add your income and expenses",
        description:
          "Enter transactions manually or connect your accounts to keep everything in one place.",
        
      },
      {
        
        label: "2",
        title: "View your spending clearly",
        description:
          "Interactive charts and summaries show exactly how your money is being used.",
        
      },
      {
        
        label: "3",
        title: "Stay in control of your budget",
        description:
          "Track progress, set limits, and adjust habits with confidence.",
        
      },
      
    ],
  };

  return (
    <section id="how-it-works" className="h-full px-5 md:px-12 md:py-26 py-16 mx-auto max-w-5xl flex flex-col justify-between items-center gap-10 md:gap-20">
      <SectionHeader 
        label="How it works"
        title="Simple steps to financial clarity"
        description="CashFlow makes managing your finances easy and transparent."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:grid-cols-3">
        {data.steps.map((step) => (
          <div key={step.title} >
            <Card variant="step" className="text-center md:text-left">
              <CardBadge>{step.label}</CardBadge>
              <CardTitle >{step.title}</CardTitle>
              <CardDescription>
                {step.description}
              </CardDescription>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default howItWorks;
