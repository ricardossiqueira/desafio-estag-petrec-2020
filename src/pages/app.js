/* eslint-disable no-shadow */
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { DragBox, Select } from 'ol/interaction';
import { Fill, Stroke, Style } from 'ol/style';
import { platformModifierKeyOnly } from 'ol/events/condition';

const vectorSource = new VectorSource({
  url: 'https://raw.githubusercontent.com/raphaelfv/desafio-estag-petrec-2020/main/estados.geojson',
  format: new GeoJSON(),
});

const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
});

const map = new Map({
  layers: [
    new VectorLayer({
      source: vectorSource,
      background: '#1a2b39',
      style(feature) {
        const color = feature.get('COLOR_BIO') || '#eeeeee';
        style.getFill().setColor(color);
        return style;
      },
    }),
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
    constrainRotation: 16,
  }),
});

const selectedStyle = new Style({
  fill: new Fill({
    color: '#ff0000',
  }),
  stroke: new Stroke({
    color: '#ff0000',
    width: 2,
  }),
});

// a normal select interaction to handle click
const select = new Select({
  style(feature) {
    const color = feature.get('COLOR_BIO') || '#eeeeee';
    selectedStyle.getFill().setColor(color);
    return selectedStyle;
  },
});
map.addInteraction(select);

const selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
const dragBox = new DragBox({
  condition: platformModifierKeyOnly,
});

map.addInteraction(dragBox);

dragBox.on('boxend', () => {
  const extent = dragBox.getGeometry().getExtent();
  const boxFeatures = vectorSource
    .getFeaturesInExtent(extent)
    .filter((feature) => feature.getGeometry().intersectsExtent(extent));

  // features that intersect the box geometry are added to the
  // collection of selected features

  // if the view is not obliquely rotated the box geometry and
  // its extent are equalivalent so intersecting features can
  // be added directly to the collection
  const rotation = map.getView().getRotation();
  const oblique = rotation % (Math.PI / 2) !== 0;

  // when the view is obliquely rotated the box extent will
  // exceed its geometry so both the box and the candidate
  // feature geometries are rotated around a common anchor
  // to confirm that, with the box geometry aligned with its
  // extent, the geometries intersect
  if (oblique) {
    const anchor = [0, 0];
    const geometry = dragBox.getGeometry().clone();
    geometry.rotate(-rotation, anchor);
    const extent = geometry.getExtent();
    boxFeatures.forEach((feature) => {
      const geometry = feature.getGeometry().clone();
      geometry.rotate(-rotation, anchor);
      if (geometry.intersectsExtent(extent)) {
        selectedFeatures.push(feature);
      }
    });
  } else {
    selectedFeatures.extend(boxFeatures);
  }
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on('boxstart', () => {
  selectedFeatures.clear();
});

const infoBox = document.getElementById('info');

selectedFeatures.on(['add', 'remove'], () => {
  const names = selectedFeatures.getArray().map((feature) => feature.get('name'));
  if (names.length > 0) {
    infoBox.innerHTML = names.join(', ');
  } else {
    infoBox.innerHTML = 'None';
  }
});
