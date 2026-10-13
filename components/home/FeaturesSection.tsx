const features = [
  {
    number: "01",
    title: "Learn at your pace",
    description:
      "Study whenever it suits you and return to lessons whenever you need.",
  },
  {
    number: "02",
    title: "Practical knowledge",
    description:
      "Focus on useful skills and concepts you can apply to real projects.",
  },
  {
    number: "03",
    title: "Track your progress",
    description:
      "Keep track of completed lessons and continue where you left off.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Why LearnHub
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Learning designed around you
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Build your skills with a clear learning path, practical lessons, and
            progress you can follow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
            >
              <span className="text-sm font-bold tracking-widest text-indigo-600">
                {feature.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
