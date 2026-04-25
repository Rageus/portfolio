
export default function KeywordTags({
  keywords,
  className = "",
}: {
  keywords: string[];
  className?: string;
}) {

const TAG_STYLE =
  "bg-emerald-500/20 text-emerald-50 ring-1 ring-inset ring-emerald-300/40"

  return (
    <ul
      className={`not-prose my-2 flex list-none flex-wrap gap-2 p-0 ${className}`}
      role="list"
    >
      {keywords
        .map((raw) => raw.trim())
        .filter(Boolean)
        .map((label, i) => {
          return (
            <li key={`${label}-${i}`}>
              <span
                className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium tracking-wide ${TAG_STYLE}`}
              >
                {label}
              </span>
            </li>
          );
        })}
    </ul>
  );
}
