import Event from './event'
import Blob from 'blob'
import {saveAs} from 'file-saver';
import * as ics from 'ics'

export default function EventBuilder() {

    this.event = new Event();

    this.withStartDateOf = (year, month, day, hour, minute) => this.event.start = [year, month, day, hour, minute];

    this.withDurationOf = (hours, minutes) => this.event.duration = {hours, minutes};

    this.withTitle = (title) => this.event.title = title;

    this.withDescription = (description = '') => this.event.description = description;

    this.withLocation = (location = '') => this.event.location = location;

    this.withUrl = (url = '') => this.event.url = url;

    this.withGeo = (latitude = 0, longitude = 0) => this.event.geo = {lat: latitude, lon: longitude};

    this.withCategory = (category = '') => this.event.categories.push(category);

    this.withStatusOf = (status = 'CONFIRMED') => this.event.status = status;

    this.withBusyStatus = () => this.event.busyStatus = 'busyStatus';

    this.withOrganizer = (name, email) => this.event.organizer = {name, email};

    this.withAttendee = (name, email, rsvp, partstat, role) => this.event.attendees.push({
        name,
        email,
        rsvp,
        partstat,
        role
    });

    this.build = function () {
        return this.event;
    };

    this.downloadFile = (filename = 'invite', ext = '.ics') => {
        ics.createEvent(this.event, (error, value) => {
            if (error) {
                throw error.message
            }
            if (this.event.length < 1) {
                throw 'Cannot generate file. Events were not added.';
            }
            const blob = new Blob([value]);
            saveAs(blob, filename + ext);
        });
    }


}