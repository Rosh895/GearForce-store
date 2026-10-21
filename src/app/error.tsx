"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="py-28 text-center">
      <h1 className="display text-4xl sm:text-6xl">Something went wrong</h1>
      <p className="mx-auto mt-4 max-w-md text-silver">An unexpected error occurred. Please try again.</p>
      <Button onClick={reset} className="mt-8">Try again</Button>
    </Container>
  );
}
