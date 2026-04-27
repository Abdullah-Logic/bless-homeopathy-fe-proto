import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/lib/articlesData";

type ArticlePageProps = {
  params: { slug: string };
};

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#2a3f52]">
      <section className="relative">
        <div className="relative min-h-[min(280px,40vh)] w-full overflow-hidden bg-[#7BB153]">
          <div className="relative z-10 mx-auto flex min-h-[min(280px,40vh)] max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
            <div className="flex max-w-180 flex-col items-center text-white">
              <p className="text-sm font-medium text-white">
                Home {">"} Articles {">"} Detail
              </p>
              <h1 className="mt-4 text-[30px] font-black uppercase leading-[1.08] tracking-[-0.03em] sm:text-[40px] lg:text-[46px]">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-230">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6ba86a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>

          <div className="mt-6 rounded-2xl border border-[#edf1f4] bg-white p-6 shadow-[0_10px_24px_rgba(29,47,77,0.06)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EC4899]">
              {article.tag}
            </p>
            <p className="mt-3 text-[13px] text-[#7a8592]">
              {article.date} • {article.readTime} • {article.author}
            </p>

            <div className="relative mt-6 h-56 overflow-hidden rounded-xl bg-[#eef2f6]">
              <Image
                src={article.imageSrc}
                alt={article.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <div className="mt-7 space-y-4 text-[15px] leading-[1.8] text-[#4f5f6f]">
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
