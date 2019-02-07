import React from "react";
import PropTypes from "prop-types";
import toPoints from "../functions/toPoints";

const Polyline = ({ bounds, coords, options, ptCorner, zoom }) => {
  ptCorner = ptCorner || toPoints(bounds[0], bounds[1], zoom);
  const points = [];
  for (let i = 0; i < coords.length; i++) {
    const ptScreen = toPoints(coords[i].lat, coords[i].lng, zoom);
    const point = {
      x: ptScreen.x - ptCorner.x,
      y: ptScreen.y - ptCorner.y
    };
    points.push(point.x + "," + point.y);
  }
  return <polyline points={points.join(" ")} {...options} />;
};

Polyline.propTypes = {
  coords: PropTypes.array,
  ptCorner: PropTypes.object,
  bounds: PropTypes.array,
  zoom: PropTypes.number,
  options: PropTypes.object
};

export default Polyline;
