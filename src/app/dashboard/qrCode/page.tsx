import { redirect } from "next/navigation";
import { Suspense } from "react";
import QRCardContainer from "~/app/_components/QRCard/QRCardContainer";
import { getServerAuthSession } from "~/server/auth";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  }
}) {
  const query = searchParams?.query ?? ''
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/login')
  }

  return (
    <Suspense fallback={<div className="skeleton-pulse"></div>}>
      <QRCardContainer image={session.user.image} query={query} />
    </Suspense>
  )
}