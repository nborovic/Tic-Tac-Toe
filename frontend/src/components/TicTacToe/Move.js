import React from "react";

const Move = props => {
  return (
    <>
      <button
        className="timeline__button"
        onClick={() => props.onMoveClick(props.move)}
      >
        Go to move #{props.id}
      </button>
    </>
  );
};

export default Move;
