export default function EquityStatementPage() {
  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <section className="relative">
        <div className="relative min-h-[min(280px,40vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(280px,40vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-170 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">
                Home {">"} Equity Statement
              </p>
              <h1 className="mt-4 text-[30px] font-black uppercase leading-[1.08] tracking-[-0.03em] sm:text-[40px] lg:text-[46px]">
                Equity Statement
              </h1>
              <p className="mx-auto mt-4 max-w-135 text-[16px] font-medium leading-snug">
                Inclusive and respectful care is a non-negotiable standard in
                how we serve every patient.
              </p>
            </div>
          </div>
        </div>
      </section>

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
