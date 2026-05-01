import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchWPArticleBySlug } from "@/lib/wpArticles";
import PageHero from "@/components/PageHero";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const WP_BASE_URL = process.env.WP_API_BASE_URL;

export default async function ArticleDetailPage({
  params,
}: ArticlePageProps) {
  if (!WP_BASE_URL) {
    throw new Error("Missing required environment variable: WP_API_BASE_URL");
  }

  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const article = await fetchWPArticleBySlug({
    baseUrl: WP_BASE_URL,
    slug,
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-(--text-body)">
      <PageHero
        breadcrumb="Home > Articles > Detail"
        title={article.title}
        compact
        titleClassName="max-w-180"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-230">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-(--brand-green)"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>

          <div className="mt-6 rounded-2xl border border-(--border-soft-2) bg-white p-6 shadow-[0_10px_24px_rgba(29,47,77,0.06)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--accent-pink)">
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

            <div
              className="mt-7 text-[15px] leading-[1.85] text-[#4f5f6f] [&_h1]:mt-6 [&_h1]:text-[30px] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-[#1e3d52] [&_h2]:mt-6 [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[#1e3d52] [&_h3]:mt-5 [&_h3]:text-[20px] [&_h3]:font-bold [&_h3]:text-[#1e3d52] [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1 [&_blockquote]:mt-5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e5e7eb] [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-(--brand-green) [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
            
          </div>
        </div>
      </section>
    </main>
  );
}
