import { api } from "~/trpc/server";
import NoLinks from "../NoLinks/NoLinks";
import Card from "./Card";

const cardsExamples = [
  {
    id: 1,
    slug: "slug1",
    description: "description1",
  },
  {
    id: 2,
    slug: "slug2",
    description: "description2",
  },
  {
    id: 3,
    slug: "slug3",
    description: "description3",
  },
  {
    id: 4,
    slug: "slug4",
    description: "description4",
  },
  {
    id: 5,
    slug: "slug5",
    description: "description5",
  },
  {
    id: 6,
    slug: "slug6",
    description: "description6",
  },
  {
    id: 7,
    slug: "slug7",
    description: "description7",
  },
  {
    id: 8,
    slug: "slug8",
    description: "description8",
  },
  {
    id: 9,
    slug: "slug9",
    description: "description9",
  },
  {
    id: 10,
    slug: "slug10",
    description: "description10",
  },
  {
    id: 11,
    slug: "slug11",
    description: "description11",
  },
  {
    id: 12,
    slug: "slug12",
    description: "description12",
  },
  {
    id: 13,
    slug: "slug13",
    description: "description13",
  },
  {
    id: 14,
    slug: "slug14",
    description: "description14",
  },
  {
    id: 15,
    slug: "slug15",
    description: "description15",
  },
  {
    id: 16,
    slug: "slug16",
    description: "description16",
  },
  {
    id: 17,
    slug: "slug17",
    description: "description17",
  },
  {
    id: 18,
    slug: "slug18",
    description: "description18",
  },
  {
    id: 19,
    slug: "slug19",
    description: "description19",
  },
  {
    id: 20,
    slug: "slug20",
    description: "description20",
  }
]

export default async function CardContainer() {
  const getLinks = await api.link.getLinks.query();

  if (!getLinks) {
    return <NoLinks />
  }

  return (
    <div className='mt-5 linkCard'>
      {getLinks.map((link) => {
        return <Card key={link.id} id={link.id} slug={link.slug} description={link.description} /> 
      })}
    </div>
  )
}