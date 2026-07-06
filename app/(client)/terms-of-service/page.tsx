// app/(client)/terms-of-service/page.tsx
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
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-ink/50">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink/75">
              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  1. Acceptance of Terms
                </h2>
                <p className="mt-3">
                  By accessing this website or engaging [Your Legal Business
                  Name] for design services, you agree to be bound by these
                  Terms of Service. If you do not agree, please do not use this
                  site or our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  2. Services
                </h2>
                <p className="mt-3">
                  We provide design services including but not limited to brand
                  identity, flyer and poster design, social media design,
                  business branding, and custom digital art. The specific scope,
                  timeline, and deliverables for any project will be agreed upon
                  separately with each client.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  3. Intellectual Property Ownership
                </h2>
                <p className="mt-3">
                  All designs, concepts, drafts, and creative work displayed on
                  this website, whether client work or personal projects, remain
                  the intellectual property of [Your Legal Business Name] unless
                  full payment has been received and ownership has been
                  explicitly transferred in a signed agreement.
                </p>
                <p className="mt-3">
                  Displaying a project in our portfolio does not grant any
                  visitor, client, or third party the right to copy, reproduce,
                  modify, resell, or otherwise use that work without our prior
                  written consent.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  4. Client Usage Rights
                </h2>
                <p className="mt-3">
                  Upon full payment, clients are granted the usage rights
                  specified in their project agreement. Unless otherwise stated
                  in writing, this does not include the right to resell,
                  sublicense, or claim authorship of the design work itself.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  5. Unauthorized Use &amp; Enforcement
                </h2>
                <p className="mt-3">
                  Any use, reproduction, or distribution of our designs without
                  prior written consent is strictly prohibited and may
                  constitute copyright infringement. [Your Legal Business Name]
                  reserves the right to pursue all available legal remedies
                  against unauthorized use, including but not limited to demand
                  for removal, claims for damages, and injunctive relief.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  6. Payments
                </h2>
                <p className="mt-3">
                  Project fees, deposit requirements, and payment schedules will
                  be communicated and agreed upon before work begins. Work may
                  be paused or withheld until outstanding payments are settled.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  7. Revisions &amp; Cancellations
                </h2>
                <p className="mt-3">
                  The number of included revisions and our cancellation policy
                  will be outlined in the individual project agreement. Deposits
                  are generally non-refundable once work has commenced.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  8. Limitation of Liability
                </h2>
                <p className="mt-3">
                  [Your Legal Business Name] is not liable for any indirect,
                  incidental, or consequential damages arising from the use of
                  our services or website, to the fullest extent permitted by
                  law.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  9. Governing Law
                </h2>
                <p className="mt-3">
                  These Terms are governed by the laws of [jurisdiction, e.g.
                  the Federal Republic of Nigeria], without regard to its
                  conflict of law provisions. Any disputes arising under these
                  Terms shall be subject to the exclusive jurisdiction of the
                  courts of [jurisdiction].
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  10. Changes to These Terms
                </h2>
                <p className="mt-3">
                  We may revise these Terms at any time. Continued use of this
                  website or our services after changes are posted constitutes
                  acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-ink">
                  11. Contact Us
                </h2>
                <p className="mt-3">
                  Questions about these Terms can be sent to{" "}
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
