export default function HeroVial() {
  return (
    <div className="relative mx-auto mt-16 h-[420px] w-[280px]">
      <div className="absolute inset-x-0 top-0 mx-auto h-24 w-28 rounded-t-[2rem] border border-white/20 bg-neutral-900 shadow-2xl">
        <div className="mx-auto mt-4 h-3 w-16 rounded-full bg-white/20" />
      </div>

      <div className="absolute inset-x-0 top-20 mx-auto h-[310px] w-[210px] overflow-hidden rounded-[4rem] border border-white/20 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-4 rounded-[3.2rem] border border-white/10" />

        <div className="absolute bottom-0 h-[58%] w-full bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-700 opacity-90">
          <div className="absolute -top-6 left-0 h-12 w-full rounded-[50%] bg-cyan-200/80 blur-sm" />
        </div>

        <div className="absolute left-10 top-8 h-64 w-8 rounded-full bg-white/25 blur-xl" />
        <div className="absolute right-8 top-20 h-40 w-4 rounded-full bg-white/10 blur-md" />

        <div className="absolute bottom-16 left-10 h-3 w-3 rounded-full bg-white/70" />
        <div className="absolute bottom-28 right-12 h-2 w-2 rounded-full bg-white/60" />
        <div className="absolute bottom-36 left-20 h-1.5 w-1.5 rounded-full bg-white/50" />
      </div>

      <div className="absolute bottom-[-40px] left-1/2 h-16 w-56 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
    </div>
  );
}
