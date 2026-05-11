const SectionWrapper = (Component, idName) => {
  function WrappedSection() {
    return (
      <section
        id={idName}
        className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <Component />
      </section>
    );
  }

  return WrappedSection;
};

export default SectionWrapper;
