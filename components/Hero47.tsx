import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Hero47Props {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  buttons?: {
    primary?: { text: string; url: string; };
    secondary?: { text: string; url: string; };
  };
  className?: string;
}

const Hero47 = ({
  heading = "Your Safe Space to Talk,",
  subheading = "Heal & Grow",
  description = "A compassionate counselling platform that listens without judgment, helps you process your thoughts, and supports your mental well-being anytime you need it.",
  buttons = {
    primary: { text: "Get Started", url: "/sign-up" },
    secondary: { text: "Learn More", url: "/about" },
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg",
    alt: "Placeholder",
  },
  className,
}: Hero47Props) => {
  return (
    <section className={cn("bg-background pt-8 pb-10 lg:pt-3 lg:pb-12 pl-8", className)}>
      <div className="container flex flex-col items-center gap-8 lg:flex-row">
        <div className="flex flex-col gap-6 lg:w-2/3">
          <h2 className="text-4xl font-semibold text-foreground lg:text-6xl animate-fade-in">
            <span>{heading} </span>
            <br></br>
            <span className="text-muted-foreground">{subheading}</span>
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            {description}
          </p>
          <div className="flex flex-wrap items-start gap-4">
            <Button asChild>
              <a href={buttons.primary?.url}>
                <ArrowUpRight className="size-4" />
                <span className="px-4 text-sm lg:text-base">
                  {buttons.primary?.text}
                </span>
              </a>
            </Button>
            <Button asChild variant="link" className="underline">
              <a href={buttons.secondary?.url}>{buttons.secondary?.text}</a>
            </Button>
          </div>
        </div>
        <div className="relative z-10">
          <div className="absolute top-2.5 left-1/2! h-[92%]! w-[69%]! -translate-x-[52%] overflow-hidden rounded-[35px]">
            <img
              src={image.src}
              alt={image.alt}
              className="size-full object-cover object-[50%_0%]"
            />
          </div>
          <img
            className="relative z-10"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mockups/phone-2.png"
            width={300}
            height={100}
            alt="iphone"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero47 };