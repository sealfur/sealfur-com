---
title: "The Melbourne yomtov calendar I need"
description: "A selection of Jewish holidays, where they fall on the Gregorian calendar with start and end times when needed."
---

In your calendar app, add a new remote calendar and point it at [the `.ics` feed](https://sealfur.com/calendarfeeds/jewish_holidays-mel.ics)

> `https://sealfur.com/calendarfeeds/jewish_holidays-mel.ics`

## Data Examples

### Candle lighting
```ics
BEGIN:VEVENT
UID:f73b8454ebdfb450a1eb82d2ffb110e4ab4a016b@jewish-holidays
DTSTAMP:20261118T104705Z
DTSTART:20270422T082400Z
DTEND:20270422T083900Z
SUMMARY:Pesach I — Candle lighting 6:24pm
DESCRIPTION:Pesach I: Candle lighting at 6:24 PM on Thursday\, 22 April 202
 7 (local time)
TRANSP:TRANSPARENT
END:VEVENT
```

### Full day events

For some holidays, we show all-day events and specific events for candle-lighting.

{% image "./src/images/content/roshHashanaExample.png", "screenshot from calendar", "(min-width: 18ch) 260px, 320px" %}

```ics
BEGIN:VEVENT
UID:9d5c0081a3d4632eaa75220b0e835a29c1ae7b7c@jewish-holidays
DTSTAMP:20261120T031341Z
DTSTART;VALUE=DATE:20280921
DTEND;VALUE=DATE:20280923
SUMMARY:Rosh Hashana 5789
DESCRIPTION:Rosh Hashana 5789 (2028-09-21 & 2028-09-22)
TRANSP:TRANSPARENT
END:VEVENT
```