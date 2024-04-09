import { redirect } from "next/navigation";
import NoLinks from "~/app/_components/NoLinks/NoLinks";
import { getServerAuthSession } from "~/server/auth";



export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/')
  }

  return (
    <NoLinks title="No QR Codes created!" />
  )
}