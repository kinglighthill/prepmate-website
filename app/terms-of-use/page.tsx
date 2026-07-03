import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import LegalPage, { LegalSection } from "../components/LegalPage";
import { makeMetadata, webPageJsonLd } from "../seo";

const description =
  "Read the Prepmate Terms of Use for Veracone Technologies Ltd. products, services, accounts, intellectual property and user responsibilities.";

export const metadata: Metadata = makeMetadata({
  title: "Terms Of Use",
  description,
  path: "/terms-of-use",
  keywords: ["Prepmate terms of use", "Veracone terms"],
});

const SECTIONS: LegalSection[] = [
  {
    heading: "Purpose of Veracone",
    body: [
      "Veracone is a tech entity that develops applications and software tailored to students, associates, and commercial enterprises with the intent of promoting efficient learning, increasing income, and optimizing their respective businesses. Veracone, however, doesn't ensure enrolment for learners or a specific grade subsequent to utilizing the application.",
    ],
  },
  {
    heading: "Entities in Veracone",
    body: [
      "Veracone has the following three entities:",
      "1. Veracone: Company and Vendor.",
      "2. Customers: the business's end users or primary consumer.",
      "3. Affiliates: act as middlemen to the Customers.",
    ],
  },
  {
    heading: "Accounts",
    body: [
      "Account Setup: While users are not obligated to set up an account (\"Account\") on our apps and platforms (\"Platforms\"), doing so will provide access to exclusive features on our site. After enrolling for an account, users must supply specific information about themselves. After signing into the site, you can view this information at any time by selecting 'My Account' from 'the Site'.",
      "Device Connection: To utilize our services, a payment may apply to activate your device. Activation is unique to each device and is not transferable due to account constraints.",
    ],
  },
  {
    heading: "Terms and Termination",
    body: [
      "These Conditions continue to be fully applicable as long as the Site is in use. The rights pertaining to your utilization of the Site (including your Account) might be put on hold or annulled anytime due to any reason or our exclusive discretion, particularly for any non-compliance with these Conditions.",
    ],
  },
  {
    heading: "Affiliate Relationship with Veracone",
    body: [
      "Upon signing up as an Affiliate, you consent to adhere to every term of this contract. Failing to accept the terms of this contract disqualifies your eligibility to sign up as an Affiliate, thus preventing you from conducting business on Veracone. Affiliates are required to remit a non-refundable fee of #10,000.",
    ],
  },
  {
    heading: "Modification",
    body: [
      "\"Veracone\" reserves the right to change or revise the terms at any time by posting any changes or a revised version on our website and application. We will alert you that changes or revisions have been made by indicating on the top of our Terms the date it was last revised or updated.",
    ],
  },
  {
    heading: "Disclaimer of Warranties",
    body: [
      "Your use of our website and application service is at your sole risk. Our website, application, and/or service are offered on an \"as is\" and \"as available\" basis. \"Veracone\" expressly disclaims all warranties of any kind, whether express or implied.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "Both parties agree that all intellectual property rights and database rights, whether registered or unregistered, in the Site, information content on the Site and all the website design, including, but not limited to, text, graphics, software, photos, video, music, sound, and their selection and arrangement, are the exclusive property of Veracone or its licensors.",
    ],
  },
  {
    heading: "Limitation on Liability",
    body: [
      "Veracone shall not be liable for customers attempting to use the app for examination malpractice. To the maximum extent permitted by law, in no event shall company (or our suppliers) be liable to you or any third party for any lost profits, lost data, or indirect, special, incidental or consequential damages arising from or relating to this agreement.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have questions or concerns about Prepmate, our Services, this privacy policy, and privacy, please contact us at info@veracone.com",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "Prepmate Terms Of Use",
          description,
          path: "/terms-of-use",
        })}
      />
      <LegalPage
        tag="Terms"
        title="Terms Of Use"
        subtitle="Welcome to the Prepmate Africa website. These terms outline the rules and regulations for the use of Prepmate's services."
        updated="Last Updated on October, 24, 2024"
        sections={SECTIONS}
      />
    </>
  );
}
