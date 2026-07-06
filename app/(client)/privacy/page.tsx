// app/(client)/privacy-policy/page.tsx
import Header from "@/components/shared/Header";
import { Container } from "@/components/Container";
import Contact from "@/components/Contact";

const LAST_UPDATED = "July 2026";

export default function page() {
  return (
    <>
      <main className="md:pt-40 pt-32 pb-32">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-ink/50">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="mt-10 space-y-10 text-xs md:text-sm leading-relaxed text-ink/75">
              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  1. Introduction
                </h2>
                <p className="mt-3">
                  [Your Legal Business Name] ("we," "us," or "our") respects
                  your privacy. This policy explains what information we collect
                  through this website, how we use it, and the choices you have.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  2. Information We Collect
                </h2>
                <p className="mt-3">
                  We may collect information you provide directly, such as your
                  name, email address, phone number, and project details when
                  you fill out our contact form or request a quote. We may also
                  collect basic technical data automatically, such as browser
                  type, device type, and pages visited, to help us understand
                  how the site is used.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  3. How We Use Your Information
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>To respond to inquiries and quote requests</li>
                  <li>To deliver services you've engaged us for</li>
                  <li>To improve our website and services</li>
                  <li>To send updates related to an active project</li>
                </ul>
                <p className="mt-3">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  4. Portfolio &amp; Design Ownership
                </h2>
                <p className="mt-3">
                  Designs, graphics, and creative work displayed on this website
                  are the intellectual property of [Your Legal Business Name]
                  unless explicitly stated otherwise. Nothing on this site
                  grants you a license to copy, reproduce, redistribute, or
                  otherwise use these works for personal or commercial purposes
                  without our prior written consent. Unauthorized use may result
                  in legal action, including but not limited to claims for
                  damages and injunctive relief.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  5. Cookies
                </h2>
                <p className="mt-3">
                  This site may use basic cookies or similar technologies to
                  support core functionality and understand site usage. You can
                  disable cookies through your browser settings, though some
                  features may not function as intended.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  6. Third-Party Services
                </h2>
                <p className="mt-3">
                  We may use third-party tools (such as form handlers, hosting
                  providers, or analytics services) to operate this site. These
                  providers only receive the information necessary to perform
                  their function and are not authorized to use it for any other
                  purpose.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  7. Data Retention &amp; Security
                </h2>
                <p className="mt-3">
                  We retain personal information only as long as necessary for
                  the purposes outlined in this policy, or as required by law.
                  We take reasonable technical and organizational measures to
                  protect your information, but no method of transmission or
                  storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  8. Your Rights
                </h2>
                <p className="mt-3">
                  You may request access to, correction of, or deletion of your
                  personal information at any time by contacting us using the
                  details below.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  9. Changes to This Policy
                </h2>
                <p className="mt-3">
                  We may update this policy from time to time. Changes will be
                  posted on this page with a revised "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  10. Contact Us
                </h2>
                <p className="mt-3">
                  Questions about this policy can be sent to{" "}
                  <a
                    href="mailto:[contact email]"
                    className="font-medium text-ink underline underline-offset-2 hover:text-accent"
                  >
                    [contact email]
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
