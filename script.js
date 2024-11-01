        const clockElement = document.getElementById('clock');
        const alarmForm = document.getElementById('alarm-form');
        const alarmTimeInput = document.getElementById('alarm-time');
        const alarmStatus = document.getElementById('alarm-status');
        const alarmAudio = document.getElementById('alarm-audio');

        let alarmTime = null;
        let isAlarmSet = false;

        // Function to update the clock every second
        function updateClock() {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const formattedHours = hours % 12 || 12; // Convert to 12-hour format
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

            const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
            clockElement.textContent = timeString;

            // Check if the alarm time matches the current time
            if (isAlarmSet && alarmTime === `${formattedHours}:${formattedMinutes} ${ampm}`) {
                triggerAlarm();
            }
        }

        // Function to trigger the alarm
        function triggerAlarm() {
            alarmAudio.play();
            alarmStatus.textContent = 'Alarm Ringing!';
            isAlarmSet = false; // Reset the alarm status
        }

        // Function to set the alarm
        alarmForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const alarmInputValue = alarmTimeInput.value;
            console.log(alarmInputValue);
            if (alarmInputValue) {
                const alarmTimeParts = alarmInputValue.split(':');
                let alarmHour = parseInt(alarmTimeParts[0], 10);
                const alarmMinute = alarmTimeParts[1];

                const now = new Date();
                const ampm = alarmHour >= 12 ? 'PM' : 'AM';
                alarmHour = alarmHour % 12 || 12; // Convert to 12-hour format

                alarmTime = `${alarmHour}:${alarmMinute} ${ampm}`;
                isAlarmSet = true;
                alarmStatus.textContent = `Alarm set for ${alarmTime}`;
            }
        });
        
        // Start the clock
        setInterval(updateClock, 1000);