import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import CardContainer from "../_components/Card/CardContainer";
import { Suspense } from "react";

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
      <CardContainer query={query} />
    </Suspense>
  )
}