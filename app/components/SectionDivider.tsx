export default function SectionDivider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.1) 15%, rgba(139,92,246,0.3) 40%, rgba(139,92,246,0.4) 50%, rgba(139,92,246,0.3) 60%, rgba(59,130,246,0.1) 85%, transparent 100%)",
      }}
    />
  );
}
