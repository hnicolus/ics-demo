import Event from "./event";
import Blob from "blob";
import { saveAs } from "file-saver";
import * as ics from "ics";

export default function EventBuilder() {
let	event = new Event();

	this.withStartDateOf = (year, month, day, hour, minute) =>
		(event.start = [year, month, day, hour, minute]);

	this.withDurationOf = (hours, minutes) =>
		(event.duration = { hours, minutes });

	this.withTitle = (title) => (event.title = title);

	this.withDescription = (description = "") => (event.description = description);

	this.withLocation = (location = "") => (event.location = location);

	this.withUrl = (url = "") => (event.url = url);

	this.withGeo = (latitude = 0, longitude = 0) =>
		(event.geo = { lat: latitude, lon: longitude });

	this.withCategory = (category = "") => event.categories.push(category);

	this.withStatusOf = (status = "CONFIRMED") => (event.status = status);

	this.withBusyStatus = () => (event.busyStatus = "busyStatus");

	this.withOrganizer = (name, email) => (event.organizer = { name, email });

	this.withAttendee = (name, email, rsvp, partstat, role) =>
		event.attendees.push({
			name,
			email,
			rsvp,
			partstat,
			role,
		});

	this.get = function () {
		return event;
	};

	this.downloadAsFile = (filename = "invite", ext = ".ics") => {
		ics.createEvent(event, (error, value) => {
			if (error) {
				throw error.message;
			}
			if (value.length < 1) {
				throw "Cannot generate file. Event details were not added.";
			}
			const blob = new Blob([value]);
			saveAs(blob, filename + ext);
		});
	};
}
