import { notFound } from "next/navigation";
import { Invitation } from "@/components/Invitation";
import { isLocale } from "@/lib/event";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <Invitation locale={locale} />
    </main>
  );
}
