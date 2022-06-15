import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
// import "./App.css";
import { Marker } from "@react-google-maps/api";
// import Home from "./Home";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
	width: "100vw",
	height: "100vh",
};

const start_point = {
	lat: 23.8540299172,
	lng: 90.415498338,
};
const end_point = {
	lat: 23.622641,
	lng: 90.499794,
};
const onLoads = (marker) => {
	console.log("marker: ", marker);
};
let starting = null;
let end = null;
function App() {
	const [coordinates, setCoordinates] = useState(null);
	const [start, setStart] = useState(null);
	const [center, setcenter] = useState(null);
	const [map, setMap] = React.useState(null);
	const [end, setEnd] = useState(null);
	// var directionsService = new google.maps.DirectionsService();
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyD81s0fJ7X2KeC1tqnJkDLmXku6vY6Zf5o",
	});
	const onLoad = React.useCallback(function callback(map) {
		// const bounds = new window.google.maps.LatLngBounds(start_point);
		// map.fitBounds(bounds);
		setMap(map);
		console.log("====================================");
		console.log(coordinates);
		console.log("====================================");
	}, []);
	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	// useEffect(() => {
	// 	fetch("/sirTrack2.geojson")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			const coordinateData = data.features[0].geometry.coordinates[0];
	// 			setCoordinates(coordinateData);
	// 			const start = {
	// 				lng: coordinateData[0][0],
	// 				lat: coordinateData[0][1],
	// 			};
	// 			const last = {
	// 				lng: coordinateData[coordinateData.length - 1][0],
	// 				lat: coordinateData[coordinateData.length - 1][1],
	// 			};
	// 			console.log(start, last);
	// 			starting = start;
	// 			// end = last;
	// 			setStart(start);
	// 			setEnd(last);
	// 			// return coordinateData;
	// 		});
	// }, []);
	useEffect(() => {
		fetch("/track_points.geojson")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const coordinateData = data.features;
				setCoordinates(coordinateData);
				const start = {
					lng: coordinateData[0].geometry.coordinates[0],
					lat: coordinateData[0].geometry.coordinates[1],
				};
				const last = {
					lng: coordinateData[coordinateData.length - 1].geometry
						.coordinates[0],
					lat: coordinateData[coordinateData.length - 1].geometry
						.coordinates[1],
				};
				console.log(start, last);
				starting = start;
				// end = last;
				setcenter(start);
				setStart(start);
				setEnd(last);
				// return coordinateData;
			});
	}, []);
	// useEffect(() => {
	// 	console.log(coordinates, isLoaded);
	// 	if (coordinates != null) {
	// 		coordinates.forEach((item, ind) => {
	// 			setTimeout(() => {
	// 				const start = {
	// 					lng: item[0],
	// 					lat: item[1],
	// 				};
	// 				starting = start;
	// 				setStart(start);
	// 				console.log("====================================");
	// 				console.log(starting, ind);
	// 			}, 5000);
	// 		});
	// 	}
	// }, [coordinates]);
	useEffect(() => {
		if (coordinates != null && isLoaded) {
			coordinates.forEach((item, ind) => {
				setTimeout(() => {
					const start = {
						lng: item.geometry.coordinates[0],
						lat: item.geometry.coordinates[1],
					};
					starting = start;
					setStart(start);
					console.log("====================================");
					console.log(starting, ind);
				}, 5000);
			});
		}
	}, [coordinates, isLoaded]);

	return (
		// <Home />

		isLoaded ? (
			<GoogleMap
				onLoad={onLoad}
				onUnmount={onUnmount}
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}>
				{/* Child components, such as markers, info windows, etc. */}
				{coordinates != null && (
					<>
						<Marker onLoad={onLoads} position={start} />
						<Marker onLoad={onLoads} position={end} />
					</>
				)}
			</GoogleMap>
		) : (
			<></>
		)
	);
}

export default React.memo(App);
