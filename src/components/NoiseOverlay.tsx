export const NoiseOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-screen w-screen opacity-[0.03]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20" />
    </div>
  );
};