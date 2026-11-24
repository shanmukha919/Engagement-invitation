import { weddingConfig } from '../data/config';

export function generateIcsFile() {
  const startDate = '20261203T053000Z'; // 11:00 AM IST in UTC (03 Dec 2026)
  const endDate = '20261203T093000Z';   // 03:00 PM IST in UTC

  const title = `${weddingConfig.ceremonyType} - ${weddingConfig.groom.firstName} & ${weddingConfig.bride.firstName}`;
  const description = `${weddingConfig.tagline}\\n\\nVenue: ${weddingConfig.venue.name}, ${weddingConfig.venue.address}\\n\\nHashtag: ${weddingConfig.hashtag}`;
  const location = `${weddingConfig.venue.name}, ${weddingConfig.venue.address}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Srikar and Yamini Engagement Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:engagement-${Date.now()}@srikar-yamini.love`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Engagement Ceremony of Yamini & Srikar tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Srikar-Yamini-Engagement-Invitation.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getGoogleCalendarUrl() {
  const title = encodeURIComponent(`${weddingConfig.ceremonyType} - ${weddingConfig.groom.firstName} & ${weddingConfig.bride.firstName}`);
  const details = encodeURIComponent(`${weddingConfig.tagline}\n\nVenue: ${weddingConfig.venue.name}\n${weddingConfig.venue.address}\n\nHashtag: ${weddingConfig.hashtag}`);
  const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.address}`);
  // 20261203T053000Z / 20261203T093000Z (UTC)
  const dates = '20261203T053000Z/20261203T093000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
