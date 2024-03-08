import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import CreateLink from "../_components/CreateLink/CreateLink";

export default async function Page() {
  const session = await getServerAuthSession();
  
  if (!session) {
    redirect('/')
  }

  return (
    <section className="calcHeight transition-all duration-100 bg-dark-midnight text-white">
      <div className="flex flex-col gap-5 container m-auto px-4 py-10">
        <h1 className="text-2xl font-bold tracking-wide">Create a Link</h1>
        <hr />
        <CreateLink/>
      </div>
    </section>
  )
}