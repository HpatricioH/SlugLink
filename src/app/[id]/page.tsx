'use server'

import { redirect } from 'next/navigation'
import { api } from '~/trpc/server';

export default async function Page({
  params
}: {
  params: { id: string }
}) {
  const { id } = params
  const getLink = await api.link.getRedirectLink.query({ slug: id });

  if (!getLink) {
    redirect('/')
  }

  redirect(getLink?.url ?? '')
}