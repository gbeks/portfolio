import { cacheLife } from "next/cache";
import { Container } from "./container";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="border-t border-border py-10">
      <Container>
        <p className="text-[13px] text-muted">
          Designed and built in Lagos 🪄 © {year} Gbekeloluwa Odutuga
        </p>
      </Container>
    </footer>
  );
}
