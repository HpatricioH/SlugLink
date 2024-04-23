import { api } from "~/trpc/server";
import NoLinks from "../NoLinks/NoLinks";
import Card from "./Card";

export default async function CardContainer({ query }: { query: string }) {
  const getLinks = await api.link.getLinks.query();

  const filteredLinks = getLinks.filter((link) => {
    return link.slug.toLowerCase().includes(query.toLowerCase())
  })

  if (filteredLinks.length === 0) {
    return <NoLinks title="No links found!" />
  }

  return (
    <div className='mt-5 linkCard'>
      {filteredLinks.map((link) => {
        return <Card key={link.id} id={link.id} slug={link.slug} description={link.description} />
      })}
    </div>
  )
}