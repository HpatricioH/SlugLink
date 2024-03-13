import CopySvg from "~/utils/CopySvg";
import DeleteSvg from "~/utils/DeleteSvg";
import EditSvg from "~/utils/EditSvg";

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

interface Link {
  id: number;
  url: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  creatorId: string;
}

interface CardProps {
  getLinks: Link[];
}

export default function Card({ getLinks }: CardProps) {
  return (
    <>
      {getLinks?.map((link) => (
        <section key={link.id} className="inline-block space-y-2 border border-white/10 bg-dark-midnight rounded-md z-10 relative px-4 py-2 w-full">
          <p>{`https://sluglink.com/${link.slug}`}</p>
          <div className="flex justify-between">
            <p className="text-sm font-thin">{link.description}</p>
          </div>
          <div className="flex gap-3 items-end justify-end *:fill-white *:w-5 *:h-5 *:cursor-pointer">
            <CopySvg className="hover:fill-dark-violet"/>
            <EditSvg className="hover:fill-dark-violet"/>
            <DeleteSvg className="hover:fill-dark-violet"/>
          </div>
        </section>
      ))}
    </>
  )
}