import Link from 'next/link';
import { ContentContainer } from '../../components/ContentContainer';

const Games = () => (
  <ContentContainer title="Games">
    <Link href="/games/bombfinder">
      <a>
        <h4>Bomb Finder</h4>
      </a>
    </Link>
  </ContentContainer>
);

export default Games;
