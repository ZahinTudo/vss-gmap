import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function VehicleDetailsModal(props) {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Modal heading
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Driver : {props.details?.driver}</h4>
				<p>Start : {props.details?.Start}</p>
				<p>Destination : {props.details?.end}</p>
				<p>License : {props.details?.License}</p>
				{/* <p>{props.details?.lng}</p>
				<p>{props.details?.lat}</p> */}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
