import JsonLd from "./JsonLd";
import { faqJsonLd } from "../seo";
import seo from "./SeoContent.module.css";

export const JAMB_INTRO_PARAGRAPHS = [
  "The Unified Tertiary Matriculation Examination (UTME), conducted by the Joint Admissions and Matriculation Board (JAMB), is the gateway exam for admission into Nigerian universities, polytechnics and colleges of education. Because it is fully computer based (CBT) and objective, the fastest way to prepare is to practise real JAMB past questions under the same conditions you'll meet in the exam hall.",
  "Prepmate brings JAMB past questions, study notes, the recommended novel and the full syllabus together in one app so you can practise anytime, online or completely offline. Instead of juggling booklets and printouts, you get a timed, exam-realistic CBT experience on your phone, tablet or computer, with correct answers and explanations so you learn from every question you attempt.",
  "You can rehearse full UTME papers under timed conditions, review detailed result breakdowns to find your weak topics, and study the JAMB syllabus and recommended novel for each subject, all in the same place, so you walk into the exam ready to score.",
];

export const JAMB_SUBJECTS = [
  "English Language",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Economics",
  "Government",
  "Literature-in-English",
  "Commerce",
  "Financial Accounting",
  "Geography",
  "Agricultural Science",
];

export const JAMB_FAQS = [
  {
    q: "Are the JAMB past questions on Prepmate up to date?",
    a: "Yes. Prepmate's JAMB (UTME) past questions and answers are regularly updated to stay in line with the current JAMB syllabus and the way JAMB sets its CBT papers, so you practise with relevant, exam-realistic questions.",
  },
  {
    q: "Can I practise JAMB CBT offline?",
    a: "Yes. Once your JAMB content is downloaded, you can practise past questions, take mock CBT exams and read study notes offline, with no internet connection required, which is ideal for uninterrupted revision.",
  },
  {
    q: "Do the JAMB past questions come with answers and explanations?",
    a: "Every JAMB past question on Prepmate comes with the correct answer, and many include explanations so you understand why an answer is right rather than just memorising it.",
  },
  {
    q: "Which JAMB subjects are covered?",
    a: "Prepmate covers the core UTME subjects including English Language, Mathematics, the sciences (Biology, Chemistry, Physics), commercial and social science subjects, plus the JAMB recommended novel and syllabus for each.",
  },
  {
    q: "Does Prepmate simulate the real JAMB CBT exam?",
    a: "Yes. Prepmate includes a CBT practice mode with a timer, so you can rehearse full UTME papers under conditions similar to the actual JAMB exam.",
  },
  {
    q: "Is Prepmate free to use for JAMB preparation?",
    a: "Prepmate is free to download and start practising JAMB past questions. Some premium content may require activation, but core practice features are available to every student.",
  },
];

export default function JambSeoContent() {
  return (
    <>
      <JsonLd data={faqJsonLd(JAMB_FAQS)} />

      <section className={seo.prose} aria-labelledby="jamb-about">
        <h2 id="jamb-about" className="h2" style={{ textAlign: "left" }}>
          Prepare for JAMB UTME with real past questions
        </h2>
        {JAMB_INTRO_PARAGRAPHS.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <h3>JAMB subjects you can practise on Prepmate</h3>
        <p>
          Prepmate covers JAMB past questions and answers across the core UTME
          subjects, including:
        </p>
        <ul className={seo.subjectList}>
          {JAMB_SUBJECTS.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
        <p>
          Each subject includes past questions with answers, concise study notes
          and the relevant syllabus, plus the recommended literature novel where
          applicable, so you can revise the exact material JAMB examines.
        </p>
      </section>

      <section className={seo.faq} aria-labelledby="jamb-faq">
        <h2 id="jamb-faq" className="h2">
          JAMB / UTME Frequently Asked Questions
        </h2>
        <div className={seo.faqList}>
          {JAMB_FAQS.map((faq) => (
            <details key={faq.q} className={seo.faqItem}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
