import Link from 'next/link';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 20px 50px;
`;

const StyledTitle = styled.div`
  > a {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: auto auto;
  gap: 40px;
  justify-content: end;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <StyledTitle>
        <Link href="/">
          <a>
            <h1>BS</h1>
          </a>
        </Link>
      </StyledTitle>
      <StyledNav>
        <Link href="/games">
          <a>
            <h3>Games</h3>
          </a>
        </Link>
        <Link href="/projects">
          <a>
            <h3>Projects</h3>
          </a>
        </Link>
      </StyledNav>
    </StyledHeader>
  );
};
