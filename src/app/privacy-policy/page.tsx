import type { Metadata } from "next";
import { site, telHref } from "@/data/site";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Rainbow Air collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy/" },
};

const c = site.company;

const sections: LegalSection[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This website is operated by {c.legalName} (ACN {c.acn}, ABN {c.abn}), trading as {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;). We handle personal information in line with the Australian Privacy Principles in the <em>Privacy Act 1988</em>{" "}
        (Cth), where they apply to us.
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>We only collect information we need to respond to your enquiry and provide our services, such as:</p>
        <ul>
          <li>your name, phone number and email address;</li>
          <li>the property address, suburb and postcode;</li>
          <li>details about your home and existing heating or cooling system, including photos you choose to send us;</li>
          <li>information needed to assess eligibility for programs such as Victorian Energy Upgrades (VEU);</li>
          <li>basic technical information when you visit the website (for example, browser type and pages visited).</li>
        </ul>
      </>
    ),
  },
  {
    title: "How we use your information",
    body: (
      <ul>
        <li>to reply to enquiries, prepare quotes and arrange site assessments and installations;</li>
        <li>to assess and process VEU discounts, as required by the program;</li>
        <li>to provide aftercare and warranty support;</li>
        <li>to meet our legal, regulatory and record-keeping obligations;</li>
        <li>to improve our website and services.</li>
      </ul>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <>
        <p>We don&rsquo;t sell your personal information. We may share it only where needed, for example with:</p>
        <ul>
          <li>the Essential Services Commission and other bodies administering the VEU program;</li>
          <li>equipment manufacturers or suppliers, for warranty matters;</li>
          <li>licensed contractors who help us carry out the work;</li>
          <li>service providers that host our website or deliver email on our behalf;</li>
          <li>anyone we are required or authorised by law to disclose it to.</li>
        </ul>
        <p>Some of these providers may store information outside Australia. Where this happens we take reasonable steps to protect it.</p>
      </>
    ),
  },
  {
    title: "Storage and security",
    body: (
      <p>
        We take reasonable steps to protect personal information from misuse, loss and unauthorised access, and we keep it only for as long
        as we need it for the purposes above or as required by law.
      </p>
    ),
  },
  {
    title: "Cookies and analytics",
    body: (
      <p>
        The website may use cookies or similar technologies needed for it to work and to understand how visitors use it. You can control
        cookies through your browser settings.
      </p>
    ),
  },
  {
    title: "Accessing or correcting your information",
    body: <p>You can ask to access or correct the personal information we hold about you by contacting us using the details below.</p>,
  },
  {
    title: "Complaints",
    body: (
      <p>
        If you have a concern about how we have handled your personal information, please contact us first so we can try to resolve it. If
        you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner (oaic.gov.au).
      </p>
    ),
  },
  {
    title: "Contact us",
    body: (
      <p>
        Phone:{" "}
        <a className="font-semibold underline" href={telHref(site.contact.phone)}>
          {site.contact.phone}
        </a>
        <br />
        Email:{" "}
        <a className="font-semibold underline" href={`mailto:${site.contact.email}`}>
          {site.contact.email}
        </a>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      crumb="Privacy Policy"
      intro="How we collect, use and protect your personal information."
      updated="15 November 2026"
      sections={sections}
    />
  );
}
