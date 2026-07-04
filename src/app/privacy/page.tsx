import React from "react";
import Navbar from "@/components/Navbar";
import { DeveloperFooter as Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Ismael Silva",
  description:
    "Privacy Policy for ismaelsilva.com — how we collect, use, and protect your personal information.",
};

const LAST_UPDATED = "July 5, 2026";
const SITE_NAME = "ismaelsilva.org";
const CONTACT_EMAIL = "ministry@ismaelsilva.org";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(160deg, #1a2a4a 0%, #0d1a2e 100%)",
            padding: "64px 24px 48px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#b8860b",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#f5f3f0",
              marginBottom: "12px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "#9da8b9", fontSize: "14px" }}>
            Last updated: {LAST_UPDATED}
          </p>
        </section>

        {/* Content */}
        <section
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "64px 24px 80px",
            color: "#3a4a5a",
            fontFamily: "'Georgia', serif",
            lineHeight: 1.8,
            fontSize: "17px",
          }}
        >
          {/* Intro */}
          <p style={{ marginBottom: "40px" }}>
            This Privacy Policy describes how {SITE_NAME} (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
            information about you when you visit our website or interact with
            our services. By using this site, you agree to the practices
            described in this policy.
          </p>

          <Divider />

          <Section title="1. Information We Collect">
            <Subsection title="Information You Provide Directly">
              <ul>
                <li>
                  <strong>Name and email address</strong> — when you subscribe
                  to our mailing list via the email opt-in form.
                </li>
                <li>
                  <strong>Contact form submissions</strong> — any messages or
                  inquiries you send through our contact page.
                </li>
              </ul>
            </Subsection>
            <Subsection title="Information Collected Automatically">
              <ul>
                <li>
                  <strong>Usage data</strong> — pages visited, time on page,
                  referral source, browser type, device type, and IP address,
                  collected via analytics tools.
                </li>
                <li>
                  <strong>Cookies and tracking pixels</strong> — see Section 4
                  below for details.
                </li>
              </ul>
            </Subsection>
            <Subsection title="Information from Third Parties">
              <p>
                We may receive limited information from platforms such as
                Facebook if you interact with our advertisements or social
                content. This is subject to Meta&apos;s own privacy policy.
              </p>
            </Subsection>
          </Section>

          <Divider />

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                Send you email newsletters, book updates, and author content you
                subscribed to receive.
              </li>
              <li>Respond to your inquiries and support requests.</li>
              <li>
                Measure and improve website performance and user experience.
              </li>
              <li>
                Serve relevant advertisements on platforms such as Facebook and
                Instagram.
              </li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal information to third
              parties.
            </p>
          </Section>

          <Divider />

          <Section title="3. Email Communications (CAN-SPAM)">
            <p>
              If you subscribe to our mailing list, you consent to receive
              periodic emails including author updates, book news, and
              community-related content. In compliance with the{" "}
              <strong>CAN-SPAM Act</strong>:
            </p>
            <ul>
              <li>
                Every marketing email includes a clear and conspicuous
                unsubscribe link.
              </li>
              <li>
                We honor opt-out requests promptly (within 10 business days).
              </li>
              <li>
                We do not use deceptive subject lines or sender information.
              </li>
              <li>
                Our physical mailing address is included in all commercial
                emails.
              </li>
            </ul>
            <p>
              You may unsubscribe at any time by clicking the link in any email
              or by emailing us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Divider />

          <Section title="4. Cookies and Tracking Technologies">
            <Subsection title="Facebook Pixel">
              <p>
                This site uses the <strong>Meta Pixel</strong> (formerly
                Facebook Pixel), a tracking technology provided by Meta
                Platforms, Inc. The Pixel allows us to measure the effectiveness
                of our advertising, understand actions taken on our site, and
                serve relevant ads to people who have visited our site.
              </p>
              <p>
                The Pixel may collect your IP address, browser information, and
                page interactions. This data is processed by Meta under their{" "}
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Data Policy
                </a>
                . You can opt out of Meta&apos;s ad targeting via{" "}
                <a
                  href="https://www.facebook.com/ads/preferences"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ad Preferences
                </a>{" "}
                or the{" "}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Digital Advertising Alliance opt-out tool
                </a>
                .
              </p>
            </Subsection>
            <Subsection title="Email Service Provider (ConvertKit)">
              <p>
                We use <strong>ConvertKit</strong> to manage our mailing list
                and deliver email communications. When you subscribe, your name
                and email are stored in ConvertKit&apos;s platform. ConvertKit
                is compliant with GDPR and CAN-SPAM. See their{" "}
                <a
                  href="https://convertkit.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                for more details.
              </p>
            </Subsection>
            <Subsection title="Cookies">
              <p>
                We use session cookies and localStorage to store user
                preferences (such as countdown timer state). These do not
                contain personal information and expire when your browser
                session ends or within 24 hours. You can disable cookies in your
                browser settings, though some site features may not function
                correctly.
              </p>
            </Subsection>
          </Section>

          <Divider />

          <Section title="5. Affiliate Disclosure (FTC)">
            <p>
              In compliance with the U.S. Federal Trade Commission&apos;s
              guidelines on endorsements and testimonials (16 C.F.R. Part 255),
              we disclose the following:
            </p>
            <p>
              This site contains links to products on Amazon.com. As an{" "}
              <strong>Amazon Associate</strong>, we may earn a small commission
              from qualifying purchases made through these links, at no
              additional cost to you. This income helps support the creation of
              free content and ministry resources.
            </p>
            <p>
              All opinions and recommendations on this site are our own and are
              not influenced by affiliate relationships.
            </p>
          </Section>

          <Divider />

          <Section title="6. How We Share Your Information">
            <p>
              We do not sell, rent, or trade your personal information. We may
              share information only in the following limited circumstances:
            </p>
            <ul>
              <li>
                <strong>Service providers</strong> — ConvertKit (email), Meta
                (advertising pixel), and hosting/analytics providers, solely to
                operate the site and services.
              </li>
              <li>
                <strong>Legal compliance</strong> — if required by law, court
                order, or to protect our legal rights.
              </li>
              <li>
                <strong>Business transfers</strong> — in the event of a merger
                or acquisition, your information may transfer to the new owner,
                who will be bound by this policy.
              </li>
            </ul>
          </Section>

          <Divider />

          <Section title="7. Data Retention">
            <p>
              We retain your personal information for as long as necessary to
              provide the services you&apos;ve subscribed to, or as required by
              law. Email subscribers&apos; data is retained until you
              unsubscribe. You may request deletion at any time (see Section 8).
            </p>
          </Section>

          <Divider />

          <Section title="8. Your Rights">
            <Subsection title="All Users">
              <p>Regardless of your location, you have the right to:</p>
              <ul>
                <li>
                  <strong>Access</strong> — request a copy of the personal data
                  we hold about you.
                </li>
                <li>
                  <strong>Correction</strong> — request correction of inaccurate
                  data.
                </li>
                <li>
                  <strong>Deletion</strong> — request deletion of your personal
                  data.
                </li>
                <li>
                  <strong>Opt-out</strong> — unsubscribe from marketing emails
                  at any time.
                </li>
              </ul>
              <p>
                To exercise any of these rights, email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will
                respond within 30 days.
              </p>
            </Subsection>
            <Subsection title="California Residents (CCPA)">
              <p>
                Under the{" "}
                <strong>California Consumer Privacy Act (CCPA)</strong>,
                California residents have additional rights:
              </p>
              <ul>
                <li>
                  <strong>Right to Know</strong> — the categories and specific
                  pieces of personal information we have collected about you.
                </li>
                <li>
                  <strong>Right to Delete</strong> — request deletion of
                  personal information we have collected, subject to certain
                  exceptions.
                </li>
                <li>
                  <strong>Right to Opt-Out of Sale</strong> — we do{" "}
                  <strong>not</strong> sell personal information, so this right
                  is not applicable.
                </li>
                <li>
                  <strong>Right to Non-Discrimination</strong> — we will not
                  discriminate against you for exercising your CCPA rights.
                </li>
              </ul>
              <p>
                To submit a verifiable CCPA request, email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the
                subject line &ldquo;CCPA Request.&rdquo;
              </p>
            </Subsection>
          </Section>

          <Divider />

          <Section title="9. Children's Privacy (COPPA)">
            <p>
              This website is not directed to children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we
              will promptly delete it.
            </p>
          </Section>

          <Divider />

          <Section title="10. Security">
            <p>
              We take reasonable administrative, technical, and physical
              measures to protect your personal information from unauthorized
              access, disclosure, or loss. However, no method of transmission
              over the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </Section>

          <Divider />

          <Section title="11. Third-Party Links">
            <p>
              Our site contains links to third-party websites (including Amazon
              and Meta). We are not responsible for the privacy practices of
              those sites and encourage you to review their privacy policies
              before providing any personal information.
            </p>
          </Section>

          <Divider />

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &ldquo;Last updated&rdquo; date at the top of
              this page. Continued use of the site after changes constitutes
              acceptance of the revised policy. We encourage you to review this
              page periodically.
            </p>
          </Section>

          <Divider />

          <Section title="13. Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us:
            </p>
            <address
              style={{
                fontStyle: "normal",
                background: "#f5f3f0",
                border: "1px solid #e0dbd4",
                borderRadius: "10px",
                padding: "24px 28px",
                marginTop: "16px",
                lineHeight: 2,
              }}
            >
              <strong>Ismael Silva Ministries</strong>
              <br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <br />
              Website:{" "}
              <a href={`https://${SITE_NAME}`} target="_blank" rel="noreferrer">
                {SITE_NAME}
              </a>
            </address>
          </Section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ─── Layout helpers ──────────────────────────────────────────────────────────

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #e0dbd4",
        margin: "40px 0",
      }}
    />
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "8px" }}>
      <h2
        style={{
          fontSize: "clamp(18px, 2.5vw, 22px)",
          fontWeight: 700,
          color: "#1a2a4a",
          fontFamily: "'Poppins', sans-serif",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: "20px", marginBottom: "4px" }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#b8860b",
          fontFamily: "'Poppins', sans-serif",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
