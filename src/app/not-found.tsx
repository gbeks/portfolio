import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="text-[13px] font-semibold text-accent">404</p>
      <h1 className="font-display mt-3 text-[44px] leading-none md:text-[72px]">This page doesn&apos;t exist.</h1>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent">
        Back to home
      </Link>
    </Container>
  );
}
