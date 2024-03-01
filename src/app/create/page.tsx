import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex calcHeight flex-col items-center pt-20 pb-20 transition-all duration-100 bg-dark-midnight text-white">
      <p>Create Link Page</p>
    </div>
  )
}