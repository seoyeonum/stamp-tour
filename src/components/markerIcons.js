import L from 'leaflet'; // Marker 색상 변경을 위한 import 문

// Marker Icons
export const redIcon = getMarkerIcons('red');
export const blueIcon = getMarkerIcons('blue');
export const violetIcon = getMarkerIcons('violet');

function getMarkerIcons(colorName) {
  const markerIcon = new L.Icon({
    iconUrl:
      `https://raw.githubusercontent.com/` +
      `pointhi/leaflet-color-markers/master/img/` +
      `marker-icon-2x-${colorName}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return markerIcon;
}
