import styled from 'styled-components';

const StyledContentContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 30px;
  padding: 0 50px 80px;
`;

const StyledTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

type Props = {
  children: React.ReactNode;
  title?: string;
};

export const ContentContainer = ({ children, title }: Props) => (
  <StyledContentContainer>
    {title && <StyledTitle>{title}</StyledTitle>}
    {children}
  </StyledContentContainer>
);
