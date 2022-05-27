import Event from "./event";
import Blob from "blob";
import { saveAs } from "file-saver";
import * as ics from "ics";


export default class EventBuilder {

	constructor() {
		this._event = new Event();
	}

	withStartDateOf = (year, month, day, hour, minute) => {
		this._event.start = [year, month, day, hour, minute];
		return this;
	}

	withDurationOf = (hours, minutes) => {
		this._event.duration = { hours, minutes };
		return this;
	}

	withTitle = (title) => {
		this._event.title = title
		return this;
	}

	withDescription = (description = "") => {
		this._event.description = description
		return this;
	}

	withLocation = (location = "") => {
		this._event.location = location
		return this;
	}

	withUrl = (url = "") => {
		this._event.url = url
		return this;
	}

	withGeo = (latitude = 0, longitude = 0) => {
		this._event.geo = { lat: latitude, lon: longitude }
		return this;
	}

	withCategory = (category = "") => {
		this._event.categories.push(category);
		return this
	}

	withStatusOf = (status = "CONFIRMED") => {
		this._event.status = status
		return this;
	}

	withBusyStatus = () => {
		this._event.busyStatus = "busyStatus"
		return this;
	}

	withOrganizer = (name, email) => {
		this._event.organizer = { name, email }
		return this;
	}

	withAttendee = (name, email, rsvp, partstat, role) => {
		this._event.attendees.push({
			name,
			email,
			rsvp,
			partstat,
			role,
		});
		return this;
	}
	downloadAsFile = (filename = "invite", ext = ".ics") => {
		ics.createEvent(this._event, (error, value) => {
			if (error) {
				throw error.message;
			}
			if (value.length < 1) {
				throw "Cannot generate file. Event details were not added.";
			}
			const blob = new Blob([value]);
			saveAs(blob, filename + ext);
		});
		return this;
	};
	toObject = () => this._event;
}

