import PageHero from "@/components/PageHero";

const missionPillars = [
  {
    title: "Root-Cause Focused Care",
    text: "We aim to understand each patient as a whole person and design plans that address underlying causes rather than short-term symptom suppression.",
  },
  {
    title: "Personalized Treatment Planning",
    text: "Every consultation is tailored around individual history, lifestyle, and healing goals so care remains specific, practical, and patient-centered.",
  },
  {
    title: "Safe and Compassionate Practice",
    text: "We provide a respectful environment where patients and families can feel heard, supported, and guided with clarity.",
  },
  {
    title: "Long-Term Wellness Support",
    text: "Our mission extends beyond appointments by helping patients build sustainable habits and confidence in natural healthcare choices.",
  },
];

export default function MissionStatementPage() {
  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <PageHero
        breadcrumb="Home > Mission Statement"
        title="Mission Statement"
        description="Our commitment is to deliver holistic care with integrity, empathy, and clinical responsibility."
        compact
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-250">
          <p className="text-[15px] leading-[1.85] text-[#5a6772]">
            Bless Homeopathy is built on the belief that quality care starts
            with listening. Our mission is to provide reliable homeopathic
            guidance that supports healing, strengthens overall well-being, and
            respects each patient&apos;s unique health journey.
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {missionPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-[#edf1f4] bg-white p-5 shadow-[0_8px_20px_rgba(18,41,72,0.05)]"
              >
                <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[#1E4A8A]">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.75] text-[#4f5f6f]">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
