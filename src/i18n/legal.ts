/**
 * Privacy Policy & Terms text (English source). ⚠ Draft wording – legal review recommended before public launch.
 * Placeholders: {legalName} {acn} {abn} {name}; "{privacyLink}" renders a link; "{contactLines}" renders phone/email.
 */
export interface LegalSectionData {
  title: string;
  p?: string[];
  list?: string[];
  after?: string[];
}

export const legalEn = {
  privacy: {
    title: "Privacy Policy",
    intro: "How we collect, use, share and protect your personal information.",
    sections: [
      {
        title: "Who we are",
        p: [
          "This website is operated by {legalName} (ACN {acn}, ABN {abn}), trading as {name} (“we”, “us”, “our”). We are committed to handling personal information in line with the Australian Privacy Principles in the Privacy Act 1988 (Cth).",
        ],
      },
      {
        title: "Information we collect",
        p: ["We only collect information we need to respond to your enquiry and provide our services, such as:"],
        list: [
          "your name, phone number and email address;",
          "the property address, suburb and postcode;",
          "details about your home and existing heating or cooling system, including photos, videos or files you choose to send us;",
          "information needed to assess eligibility for the Victorian Energy Upgrades (VEU) program;",
          "basic technical information recorded by our website host and spam check when you visit (for example, IP address and browser type).",
        ],
        after: ["We don’t ask for sensitive information. Please avoid including people, or documents such as ID, in the photos you send us."],
      },
      {
        title: "How we collect it",
        p: [
          "We collect information directly from you – through the forms on this website, by phone, by email or in person. Where relevant, we may also receive information about your job from our VEU Accredited Provider partner or from equipment suppliers.",
        ],
      },
      {
        title: "How we use your information",
        list: [
          "to reply to enquiries, prepare quotes and arrange site assessments and installations;",
          "to check VEU eligibility and arrange your VEU discount with our Accredited Provider partner;",
          "to provide aftercare and warranty support;",
          "to meet our legal, regulatory and record-keeping obligations;",
          "to improve our website and services.",
        ],
      },
      {
        title: "VEU and our Accredited Provider partner",
        p: [
          "We are not a VEU Accredited Provider. VEU discounts are provided through our VEU Accredited Provider partner. If you go ahead with a VEU upgrade, we give your name, contact details, property address, photos and details of your existing and new equipment to that partner so they can assess eligibility, complete the VEU assignment form, create and claim Victorian Energy Efficiency Certificates and meet program audit requirements.",
          "Our partner handles your information under its own privacy policy and may contact you to confirm the work. Taking part in the VEU program is voluntary. We do not work for the Victorian Government or the Essential Services Commission.",
        ],
      },
      {
        title: "Who else we share it with",
        p: ["We don’t sell your personal information. We share it only where needed, for example with:"],
        list: [
          "the Essential Services Commission and other bodies administering the VEU program (usually through our Accredited Provider partner);",
          "equipment manufacturers or suppliers, for warranty matters;",
          "licensed contractors who help us carry out the work;",
          "service providers that host our website or deliver email for us;",
          "anyone we are required or authorised by law to disclose it to.",
        ],
      },
      {
        title: "Overseas storage",
        p: [
          "Our website runs on Cloudflare, Inc. (United States, with a global network), including its Turnstile spam check. Form submissions are sent by email through Resend (United States) to our Microsoft 365 mailbox, which Microsoft may store in Australia or other countries. These providers may therefore hold your information in the United States or other countries. We use them under their standard terms and take reasonable steps to protect your information.",
        ],
      },
      {
        title: "Storage, security and retention",
        p: [
          "We take reasonable steps to protect personal information from misuse, interference, loss and unauthorised access. No method of sending information over the internet is completely secure.",
          "Enquiries and attachments arrive by email and are kept in our business mailbox; our email delivery provider keeps short-term delivery logs. If no work goes ahead, we delete enquiry emails and attachments within 24 months. Job and VEU records are kept for as long as the law and program rules require (generally up to 7 years).",
        ],
      },
      {
        title: "Cookies",
        p: [
          "We don’t use analytics or advertising cookies. Cloudflare Turnstile may use cookies or similar technology to check that form submissions are not spam, and our host keeps standard technical logs for security. You can control cookies through your browser settings, but the forms may not work without them.",
        ],
      },
      {
        title: "Marketing",
        p: ["We only send marketing messages with your consent, and you can opt out at any time by replying or contacting us."],
      },
      {
        title: "Automated decisions",
        p: ["We don’t use automated decision-making. The online eligibility check helps us understand your situation; eligibility is assessed by people."],
      },
      {
        title: "Accessing or correcting your information",
        p: ["You can ask to access or correct the personal information we hold about you by contacting us using the details below. We aim to respond within 30 days."],
      },
      {
        title: "Data breaches",
        p: ["If a data breach is likely to cause you serious harm, we will notify you and, where required, the Office of the Australian Information Commissioner."],
      },
      {
        title: "Complaints",
        p: [
          "If you have a concern about how we have handled your personal information, please contact us first. We aim to respond within 30 days. If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner (oaic.gov.au).",
        ],
      },
      {
        title: "Links to other websites",
        p: ["Our website links to other websites, such as the Victorian Government’s VEU website. We are not responsible for their privacy practices."],
      },
      {
        title: "Changes to this policy",
        p: ["We may update this policy from time to time. The current version is always published on this page with its “last updated” date."],
      },
      { title: "Contact us", p: ["{contactLines}"] },
    ] as LegalSectionData[],
  },
  terms: {
    title: "Terms and Conditions",
    intro: "Terms for using our website and making an enquiry.",
    sections: [
      {
        title: "About these terms",
        p: [
          "These terms apply to your use of this website, operated by {legalName} (ACN {acn}, ABN {abn}), trading as {name}. Separate written terms will apply to any quote you accept or work we carry out.",
        ],
      },
      {
        title: "Website information",
        p: [
          "Information on this website is general in nature and provided to help you understand our services. Images may be illustrative. While we aim to keep content accurate and up to date, it may change without notice and does not form an offer or a quote.",
        ],
      },
      {
        title: "Enquiries and quotes",
        list: [
          "Submitting an enquiry does not create a contract or guarantee availability, pricing or a booking.",
          "Quotes are based on the information provided and may change after a site assessment.",
          "Work proceeds only once you accept a written quote.",
        ],
      },
      {
        title: "VEU discounts",
        p: [
          "Victorian Energy Upgrades (VEU) discounts are provided by our VEU Accredited Provider partner, not by {name}. They are subject to the program’s eligibility rules and assessment. Completing the online eligibility check or submitting an enquiry does not guarantee a discount. Where the upgrade replaces gas ducted heating, the existing gas heater must be disconnected as part of the work.",
        ],
      },
      {
        title: "Warranties and your consumer rights",
        p: [
          "Equipment is covered by the manufacturer’s warranty. Any installation warranty we offer will be set out in your written quote. Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy under the Australian Consumer Law that cannot lawfully be excluded.",
        ],
      },
      {
        title: "Intellectual property",
        p: [
          "Website content and design belong to us or our licensors and may not be copied without our permission. Brand names and logos shown are trademarks of their respective owners and are used to indicate the brands we install.",
        ],
      },
      {
        title: "Links to other websites",
        p: ["We may link to external websites, such as the Victorian Government’s VEU website. We are not responsible for their content."],
      },
      {
        title: "Limitation of liability",
        p: [
          "To the extent permitted by law, we are not liable for loss arising from your use of this website or reliance on its general information. This does not exclude, restrict or modify any right or remedy you have under the Australian Consumer Law.",
        ],
      },
      { title: "Privacy", p: ["We handle personal information as described in our {privacyLink}."] },
      {
        title: "Resolving disputes",
        p: [
          "If you have a problem, please contact us first so we can try to resolve it. If we can’t resolve it within 21 days, either of us may suggest mediation in Melbourne before going to court. This does not affect your right to contact Consumer Affairs Victoria or to rely on the Australian Consumer Law.",
        ],
      },
      {
        title: "If part of these terms is invalid",
        p: ["If any part of these terms is found to be invalid or unenforceable, the rest of the terms continue to apply."],
      },
      {
        title: "Governing law and changes",
        p: ["These terms are governed by the laws of Victoria, Australia. We may update them from time to time by publishing a new version here."],
      },
    ] as LegalSectionData[],
  },
  /** Shown on translated versions only. */
  translationNote: "",
};

export type Legal = typeof legalEn;
