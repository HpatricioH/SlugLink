import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import CardContainer from "../_components/Card/CardContainer";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export type PageProps = {
  searchParams: Promise<{
    query?: string 
  }>
}

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
      <CardContainer query={query.query} />
    </Suspense>
  )
}