import React, { PropTypes, Component } from 'react';

import SVGComponent from 'libs/components/SVG';
import Group from 'libs/components/Group';
import Polyline from 'libs/components/Polyline';
import latLng2World from 'libs/functions/latLng2World';
import world2Screen from 'libs/functions/world2Screen';

function drawPolylines(colecoesCoordenadas, id, zoom, ptCorner) {
    const polylines = [];
    const colecoes = colecoesCoordenadas[id];
    for (var j = 0; j < colecoes.length; j++) {
        const coordenadas = colecoes[j];
        const points = [];
        for (var c = 0; c < coordenadas.length; c++) {
            const ptScreen = world2Screen(latLng2World(coordenadas[c]), zoom);
            const point = {
                x: ptScreen.x - ptCorner.x,
                y: ptScreen.y - ptCorner.y
            };
            points.push('' + point.x + ',' + point.y);
        }

        const polyline = (
            <Polyline
                key={10000 * id + j}
                points={points.join(' ')}/>
        );
        polylines.push(polyline);
    }
    return polylines;
}

export default function drawSvg(options) {
    //console.log('DRAW MAP 1');
    const coordenadas = options.coordenadas;
    const bounds = options.bounds;
    const zoom = options.zoom;
    const center = options.center;
    if (!coordenadas || !bounds || !zoom || !center)
        return null;

    //[topLat, leftLng, bottomLat, rightLng]
    //console.log('DRAW MAP 2');

    const groups = [];
    const ids = Object.keys(coordenadas);
    const ptCorner = world2Screen(latLng2World({lat: bounds[0], lng: bounds[1]}), zoom);
    const selectedId = options.selectedId;

    for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        const polylines = drawPolylines(coordenadas, id, zoom, ptCorner);
        if (polylines.length == 0)
            continue;

        const fillColor = selectedId == id ? options.fillColorSelected : options.fillColor;
        const props = {};

        if (options.onMouseEnter)
            props.onMouseEnter = e => options.onMouseEnter(e, id);

        if (options.onMouseLeave)
            props.onMouseLeave = e => options.onMouseLeave(e, id);

        const group = (
            <Group key={i}
                   strokeWidth={options.strokeWidth || '1'}
                   stroke={options.stroke || '#FF5106'}
                   strokeOpacity={options.strokeOpacity || '0.8'}
                   fill={fillColor}
                   fillOpacity={options.fillOpacity || '0.3'} {...props}>
                {polylines}
            </Group>
        );
        groups.push(group);
    }

    if (groups.length == 0)
        return null;

    return (
        <SVGComponent height={options.height} width={options.width} lat={bounds[0]} lng={bounds[1]}>
            {groups}
        </SVGComponent>
    );
}
