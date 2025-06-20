import React from "react";
import "../pages/Cube.css"; 

const Cube = () => {
  return (
    <div className="scene mt-5">
      <div className="cube">
        <div className="cube-face front">
          <img src="https://placebear.com/1280/720" alt="Front" />
        </div>
        <div className="cube-face back">
          <img src="https://via.assets.so/game.jpg?w=1280&h=720" alt="Back" />
        </div>
        <div className="cube-face right">
          <img src="https://placebear.com/1280/720" alt="Right" />
        </div>
        <div className="cube-face left">
          <img src="https://via.assets.so/game.jpg?w=1280&h=720" alt="Left" />
        </div>
        <div className="cube-face top">
          <img src="https://placebear.com/1280/720" alt="Top" />
        </div>
        <div className="cube-face bottom">
          <img src="https://via.assets.so/game.jpg?w=1280&h=720" alt="Bottom" />
        </div>
      </div>
    </div>
  );
};

export default Cube;
