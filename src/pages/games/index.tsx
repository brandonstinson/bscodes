import Link from 'next/link';
import { ContentContainer } from 'components/ContentContainer';

const Games = () => (
  <ContentContainer title="Games">
    <Link href="/games/bombfinder">
      <a>
        <span className="text-2xl">Bomb Finder</span>
      </a>
    </Link>
  </ContentContainer>
);

export default Games;
