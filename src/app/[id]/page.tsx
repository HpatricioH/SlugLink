import { permanentRedirect } from 'next/navigation';
import { api } from '~/trpc/server';

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }:PageProps) {
  try {
    const { id } = await params;
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
