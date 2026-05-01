type PageHeroProps = {
  breadcrumb: string;
  title: string;
  description?: string;
  compact?: boolean;
  titleClassName?: string;
};

export default function PageHero({
  breadcrumb,
  title,
  description,
  compact = false,
  titleClassName,
}: PageHeroProps) {
  const minHeight = compact ? "min-h-[min(280px,40vh)]" : "min-h-[min(320px,46vh)]";

  return (
    <section className="relative">
      <div className={`relative w-full overflow-hidden bg-(--brand-green) ${minHeight}`}>
        <div
          className={`relative z-10 mx-auto flex max-w-325 items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8 ${minHeight}`}
        >
          <div className="flex max-w-170 flex-col items-center text-white">
            <p className="text-sm font-medium text-white">{breadcrumb}</p>
            <h1
              className={`mt-4 font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-[42px] lg:text-[50px] ${
                compact ? "text-[30px] sm:text-[40px] lg:text-[46px]" : "text-[32px]"
              } ${titleClassName ?? ""}`}
            >
              {title}
            </h1>
            {description ? (
              <p
                className={`mx-auto mt-5 max-w-120 leading-snug ${
                  compact ? "text-[16px] font-medium max-w-135 mt-4" : "text-[18px] font-semibold"
                }`}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
