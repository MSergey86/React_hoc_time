import React, {useState} from 'react';
import '../css/index.css';

import moment from "moment";
// import ReactMoment from 'react-moment';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}


function prettifyDateTime(date) {
  const mDate = moment(date, 'YYYY-MM-DD HH:mm:ss')
  const difference = moment().diff(mDate);
  if (difference < 3600000 ) return `${moment().diff(mDate, 'minutes')} минут назад`;
  if (difference < 86400000 ) return `${moment().diff(mDate, 'hours')} часов назад`;
  return `${moment().diff(mDate, 'days')} дней назад`;
}

const withPrettyDateTime = (date) => (Component) => class extends React.Component {
    render() {
    const prettyDate = (typeof date === 'function') ? date(this.props.date) : date
    return <Component {...this.props} date={prettyDate}/>
    }
};

const DateTimePretty = withPrettyDateTime(prettifyDateTime)(DateTime);


function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-01-08 20:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-01-08 21:40:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-01-08 15:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}