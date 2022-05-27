import Head from 'next/head'
import EventBuilder from '../models/eventBuilder';

export default function Home() {

    const handleDownload = () => {
        let eb =
            new EventBuilder()
                .withOrganizer('Nicolas Coder', 'nick@somecompany.com')
                .withTitle('Stuff meeting')
                .withDescription('Demo of meeting')
                .withStartDateOf(2021, 5, 13, 6, 30)
                .withDurationOf(3, 30)
                .withLocation('Google')
                .withUrl('https://www.somecompany.co.za')
                .withGeo(40.0095, 105.2669)
                .withCategory('Demo Meeting')
                .withCategory('Another Category')
                .withStatusOf('CONFIRMED')
                .withBusyStatus('BUSY')
                .withAttendee('Chris', 'chris@example.com', true, 'ACCEPTED', 'REQ-PARTICIPANT')
                .withAttendee('Ben', 'ben@example.com', true, 'ACCEPTED', 'REQ-PARTICIPANT');

        const event = eb.toObject();
        console.log({ event })
        eb.downloadAsFile()
    }
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
            </Head>
            <div >
                <h3>Event file Demo</h3>
                <button onClick={handleDownload} style={styles.button}>Download</button>
            </div>
        </div>
    )
}
const styles = {
    button: {
        backgroundColor: 'dodgerblue',
        borderRadius: "8px",
        border: "none",
        height: "40px",
        width: "100px",
        boxShadow: "2px 2px 1px rgba(0,0,0,0.1)",
        color: '#fff',
    }
}
