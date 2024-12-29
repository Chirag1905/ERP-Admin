import React, { useEffect } from 'react'
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Breadcrumb from '../../components/common/Breadcrumb';
import WelcomeHeader from '../../components/common/WelcomeHeader';

export default function TuiCalendar() {

    const breadcrumbItem = [
        {
            name: "App",
        },
        {
            name: "tui Calendar",
        },
    ]

    useEffect(() => {
        const calendarEl = document.getElementById('calendar');

        const calendar = new Calendar(calendarEl, {
            defaultView: 'month',
            template: {
                time(event) {
                    const { start, end, title } = event;
                    return `<span style="color: red;">${formatTime(start)}~${formatTime(end)} ${title}</span>`;
                },
                allday(event) {
                    return `<span style="color: gray;">${event.title}</span>`;
                },
            },
            calendars: [
                {
                    id: 'cal1',
                    name: 'Personal',
                    backgroundColor: '#03bd9e',
                },
                {
                    id: 'cal2',
                    name: 'Work',
                    backgroundColor: '#00a9ff',
                },
            ],
        });

        calendar.render();

        return () => {
            calendar.destroy(); // Clean up calendar instance on unmount
        };
    }, []); // Empty dependency array to run the effect only once on mount

    // Function to format time (replace with your implementation)
    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            <WelcomeHeader income />
            <div id="calendar" style={{ height: '800px' }} />
        </div>
    )
}
