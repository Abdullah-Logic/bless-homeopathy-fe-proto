import PageHero from "@/components/PageHero";

const principles = [
  "Respect every patient with empathy, dignity, confidentiality, and active listening.",
  "Communicate clearly about consultation plans, remedy guidance, expected timelines, and follow-up steps.",
  "Maintain ethical conduct by avoiding misleading claims and prioritizing responsible clinical recommendations.",
  "Protect privacy and handle all patient information with discretion and professional care.",
  "Promote a safe, welcoming environment for children, adults, seniors, and families from all backgrounds.",
  "Address concerns promptly and respectfully, with a focus on constructive resolution.",
];

export default function CodeOfConductPage() {
  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <PageHero
        breadcrumb="Home > Code of Conduct"
        title="Code of Conduct"
        description="Clear standards that guide how we care for patients and support the community."
        compact
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-250">
          <p className="text-[15px] leading-[1.85] text-[#5a6772]">
            This code sets expectations for team behavior across in-clinic care,
            digital communication, and patient follow-up. It reflects our
            commitment to responsible, respectful, and consistent professional
            practice.
          </p>

          <ul className="mt-8 space-y-3">
            {principles.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[#edf1f4] bg-[#f9fbfd] px-4 py-3 text-[14px] leading-[1.7] text-[#4f5f6f]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
