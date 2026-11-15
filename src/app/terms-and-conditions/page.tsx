import type { Metadata } from "next";
import { routes, site } from "@/data/site";
import { LocalizedLink } from "@/components/locale/LocaleComponents";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms for using the Rainbow Air website and making an enquiry.",
  alternates: { canonical: "/terms-and-conditions/" },
};

const c = site.company;

const sections: LegalSection[] = [
  {
    title: "About these terms",
    body: (
      <p>
        These terms apply to your use of this website, operated by {c.legalName} (ACN {c.acn}, ABN {c.abn}), trading as {site.name}. By
        using the website you agree to these terms. Separate written terms will apply to any quote you accept or work we carry out.
      </p>
    ),
  },
  {
    title: "Website information",
    body: (
      <p>
        Information on this website is general in nature and provided to help you understand our services. Images may be illustrative.
        While we aim to keep content accurate and up to date, it may change without notice and does not form an offer or a quote.
      </p>
    ),
  },
  {
    title: "Enquiries and quotes",
    body: (
      <ul>
        <li>Submitting an enquiry does not create a contract or guarantee availability, pricing or a booking.</li>
        <li>Quotes are based on the information provided and may change after a site assessment.</li>
        <li>Work proceeds only once you accept a written quote.</li>
      </ul>
    ),
  },
  {
    title: "VEU discounts",
    body: (
      <p>
        Victorian Energy Upgrades (VEU) discounts are subject to the program&rsquo;s eligibility rules and assessment. Completing the online
        eligibility check or submitting an enquiry does not guarantee a discount. Where the upgrade replaces gas ducted heating, the existing
        gas heater must be disconnected as part of the work.
      </p>
    ),
  },
  {
    title: "Warranties",
    body: (
      <p>
        Equipment is covered by the manufacturer&rsquo;s warranty. Any installation warranty we offer will be set out in your written quote.
        Nothing in these terms excludes rights you have under the Australian Consumer Law.
      </p>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        Website content and design belong to us or our licensors. Brand names and logos shown are trademarks of their respective owners and
        are used to indicate the brands we install.
      </p>
    ),
  },
  {
    title: "Links to other websites",
    body: <p>We may link to external websites, such as the Victorian Government&rsquo;s VEU website. We are not responsible for their content.</p>,
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, we are not liable for loss arising from your use of this website or reliance on its general
        information. This does not limit any rights you have under the Australian Consumer Law.
      </p>
    ),
  },
  {
    title: "Privacy",
    body: (
      <p>
        We handle personal information as described in our{" "}
        <LocalizedLink href={routes.privacy} className="font-semibold underline">
          Privacy Policy
        </LocalizedLink>
        .
      </p>
    ),
  },
  {
    title: "Governing law and changes",
    body: <p>These terms are governed by the laws of Victoria, Australia. We may update them from time to time by publishing a new version here.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      crumb="Terms and Conditions"
      intro="Terms for using our website and making an enquiry."
      updated="15 November 2026"
      sections={sections}
    />
  );
}
