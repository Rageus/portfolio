import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  setRequestLocale(locale)
  const MDXPage = (await import(`./page-${locale}.mdx`)).default;

  return <MDXPage/>
}