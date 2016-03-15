import React from 'react';
import ReactDOM from "react-dom";
import Map from 'components/Map';

class App extends React.Component {
    render() {
        const defaultOptions = {
            strokeWidth: 1,
            stroke: '#FF5106',
            strokeOpacity: '0.8',
            fill: '#FF4234',
            fillOpacity: '0.3',
            onMouseEnter: function(e) {
            },
            onMouseLeave: function(e) {
            }
        };

        const coords1 = {
            coords: [
                {lat: 25.774, lng: -80.190},
                {lat: 18.466, lng: -66.118},
                {lat: 32.321, lng: -64.757},
                {lat: 25.774, lng: -80.190}
            ],
            options: defaultOptions
        };
        const coords2 = {
            coords: [
                [
                    {lat: 25.774, lng: -80.190},
                    {lat: 18.466, lng: -66.118},
                    {lat: 32.321, lng: -64.757},
                    {lat: 25.774, lng: -80.190}
                ],
                [
                    {lat: 25.774, lng: -60.190},
                    {lat: 18.466, lng: -46.118},
                    {lat: 32.321, lng: -44.757},
                    {lat: 25.774, lng: -60.190}
                ]
            ],
            options: defaultOptions
        };
        const coords3 = {
            coords: [[
                [
                    {lat: 25.774, lng: -80.190},
                    {lat: 48.466, lng: -66.118},
                    {lat: 32.321, lng: -64.757},
                    {lat: 25.774, lng: -80.190}
                ],
                [
                    {lat: 25.774, lng: -60.190},
                    {lat: 58.466, lng: -46.118},
                    {lat: 32.321, lng: -44.757},
                    {lat: 25.774, lng: -60.190}
                ]
            ]],
            options: defaultOptions
        };

        const mapOptions = function(maps) {
            return {
                scrollwheel: false,
                mapTypeId: maps.MapTypeId.HYBRID,
                styles: [{stylers: [{'saturation': -150}, {'gamma': 0.8}, {'lightness': 4}, {'visibility': 'on'}]}]
            };
        };

        return ( <div id="react-root" style={{width: '600px'}}>
            <p>Simple Polygon</p>
            <Map coordinates={coords1} zoom={5} center={[24.886, -70.268]} height="200px" options={mapOptions}/>
            <p>Polygons Array</p>
            <Map coordinates={coords2} zoom={5} center={[24.886, -70.268]} options={mapOptions}/>
            <p>Polygons Groups</p>
            <Map coordinates={coords3} zoom={5} center={[24.886, -70.268]} options={mapOptions}/>
        </div> );
    }
}

ReactDOM.render(<App />, document.getElementById('content'));