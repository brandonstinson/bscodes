import Link from 'next/link';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding: 20px 50px;
  font-weight: bold;
`;

const StyledTitle = styled.div`
  font-size: 50px;
  > a {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: auto auto;
  gap: 40px;
  justify-content: end;
  font-size: 30px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <StyledTitle>
        <Link href="/">
          <a>BS</a>
        </Link>
      </StyledTitle>
      <StyledNav>
        <Link href="/games">
          <a>Games</a>
        </Link>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </StyledNav>
    </StyledHeader>
  );
};
