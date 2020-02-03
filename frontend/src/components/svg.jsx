import React from "react";

const Svg = ({ icon, text }) => {
  return (
    <>
      <svg className="sidebar__menu--icon">
        <use xlinkHref={`/img/sprite.svg#${icon}`}></use>
      </svg>
      {text}
    </>
  );
};

export default Svg;
