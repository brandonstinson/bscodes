import styled from 'styled-components';

const StyledInstructions = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const StyledEmoji = styled.div`
  display: flex;
  gap: 15px;
`;

export const Instructions = () => (
  <StyledInstructions>
    <div>Left click to uncover. Right click to flag.</div>
    <StyledEmoji>
      <span role="img" aria-label="ongoing-emoji">
        🙂{` `}Keep Playing
      </span>
      <span role="img" aria-label="won-emoji">
        😃{` `}You Won
      </span>
      <span role="img" aria-label="lost-emoji">
        🙁{` `}You Lost
      </span>
    </StyledEmoji>
  </StyledInstructions>
);
