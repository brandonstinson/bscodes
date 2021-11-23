import styled from 'styled-components';
import { ContentContainer } from '../../components/ContentContainer';
import { Instructions } from '../../games/bombfinder/Instructions';
import { Main } from '../../games/bombfinder/Main';

const StyledContainer = styled.div`
  display: grid;
  gap: 25px;
`;

const Bombfinder: React.FC = () => (
  <ContentContainer title="Bomb Finder">
    <StyledContainer>
      <Instructions />
      <Main />
    </StyledContainer>
  </ContentContainer>
);

export default Bombfinder;
