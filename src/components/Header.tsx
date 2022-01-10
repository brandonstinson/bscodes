import Link from 'next/link';

export const Header = () => {
  return (
    <header className="grid grid-cols-[auto_1fr] items-center p-8">
      <Link href="/">
        <a>
          <h1 className="text-blue text-4xl">BS</h1>
        </a>
      </Link>
      <nav className="flex justify-end gap-10">
        <Link href="/games">
          <a>
            <span className="text-2xl">Games</span>
          </a>
        </Link>
        <Link href="/projects">
          <a>
            <span className="text-2xl">Projects</span>
          </a>
        </Link>
      </nav>
    </header>
  );
};
