import { redirect } from "next/navigation";
import QRCardContainer from "~/app/_components/QRCard/QRCardContainer";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <QRCardContainer image={session.user.image} />
    </div>
  )
}