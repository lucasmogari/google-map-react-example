import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Svg from "./Svg";

const DEFAULT_REF = "map";
const DEFAULT_HEIGHT = "400px";

export default class Map extends Component {
  static propTypes = {
    coordinates: PropTypes.object,
    options: PropTypes.func,
    center: PropTypes.array,
    zoom: PropTypes.number,
    height: PropTypes.string,
    ref: PropTypes.string,
    id: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      bounds: [],
      zoom: props.zoom,
      center: props.center,
      coordinates: props.coordinates,
      height: props.height,
      googleApiLoaded: false
    };
  }

  render() {
    const height = this.state.height || DEFAULT_HEIGHT;
    const ref = this.props.ref || DEFAULT_REF;
    return (
      <div style={{ height: height }} id={this.props.id} ref={ref}>
        <GoogleMapReact
          // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          center={this.state.center}
          zoom={this.state.zoom}
          onBoundsChange={this.onBoundsChange.bind(this)}
          onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
          yesIWantToUseGoogleMapApiInternals
          options={this.props.options}
        >
          {this.drawSvg(ref)}
        </GoogleMapReact>
      </div>
    );
  }

  drawSvg(ref) {
    if (!this.state.googleApiLoaded || this.state.bounds.length === 0)
      return null;
    else
      return (
        <Svg
          lat={this.state.bounds[0]}
          lng={this.state.bounds[1]}
          coordinates={this.state.coordinates}
          bounds={this.state.bounds}
          zoom={this.state.zoom}
          height={this.refs[ref] ? this.refs[ref].offsetHeight : 0}
          width={this.refs[ref] ? this.refs[ref].offsetWidth : 0}
        />
      );
  }

  onBoundsChange(center, zoom, bounds, marginBounds) {
    this.setState({
      zoom: zoom,
      bounds: bounds,
      center: center
    });
  }

  onGoogleApiLoaded({ map, maps }) {
    this.setState({
      googleApiLoaded: true
    });

    const bounds = new maps.LatLngBounds();

    function extendBounds(lat, lng) {
      const latLng = new maps.LatLng(lat, lng);
      bounds.extend(latLng);
    }
    function extendCoordsBounds(coords) {
      for (var i = 0; i < coords.length; i++) {
        if (
          coords[i].hasOwnProperty("lat") &&
          coords[i].hasOwnProperty("lng")
        ) {
          extendBounds(coords[i].lat, coords[i].lng);
        } else if (Array.isArray(coords[i])) {
          extendCoordsBounds(coords[i]);
        }
      }
    }

    extendCoordsBounds(this.state.coordinates.coords);

    map.fitBounds(bounds);
  }
}
