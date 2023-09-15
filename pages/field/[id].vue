<template lang="jade">
div(style="color: white;")
    p id: {{ $route?.params?.id }}

    UIButton(@click="share") share
    p error: {{ error }}
    a(href="https://google.com" target="_blank") lupa
    UIButton(@click="fcm") send fcm token
    UIButton(@click="addCalendar") add calendar
</template>

<script setup lang="ts">
const error = ref('')
const share = async () => {
    try {
        await navigator.share({
            title: 'Title',
            text: 'Text',
            url: window.location.href,
        });
    } catch (err: any) {
        console.error(`${err?.name}: ${err?.message}`);
        error.value = err
    }
}

const fcm = () => {
    const token = localStorage.getItem('fcmToken')
    myFetch(`/change-fcm-token/?token=${token}`, {
        method: 'POST',
    })
}

const addCalendar = () => {
    let ics = `BEGIN:VCALENDAR
METHOD:PUBLISH
VERSION:2.0
X-WR-CALNAME:Calendar
PRODID:-//bronkz.app//NONSGML v1.0//EN
BEGIN:VEVENT
UID:pupalupa
DTSTAMP:20230913T042324
DTSTART:20230914T070000Z
DTEND:20230914T080000Z
SUMMARY:Встреча
DESCRIPTION:
END:VEVENT
END:VCALENDAR`

    const title = "newEvent.ics";
    const uri = "data:text/calendar;charset=utf8," + encodeURIComponent(ics)
    const link = document.createElement('a')
    link.href = uri
    link.download = title
    link.target = '_BLANK'
    document.body.appendChild(link)
    link.click();
    link.remove();
}
</script>
