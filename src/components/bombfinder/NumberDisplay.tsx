export const NumberDisplay = ({ value }: { value: number }) => {
  const nonNegVal = value < 0 ? 0 : value;
  return (
    <div className="px-1 font-mono bg-[#333333] text-[#ff0701] text-3xl rounded cursor-default">
      <span>{nonNegVal.toString().padStart(3, `0`)}</span>
    </div>
  );
};
