import { permanentRedirect } from 'next/navigation';
import { api } from '~/trpc/server';

export default async function Page({
  params
}: {
  params: { id: string }
}) {
  try {
    const { id } = params;
    const getLink = await api.link.getRedirectLink.query({ slug: id });

    if (!getLink?.url) {
      permanentRedirect('/');
    }

    permanentRedirect(getLink?.url ?? '');
  } catch (error) {
    if ((error as Error).message === 'UNAUTHORIZED') {
      permanentRedirect('/login');
    }
  }
}
