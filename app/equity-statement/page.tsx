import PageHero from "@/components/PageHero";

export default function EquityStatementPage() {
  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <PageHero
        breadcrumb="Home > Equity Statement"
        title="Equity Statement"
        description="Inclusive and respectful care is a non-negotiable standard in how we serve every patient."
        compact
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-250 space-y-6 text-[15px] leading-[1.85] text-[#5a6772]">
          <p>
            Bless Homeopathy is committed to equitable access, inclusive
            communication, and respectful treatment for all individuals. We aim
            to ensure that every patient receives thoughtful care without bias
            related to age, gender, ethnicity, culture, language, religion,
            disability, or financial background.
          </p>
          <p>
            Our clinic approach prioritizes dignity, fairness, and practical
            support. We continually review how we communicate, schedule, and
            deliver care so barriers can be reduced and patient trust can be
            strengthened.
          </p>
          <p>
            We welcome feedback that helps us improve equity in patient
            experience and service delivery. If you have concerns about access
            or inclusivity, please contact us directly so we can address them
            constructively.
          </p>
        </div>
      </section>
    </main>
  );
}
