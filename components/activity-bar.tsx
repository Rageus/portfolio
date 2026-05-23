import { Files, Search, GitBranch, Puzzle, Settings } from 'lucide-react';

export default function ActivityBar() {
  return (
    <div className="flex flex-col items-center w-12 shrink-0 bg-files border-r border-white/5 py-1">
      <div className="flex flex-col items-center flex-1">
        <div className="p-2.5 text-britty-highlight w-full flex justify-center border-l-2 border-botbar">
          <Files size={22} />
        </div>
        <div className="p-2.5 text-britty-font opacity-40 w-full flex justify-center hover:opacity-70 transition-opacity cursor-pointer">
          <Search size={22} />
        </div>
        <div className="p-2.5 text-britty-font opacity-40 w-full flex justify-center hover:opacity-70 transition-opacity cursor-pointer">
          <GitBranch size={22} />
        </div>
        <div className="p-2.5 text-britty-font opacity-40 w-full flex justify-center hover:opacity-70 transition-opacity cursor-pointer">
          <Puzzle size={22} />
        </div>
      </div>
    </div>
  );
}
