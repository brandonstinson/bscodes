export const Instructions = () => (
  <div className="grid justify-center text-center text-xl">
    <div>Left click to uncover. Right click to flag.</div>
    <div className="flex gap-6">
      <span role="img" aria-label="ongoing-emoji">
        🙂{` `}Keep Playing
      </span>
      <span role="img" aria-label="won-emoji">
        😃{` `}You Won
      </span>
      <span role="img" aria-label="lost-emoji">
        🙁{` `}You Lost
      </span>
    </div>
  </div>
);
