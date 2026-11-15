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
    intro: "How we collect, use and protect your personal information.",
    sections: [
      {
        title: "Who we are",
        p: [
          "This website is operated by {legalName} (ACN {acn}, ABN {abn}), trading as {name} (“we”, “us”, “our”). We handle personal information in line with the Australian Privacy Principles in the Privacy Act 1988 (Cth), where they apply to us.",
        ],
      },
      {
        title: "Information we collect",
        p: ["We only collect information we need to respond to your enquiry and provide our services, such as:"],
        list: [
          "your name, phone number and email address;",
          "the property address, suburb and postcode;",
          "details about your home and existing heating or cooling system, including photos, videos or files you choose to send us;",
          "information needed to assess eligibility for programs such as Victorian Energy Upgrades (VEU);",
          "basic technical information when you visit the website (for example, browser type and pages visited).",
        ],
      },
      {
        title: "How we use your information",
        list: [
          "to reply to enquiries, prepare quotes and arrange site assessments and installations;",
          "to assess and process VEU discounts, as required by the program;",
          "to provide aftercare and warranty support;",
          "to meet our legal, regulatory and record-keeping obligations;",
          "to improve our website and services.",
        ],
      },
      {
        title: "Who we share it with",
        p: ["We don’t sell your personal information. We may share it only where needed, for example with:"],
        list: [
          "the Essential Services Commission and other bodies administering the VEU program;",
          "equipment manufacturers or suppliers, for warranty matters;",
          "licensed contractors who help us carry out the work;",
          "service providers that host our website or deliver email on our behalf;",
          "anyone we are required or authorised by law to disclose it to.",
        ],
        after: ["Some of these providers may store information outside Australia. Where this happens we take reasonable steps to protect it."],
      },
      {
        title: "Storage and security",
        p: [
          "We take reasonable steps to protect personal information from misuse, loss and unauthorised access, and we keep it only for as long as we need it for the purposes above or as required by law.",
        ],
      },
      {
        title: "Cookies and analytics",
        p: [
          "The website may use cookies or similar technologies needed for it to work, including a security check that protects our forms from spam, and to understand how visitors use it. You can control cookies through your browser settings.",
        ],
      },
      {
        title: "Accessing or correcting your information",
        p: ["You can ask to access or correct the personal information we hold about you by contacting us using the details below."],
      },
      {
        title: "Complaints",
        p: [
          "If you have a concern about how we have handled your personal information, please contact us first so we can try to resolve it. If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner (oaic.gov.au).",
        ],
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
          "These terms apply to your use of this website, operated by {legalName} (ACN {acn}, ABN {abn}), trading as {name}. By using the website you agree to these terms. Separate written terms will apply to any quote you accept or work we carry out.",
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
          "Victorian Energy Upgrades (VEU) discounts are subject to the program’s eligibility rules and assessment. Completing the online eligibility check or submitting an enquiry does not guarantee a discount. Where the upgrade replaces gas ducted heating, the existing gas heater must be disconnected as part of the work.",
        ],
      },
      {
        title: "Warranties",
        p: [
          "Equipment is covered by the manufacturer’s warranty. Any installation warranty we offer will be set out in your written quote. Nothing in these terms excludes rights you have under the Australian Consumer Law.",
        ],
      },
      {
        title: "Intellectual property",
        p: [
          "Website content and design belong to us or our licensors. Brand names and logos shown are trademarks of their respective owners and are used to indicate the brands we install.",
        ],
      },
      {
        title: "Links to other websites",
        p: ["We may link to external websites, such as the Victorian Government’s VEU website. We are not responsible for their content."],
      },
      {
        title: "Limitation of liability",
        p: [
          "To the extent permitted by law, we are not liable for loss arising from your use of this website or reliance on its general information. This does not limit any rights you have under the Australian Consumer Law.",
        ],
      },
      { title: "Privacy", p: ["We handle personal information as described in our {privacyLink}."] },
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
