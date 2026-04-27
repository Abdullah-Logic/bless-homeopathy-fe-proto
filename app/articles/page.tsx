import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/articlesData";

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <section className="relative">
        <div className="relative min-h-[min(280px,40vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(280px,40vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-170 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">Home {">"} Articles</p>
              <h1 className="mt-4 text-[30px] font-black uppercase leading-[1.08] tracking-[-0.03em] sm:text-[40px] lg:text-[46px]">
                Health Articles
              </h1>
              <p className="mx-auto mt-4 max-w-135 text-[16px] font-medium leading-snug">
                Practical guidance inspired by the common questions answered at
                Bless Homeopathy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9F9] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-295">
          <div className="mt-2 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_28px_rgba(32,49,77,0.08)] ring-1 ring-[#edf0f3]"
              >
                <div className="relative h-44 bg-[#eef2f6]">
                  <Image
                    src={article.imageSrc}
                    alt={article.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 380px"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#5a6eb0] shadow-sm">
                    {article.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-[11px] text-[#8994a1]">
                    <span>{article.date}</span>
                    <span className="h-1 w-1 rounded-full bg-[#b9c1ca]" />
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="mt-3 flex-1 text-[22px] font-bold leading-tight tracking-[-0.03em] text-[#1e3d52]">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#6b7783]">
                    {article.description}
                  </p>
                  <div className="mt-6 border-t border-[#edf1f4] pt-4">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#6ba86a]"
                    >
                      Read article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
