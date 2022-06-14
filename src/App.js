import logo from "./logo.svg";
import React from "react";
// import "./App.css";
import { Marker } from "@react-google-maps/api";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
const containerStyle = {
	width: "100vw",
	height: "100vh",
};

const center = {
	lat: 23.8540299172,
	lng: 90.415498338,
};
const onLoad = (marker) => {
	console.log("marker: ", marker);
};
function App() {
	return (
		<LoadScript googleMapsApiKey='AIzaSyBuM7SaXRlIIAZsyBR7q7pp_B-g4sysEtY'>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}>
				{/* Child components, such as markers, info windows, etc. */}
				<Marker onLoad={onLoad} position={center} />
				<Marker
					onLoad={onLoad}
					position={{
						lat: 23.622641,
						lng: 90.499794,
					}}
				/>
				{/* <Marker
					icon={{
						path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
						fillColor: "yellow",
						fillOpacity: 0.9,
						scale: 2,
						strokeColor: "gold",
						strokeWeight: 2,
					}}
					position={{
						lat: 23.622641,
						lng: 90.499794,
					}}
				/> */}
			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(App);
