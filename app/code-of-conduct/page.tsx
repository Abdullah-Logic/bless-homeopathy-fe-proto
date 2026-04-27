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
      <section className="relative">
        <div className="relative min-h-[min(280px,40vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(280px,40vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-170 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">
                Home {">"} Code of Conduct
              </p>
              <h1 className="mt-4 text-[30px] font-black uppercase leading-[1.08] tracking-[-0.03em] sm:text-[40px] lg:text-[46px]">
                Code of Conduct
              </h1>
              <p className="mx-auto mt-4 max-w-135 text-[16px] font-medium leading-snug">
                Clear standards that guide how we care for patients and support
                the community.
              </p>
            </div>
          </div>
        </div>
      </section>

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
