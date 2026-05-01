import PageHero from "@/components/PageHero";

const privacySections = [
  {
    title: "Information We Collect",
    points: [
      "We collect basic contact details such as name, phone number, and email when you request an appointment or submit a treatment inquiry.",
      "We may receive health-related notes that you voluntarily share to help us prepare for a consultation.",
      "Website analytics data may be collected in aggregate form to improve user experience and site performance.",
    ],
  },
  {
    title: "How Information Is Used",
    points: [
      "To schedule consultations, respond to questions, and provide service follow-up communication.",
      "To improve care quality, internal processes, and the clarity of information presented on our website.",
      "To send service-related updates only when relevant to your clinic interaction.",
    ],
  },
  {
    title: "Data Protection and Sharing",
    points: [
      "We do not sell personal information to third parties.",
      "Access to submitted information is limited to team members who need it to support clinic services.",
      "Reasonable administrative and technical safeguards are used to protect personal data against unauthorized access.",
    ],
  },
  {
    title: "Your Choices",
    points: [
      "You may request correction or removal of submitted personal details by contacting us directly.",
      "If you prefer not to share personal details online, you may call the clinic directly to discuss appointments.",
      "For privacy-related requests, email info@blesshomeopathy.com.",
    ],
  },
];

export default function PrivacyStatementPage() {
  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <PageHero
        breadcrumb="Home > Privacy Statement"
        title="Privacy Statement"
        description="We value trust and transparency in how your personal information is handled."
        compact
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-250">
          <p className="text-[15px] leading-[1.85] text-[#5a6772]">
            At Bless Homeopathy, privacy is treated as an important part of
            patient care. This statement explains what information may be
            collected through our website and communications, how it is used,
            and how we protect it in day-to-day operations.
          </p>

          <div className="mt-9 space-y-5">
            {privacySections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-[#edf1f4] bg-[#f9fbfd] p-5 shadow-[0_8px_20px_rgba(18,41,72,0.05)]"
              >
                <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#1E4A8A]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-2">
                  {section.points.map((point) => (
                    <p
                      key={point}
                      className="text-[14px] leading-[1.75] text-[#4f5f6f]"
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
