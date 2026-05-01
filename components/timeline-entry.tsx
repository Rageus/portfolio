"use client";

export default function TimelineEntry({
  left,
  children,
}: {
  left: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-6">
      <div className="w-36 shrink-0 text-britty-font">
        <p>{left}</p>
      </div>
      <div className="flex-1 min-w-0">
        {children}
        </div>
    </div>
  );
}
