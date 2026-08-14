import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HomeCtaSection() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-2 bg-secondary text-secondary-foreground shadow-md">
        <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-head text-xl sm:text-2xl">
              Missing a file, or have one to share?
            </h2>
            <p className="text-secondary-foreground/70 text-sm sm:text-base">
              Report a broken link or send materials for the archive.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link to="/contact" />}
            size="lg"
          >
            Get in touch
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  );
}
