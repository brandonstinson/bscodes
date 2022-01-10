import { ContentContainer } from 'components/ContentContainer';
import { Instructions } from 'components/bombfinder/Instructions';
import { Main } from 'components/bombfinder/Main';

const Bombfinder: React.FC = () => (
  <ContentContainer title="Bomb Finder">
    <div className="grid gap-6">
      <Instructions />
      <Main />
    </div>
  </ContentContainer>
);

export default Bombfinder;
