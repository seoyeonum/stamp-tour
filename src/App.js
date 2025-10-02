import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function App() {
  const position = [37.576508, 126.983451]; // 서울공예박물관 (지도 중앙)
  const spot = [37.576832, 126.976724]; // 경복궁 흥례문 앞 <궁중문화축전> 종합안내소
  // const spot = [37.578792, 126.996511]; // 창경궁 홍화문 앞 <궁중문화축전> 종합안내소

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={position}
        zoom={17}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={spot}>
          <Popup>경복궁 궁중문화축전 종합안내소</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
