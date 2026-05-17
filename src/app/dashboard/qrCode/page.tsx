import { redirect } from "next/navigation";
import { Suspense } from "react";
import QRCardContainer from "~/app/_components/QRCard/QRCardContainer";
import { getServerAuthSession } from "~/server/auth";
import type { PageProps } from "../page";
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: PageProps) {
  const query = await searchParams
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/login')
  }

  return (
    <Suspense fallback={<div className="skeleton-pulse"></div>}>
      <QRCardContainer image={session.user.image} query={query.query} />
    </Suspense>
  )
}