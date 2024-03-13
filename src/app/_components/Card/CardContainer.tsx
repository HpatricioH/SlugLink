import { api } from "~/trpc/server";
import NoLinks from "../NoLinks/NoLinks";
import Card from "./Card";

export default async function CardContainer() {
  const getLinks = await api.link.getLinks.query();

  return (
    <>
      {
        getLinks.length > 0
          ? <div className="linkCard mt-4">
            <Card getLinks={getLinks} />
          </div>
          : <NoLinks />
      }
    </>
  )
}