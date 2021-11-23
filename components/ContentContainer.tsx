import styled from 'styled-components';

const StyledContentContainer = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  gap: 30px;
  padding: 0 50px 80px;
`;

type Props = {
  children: React.ReactNode;
  title?: string;
};

export const ContentContainer = ({ children, title }: Props) => (
  <StyledContentContainer>
    {title && <h2>{title}</h2>}
    {children}
  </StyledContentContainer>
);
