import styled from 'styled-components';

const StyledNumbers = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;
  text-align: center;
  width: 80px;
  color: #ff0701;
  background-color: #333333;
  font-size: 40px;
  border-radius: 5px;
  cursor: default;
`;

export const NumberDisplay = ({ value }: { value: number }) => {
  const nonNegVal = value < 0 ? 0 : value;
  return (
    <StyledNumbers>
      <span>{nonNegVal.toString().padStart(3, `0`)}</span>
    </StyledNumbers>
  );
};
