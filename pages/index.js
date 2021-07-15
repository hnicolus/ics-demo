import Head from 'next/head'
import EventBuilder from '../models/eventBuilder';

export default function Home() {

    const handleDownload = () => {
        let eb = new EventBuilder();
        eb.withOrganizer('Nicolas Maluleke', 'nicolusmaluleke@gmail.com')
        eb.withTitle('Turati meeting')
        eb.withDescription('Demo of meeting')
        eb.withStartDateOf(2021, 5, 13, 6, 30)
        eb.withDurationOf(3, 30)
        eb.withLocation('Turati House Johannesburg')
        eb.withUrl('https://www.turati.co.za')
        eb.withGeo( 40.0095,  105.2669 )
        eb.withCategory('Demo Meeting')
        eb.withCategory('Another Category')
        eb.withStatusOf('CONFIRMED')
        eb.withBusyStatus('BUSY')
        eb.withAttendee('Chris', 'chris@example.com',true,'ACCEPTED','REQ-PARTICIPANT')
        eb.withAttendee('Ben', 'ben@example.com',true,'ACCEPTED','REQ-PARTICIPANT')
        eb.downloadAsFile();
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
    button:{
        backgroundColor:'dodgerblue',
        borderRadius:"8px",
        border :"none",
        height:"40px",
        width:"100px",
        boxShadow:"2px 2px 1px rgba(0,0,0,0.1)",
        color:'#fff',
    }
}
