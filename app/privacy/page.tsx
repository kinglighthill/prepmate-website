import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import LegalPage, { LegalSection } from "../components/LegalPage";
import { makeMetadata, webPageJsonLd } from "../seo";

const description =
  "Read the Prepmate Privacy Policy to understand how Veracone Technologies Ltd. collects, uses and protects personal information.";

export const metadata: Metadata = makeMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy",
  keywords: ["Prepmate privacy policy", "Veracone privacy"],
});

const SECTIONS: LegalSection[] = [
  {
    heading: "What & Why",
    body: [
      "The following details are encompassed within our data collection and utilization practices aimed at enhancing, safeguarding, and promoting our Services. Account Details: We gather and relate to your account the facts supplied by you during activities like registration, and setting up dual-factor authentication (like your name, email id, contact number, payment data, and residential address).",
      "Your Data: Upon your choice, we can access your contacts, thus simplifying activities such as sharing and collaborating on Your Data, dispatching messages, and inviting others to avail the Services. In doing so, these contacts will be stored on our servers.",
      "Device Details: Information about the devices used to access the Services, including things like IP addresses, the kind of browser and device, the webpage visited prior to our sites, and identifiers associated with your devices, is also collected by us.",
      "Technology Utilization: We employ technologies like cookies and pixel tags to enhance, safeguard, and promote our Services. Cookies, for example, aid in tasks like memorizing your username for future visits and understanding and improving user interaction with our Services.",
    ],
  },
  {
    heading: "With Whom",
    body: [
      "Information may be disseminated as outlined below, but we guarantee not to sell it to advertisers or any other third parties. Collaborations with Prepmate: We rely on a trusted network of third-party associates (like those offering customer service and IT systems) to support our business strategy, allowing us to improve and enhance our services.",
      "Consent-based sharing: Your data can be shared with other users, or linked with third-party account or platform, but only with your consent or explicit instruction.",
      "Legal obligations & Public Interest: Your information might be released to third parties if deemed necessary to: adhere to prevailing laws and regulations; protect anyone from potential harm or death; prevent fraudulent activities or misuse of Prepmate by its users.",
    ],
  },
  {
    heading: "How",
    body: [
      "Safety Measures: Our team is committed to safeguarding your data and actively seeks out potential threats. We consistently create and implement safety options like two-step verification, secure storage encryption, and notifications for linked apps and new devices.",
      "Personal Preferences: By signing into your Prepmate account and visiting your account settings page, you have the capacity to view, modify, transfer, or erase your personal data.",
      "Data Management: Upon creating an account with us, we preserve your data on our Services as long as your account is active or as long as we deem it needed for serving you. Should you choose to delete your account, we'll commence the deletion process for this information after 30 days.",
    ],
  },
  {
    heading: "Your Control and Access of Your Data",
    body: [
      "You have control over your personal data and how it's collected, used, and shared.",
      "Delete Your Stuff in your Prepmate account.",
      "Change or correct personal data. You can manage your account and the content contained in it, as well as edit some of your personal data, through your account settings page.",
      "Access and take your data elsewhere. You can access your personal data from your Prepmate account and you can download a copy of Your Stuff in a machine-readable format.",
      "Object to the processing of your personal data. Depending on the processing activity, you can request that we stop or limit the processing of your personal data.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If we're involved in a reorganization, merger, acquisition, or sale of our assets, your data may be transferred as part of that deal. We'll notify you (for example, via a message to the email address associated with your account) of any such deal and outline your choices in that event.",
      "We may revise this Privacy Policy from time to time and will post the most current version on our website. If a revision meaningfully reduces your rights, we will notify you.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have questions or concerns about Prepmate, our Services, this privacy policy, and privacy, please contact us at info@veracone.com",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "Prepmate Privacy Policy",
          description,
          path: "/privacy",
        })}
      />
      <LegalPage
        tag="Privacy Policy"
        title="Our Privacy Policy"
        subtitle="Our Privacy Policy outlines how we collect, use, and protect your personal information. Your privacy and security are our priorities."
        updated="Last Updated on October, 24, 2024"
        sections={SECTIONS}
      />
    </>
  );
}
