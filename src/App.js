import React from "react";
import Map from "./components/Map";
import GoogleApiPolygon from "./GoogleApiPolygon";
import "./App.css";

const App = () => {
  const defaultOptions = {
    strokeWidth: 1,
    stroke: "#FF5106",
    strokeOpacity: "0.8",
    fill: "#FF4234",
    fillOpacity: "0.3",
    onMouseEnter: e => {},
    onMouseLeave: e => {}
  };

  const coords1 = {
    coords: [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ],
    options: defaultOptions
  };
  const coords2 = {
    coords: [
      [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
        { lat: 25.774, lng: -80.19 }
      ],
      [
        { lat: 25.774, lng: -60.19 },
        { lat: 18.466, lng: -46.118 },
        { lat: 32.321, lng: -44.757 },
        { lat: 25.774, lng: -60.19 }
      ]
    ],
    options: defaultOptions
  };
  const coords3 = {
    coords: [
      [
        [
          { lat: 25.774, lng: -80.19 },
          { lat: 48.466, lng: -66.118 },
          { lat: 32.321, lng: -64.757 },
          { lat: 25.774, lng: -80.19 }
        ],
        [
          { lat: 25.774, lng: -60.19 },
          { lat: 58.466, lng: -46.118 },
          { lat: 32.321, lng: -44.757 },
          { lat: 25.774, lng: -60.19 }
        ]
      ]
    ],
    options: defaultOptions
  };

  const mapOptions = maps => {
    return {
      scrollwheel: false,
      mapTypeId: maps.MapTypeId.HYBRID,
      styles: [
        {
          stylers: [
            { saturation: -150 },
            { gamma: 0.8 },
            { lightness: 4 },
            { visibility: "on" }
          ]
        }
      ]
    };
  };

  return (
    <div id="react-root" style={{ width: "600px" }}>
      <p>Simple Polygon</p>
      <Map
        coordinates={coords1}
        zoom={5}
        center={[24.886, -70.268]}
        height="200px"
        options={mapOptions}
      />
      <p>Polygons Array</p>
      <Map
        coordinates={coords2}
        zoom={5}
        center={[24.886, -70.268]}
        options={mapOptions}
      />
      <p>Polygons Groups</p>
      <Map
        coordinates={coords3}
        zoom={5}
        center={[24.886, -70.268]}
        options={mapOptions}
      />
      <p>Google API Polygon</p>
      <div style={{ height: "400px", width: "600px" }}>
        <GoogleApiPolygon />
      </div>
    </div>
  );
};

export default App;
