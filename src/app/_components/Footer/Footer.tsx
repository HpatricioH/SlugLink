import GithubSvg from "~/ui/svgs/GithubSvg";


export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full text-gray-500 z-50 bg-dark-midnight/50 h-14 pt-4 backdrop-blur">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-1">
          <div className="flex justify-center items-center space-x-1">
            <a href="https://github.com/HpatricioH/SlugLink" rel="noreferrer" target="_blank">
              <GithubSvg className="h-6 w-6 fill-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}