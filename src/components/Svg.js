import React from "react";
import PropTypes from "prop-types";
import Group from "./Group";
import Polyline from "./Polyline";
import toPoints from "../functions/toPoints";

const drawChildCoords = ({ bounds, coords, options, zoom }) => {
  const ptCorner = toPoints(bounds[0], bounds[1], zoom);

  if (coords[0].hasOwnProperty("lat") && coords[0].hasOwnProperty("lng")) {
    return (
      <Polyline
        key={coords[0].lat + coords[0].lng}
        coords={coords}
        ptCorner={ptCorner}
        zoom={zoom}
        options={options}
      />
    );
  }

  var child = [];
  for (let i = 0; i < coords.length; i++) {
    if (Array.isArray(coords[i])) {
      if (Array.isArray(coords[i][0])) {
        child.push(
          <Group
            key={i}
            coords={coords[i]}
            ptCorner={ptCorner}
            zoom={zoom}
            options={options}
          />
        );
      } else {
        child.push(
          drawChildCoords({ bounds, coords: coords[i], options, zoom })
        );
      }
    }
  }
  return child;
};

const Svg = ({ bounds, coordinates, height, width, zoom }) => {
  const coords = coordinates.coords;
  if (coords.length === 0) {
    return null;
  }

  return (
    <svg height={height} width={width}>
      {drawChildCoords({ bounds, coords, options: coordinates.options, zoom })}
    </svg>
  );
};

Svg.propTypes = {
  coordinates: PropTypes.object,
  bounds: PropTypes.array,
  zoom: PropTypes.number
};

export default Svg;
