import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Group from '../components/Group';
import Polyline from '../components/Polyline';
import toPoints from './../functions/toPoints';

export default class Svg extends Component {
    static propTypes = {
        coordinates: PropTypes.object,
        bounds: PropTypes.array,
        zoom: PropTypes.number
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const coords = this.props.coordinates.coords;
        if (coords.length == 0)
            return null;

        const ptCorner = toPoints(this.props.bounds[0], this.props.bounds[1], this.props.zoom);
        const props = this.props;

        function drawChildCoords(coords) {
            if (coords[0].hasOwnProperty('lat') && coords[0].hasOwnProperty('lng'))
                return <Polyline
                    coords={coords}
                    ptCorner={ptCorner}
                    zoom={props.zoom}
                    options={props.coordinates.options} />;

            var child = [];
            for (var i = 0; i < coords.length; i++) {
                if (Array.isArray(coords[i])) {
                    if (Array.isArray(coords[i][0])) {
                        child.push(<Group
                            coords={coords[i]}
                            ptCorner={ptCorner}
                            zoom={props.zoom}
                            options={props.coordinates.options} />)
                    } else {
                        child.push(drawChildCoords(coords[i]));
                    }
                }
            }
            return child;
        }

        return (
            <svg
                height={this.props.height}
                width={this.props.width}>
                {drawChildCoords(coords)}
            </svg>
        );
    }
}
