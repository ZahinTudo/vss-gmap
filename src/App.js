import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
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
	const [markerList, setMarker] = useState([]);
	const [start, setStart] = useState(null);
	const [start1, setStart1] = useState(null);
	const [center, setcenter] = useState(null);
	const [map, setMap] = React.useState(/** @type google.maps.Map */ (null));
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
				const Marker = [
					{
						position: start,
						icon: "https://purepng.com/public/uploads/large/yellow-truck-n1f.png",
						info: "<div><h2>Info 4</h2><p>marker 1<br/> Im truck.</p></div>",
						title: "Marker 1",
					},
					{
						position: start1,
						icon: "http://www.mamotorcycles.com.mt/wp-content/uploads/2020/11/22MY_Ninja_650_WT1_STU__1_.png",
						info: "<div><h2>Info 4</h2><p>marker 1<br/> Im truck.</p></div>",
						title: "Marker 1",
					},
				];
				console.log(start);

				setMarker(Marker);
				setcenter(start);
				setStart(start);
				setStart1(start1);
			});
	}, []);
	// create marker on google map
	const tooltip = (marker) => {
		console.log(marker);
		const InfoWindowContent = (
			<div style={{ width: "max-content", height: "max-content" }}>
				<div>Lng : {marker.position.lng()}</div>
				<div>Lat : {marker.position.lat()}</div>
			</div>
		);
		const content = ReactDOMServer.renderToString(InfoWindowContent);
		// eslint-disable-next-line no-undef
		const infowindow = new google.maps.InfoWindow({
			content: content,
		});
		infowindow.open(map, marker);
	};
	const createMarker = (markerObj) => {
		// eslint-disable-next-line no-undef
		const marker = new google.maps.Marker({
			position: markerObj.position,
			map: map,
			icon: {
				url: markerObj.icon,
				// set marker width and height
				// eslint-disable-next-line no-undef
				scaledSize: new google.maps.Size(50, 50),
			},
			title: markerObj.title,
		});
		const normalTooltip = `<div style={{ width: "max-content", height: "max-content" }}>
				<div>Lng : ${markerObj.position.lng}</div>
				<div>Lng : ${markerObj.position.lat}</div>
			</div>`;

		// eslint-disable-next-line no-undef
		const InfoWindowContent = (
			<div style={{ width: "max-content", height: "max-content" }}>
				<div>Lng : {marker.position.lng()}</div>
				<div>Lat : {marker.position.lat()}</div>
			</div>
		);
		const content = ReactDOMServer.renderToString(InfoWindowContent);
		// eslint-disable-next-line no-undef
		const infowindow = new google.maps.InfoWindow({
			content: content,
		});

		marker.addListener("click", () => infowindow.open(map, marker));

		return marker;
	};
	let m = [];
	useEffect(() => {
		console.log(coordinates, isLoaded);
		if (isLoaded && map != null) {
			// alert("hello");
			var bounds = new window.google.maps.LatLngBounds();
			markerList.map((x) => {
				const marker = createMarker(x);
				m.push(marker);
				bounds.extend(marker.position);
			});
			map.fitBounds(bounds);
			if (coordinates != null && coordinates2 != null && isLoaded) {
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
							m[0].setPosition(start);

							if (i === len - 1) {
								m[0].setIcon({
									url: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/14210/traffic-collision-clipart-md.png",
									// set marker width and height
									// eslint-disable-next-line no-undef
									scaledSize: new google.maps.Size(50, 50),
								});
							}
						}
						const start1 = {
							lng: coordinates2[i][0],
							lat: coordinates2[i][1],
						};

						setStart1(start1);
						m[1].setPosition(start1);
						if (i === coordinates2.length - 1) {
							m[1].setIcon({
								url: "https://cdn.pixabay.com/photo/2012/04/24/13/12/motorcycle-40000_960_720.png",
								// set marker width and height
								// eslint-disable-next-line no-undef
								scaledSize: new google.maps.Size(50, 50),
							});
							clearInterval(interval);
						}
						i += 1;
					}, 50);
				}, 5000);
			}
		}
	}, [map, coordinates, coordinates2, isLoaded]);

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
				{/* {coordinates != null && (
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
							icon={{
								url: "http://www.mamotorcycles.com.mt/wp-content/uploads/2020/11/22MY_Ninja_650_WT1_STU__1_.png",
								scaledSize: new window.google.maps.Size(40, 32),
							}}
							onLoad={(marker) => onLoads(marker, "Bike")}
							position={start1}></Marker>
					</>
				)} */}
			</GoogleMap>
		) : (
			<></>
		)
	);
}

export default React.memo(App);
