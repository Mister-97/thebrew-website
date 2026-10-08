import Link from "next/link";
import ContactHeading from "./ContactHeading";
import MembersCard from "./MembersCard";

/** Homepage rewards teaser: the same headline and punch card as /members. */
export default function HomeMembers() {
  return (
    <section id="rewards" className="overflow-hidden bg-cream text-ink">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <ContactHeading text="Join the club" size="md" />
          <p className="mt-5 max-w-md text-lg text-ink/70">
            Every drink earns a stamp. Fill the card and your next one is free.
            Joining takes a minute and costs nothing.
          </p>
          <Link
            href="/members#join"
            className="mt-8 inline-block rounded-full bg-ink px-9 py-4 text-base font-semibold text-cream transition-colors hover:bg-orange"
          >
            Sign up
          </Link>
        </div>
        <MembersCard />
      </div>
    </section>
  );
}
