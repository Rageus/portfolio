export default function LineNumbers({ count = 150 }: { count?: number }) {
  return (
    <div
      aria-hidden
      className="select-none shrink-0 w-12 text-right pr-3 pt-4 text-britty-font text-base font-mono leading-7 opacity-30"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}
