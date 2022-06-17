import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
// import "./App.css";
import { Marker } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./Home";
import {
	GoogleMap,
	LoadScript,
	InfoWindow,
	useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
	width: "100vw",
	height: "100vh",
};

function App() {
	const [coordinates, setCoordinates] = useState(null);
	const [coordinates2, setCoordinates2] = useState(null);
	const [start, setStart] = useState(null);
	const [start1, setStart1] = useState(null);
	const [center, setcenter] = useState(null);
	const [map, setMap] = React.useState(null);
	// const [marker1, setMarker1] = React.useState(null);
	// const [end, setEnd] = useState(null);

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
	const onLoads = (marker, content) => {
		console.log("marker: ", marker);
		const infowindow = new window.google.maps.InfoWindow({
			content: `<h1>${content}</h1>`,
		});
		marker.addListener("click", () => infowindow.open(map, marker));
	};
	useEffect(() => {
		fetch("/sirTrack2.geojson")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const coordinateData = data.features[0].geometry.coordinates[0];
				const coordinateData2 =
					data.features[0].geometry.coordinates[1];
				setCoordinates(coordinateData);
				setCoordinates2(coordinateData2);
				const start = {
					lng: coordinateData[0][0],
					lat: coordinateData[0][1],
				};
				const start1 = {
					lng: coordinateData2[0][0],
					lat: coordinateData2[0][1],
				};

				console.log(start);

				setcenter(start);
				setStart(start);
				setStart1(start1);
			});
	}, []);
	// useEffect(() => {
	// 	fetch("/track_points.geojson")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			const coordinateData = data.features;
	// 			setCoordinates(coordinateData);
	// 			const start = {
	// 				lng: coordinateData[0].geometry.coordinates[0],
	// 				lat: coordinateData[0].geometry.coordinates[1],
	// 			};
	// 			const last = {
	// 				lng: coordinateData[coordinateData.length - 1].geometry
	// 					.coordinates[0],
	// 				lat: coordinateData[coordinateData.length - 1].geometry
	// 					.coordinates[1],
	// 			};
	// 			console.log(start, last);
	// 			starting = start;
	// 			// end = last;
	// 			setcenter(start);
	// 			setStart(start);
	// 			setEnd(last);
	// 			// return coordinateData;
	// 		});
	// }, []);
	useEffect(() => {
		console.log(coordinates, isLoaded);
		if (coordinates != null && coordinates2 != null && isLoaded) {
			// coordinates.forEach((item, ind) => {
			// 	setTimeout(() => {
			// 		const start = {
			// 			lng: item[0],
			// 			lat: item[1],
			// 		};
			// 		starting = start;
			// 		setStart(start);
			// 		console.log("====================================");
			// 		console.log(starting, ind);
			// 	}, 5000);
			// });
			const len = coordinates.length;
			let i = 0;
			setTimeout(() => {
				const interval = setInterval(() => {
					if (i < len) {
						const start = {
							lng: coordinates[i][0],
							lat: coordinates[i][1],
						};

						setStart(start);
					}
					const start1 = {
						lng: coordinates2[i][0],
						lat: coordinates2[i][1],
					};

					setStart1(start1);

					if (i === coordinates2.length - 1) {
						clearInterval(interval);
					}
					i += 1;
				}, 50);
			}, 5000);
			// coordinates2.forEach((item, ind) => {
			// 	if (ind < len) {
			// 		setTimeout(() => {
			// 			const start = {
			// 				lng: coordinates[ind][0],
			// 				lat: coordinates[ind][1],
			// 			};
			// 			starting = start;
			// 			setStart(start);
			// 			console.log("====================================");
			// 			console.log(starting, ind);
			// 		}, 7000);
			// 	}
			// 	setTimeout(() => {
			// 		const start = {
			// 			lng: item[0],
			// 			lat: item[1],
			// 		};
			// 		// starting = start;
			// 		setStart1(start);
			// 		console.log("====================================");
			// 		console.log(starting, ind);
			// 	}, 7000);
			// });
		}
		// if (coordinates2 != null && isLoaded) {
		// 	coordinates2.forEach((item, ind) => {
		// 		setTimeout(() => {
		// 			const start = {
		// 				lng: item[0],
		// 				lat: item[1],
		// 			};
		// 			// starting = start;
		// 			setStart1(start);
		// 			console.log("====================================");
		// 			console.log(starting, ind);
		// 		}, 5000);
		// 	});
		// }
	}, [coordinates, coordinates2, isLoaded]);
	// useEffect(() => {
	// 	if (coordinates != null && isLoaded) {
	// 		coordinates.forEach((item, ind) => {
	// 			setTimeout(() => {
	// 				const start = {
	// 					lng: item.geometry.coordinates[0],
	// 					lat: item.geometry.coordinates[1],
	// 				};
	// 				starting = start;
	// 				setStart(start);
	// 				console.log("====================================");
	// 				console.log(starting, ind);
	// 			}, 5000);
	// 		});
	// 	}
	// }, [coordinates, isLoaded]);

	const handleSingleCLick = (e) => {
		console.log("clicked", e);
	};
	return (
		// <Home />

		isLoaded ? (
			<GoogleMap
				onLoad={onLoad}
				onUnmount={onUnmount}
				mapContainerStyle={containerStyle}
				center={center}
				zoom={9}>
				{/* Child components, such as markers, info windows, etc. */}
				{coordinates != null && (
					<>
						<Marker
							id='marker1'
							onLoad={(marker) => onLoads(marker, "Truck")}
							position={start}
							key='marker_1'
							icon={{
								url: "https://purepng.com/public/uploads/large/yellow-truck-n1f.png",
								scaledSize: new window.google.maps.Size(40, 32),
							}}
						/>

						<Marker
							// onClick={(e) => handleSingleCLick(e)}
							icon={{
								url: "http://www.mamotorcycles.com.mt/wp-content/uploads/2020/11/22MY_Ninja_650_WT1_STU__1_.png",
								scaledSize: new window.google.maps.Size(40, 32),
							}}
							onLoad={(marker) => onLoads(marker, "Bike")}
							position={start1}></Marker>
					</>
				)}
			</GoogleMap>
		) : (
			<></>
		)
	);
}

export default React.memo(App);
