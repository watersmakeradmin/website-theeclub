// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const calendar = document.getElementById("calendar")
    const eventList = document.getElementById("event-list");
    const monthLabel = document.getElementById("month-label");

    function renderCalendar(year, month) {
        calendar.innerHTML = "";
        eventList.innerHTML = "";

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();

        const weekdays = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
        weekdays.forEach(day => {
            const div = document.createElement("div");
            div.className = "day header";
            div.textContent = day;
            calendar.appendChild(div);
        });

        for (let i = 0; i < startDay; i++) {
            calendar.appendChild(document.createElement("div"));
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
            const event = events.find(e => e.date === dateStr);

            const div = document.createElement("div");
            div.className = "day" + (event ? " event-day" : "");
            div.textContent = i;

          
            calendar.appendChild(div);
        }

        const monthNames = [
            "Januari", "Februari", "Maart", "April", "Mei", "Juni",
            "Juli", "Augustus", "September", "Oktober", "November", "December"
        ];
        monthLabel.textContent = `${monthNames[month]} ${year}`;
        showEventsForMonth(year, month + 1);
    }

    function showEventsForMonth(year, monthNum) {
        const monthEvents = events.filter(e => e.date.startsWith(`${year}-${String(monthNum).padStart(2, "0")}`));
        eventList.innerHTML = `<h3>Evenementen in ${String(monthNum).padStart(2, "0")}/${year}:</h3>`;
        monthEvents.forEach(e => {
            const p = document.createElement("p");
            p.className = "event";
            if (e.link) {
                p.innerHTML = `<a href="${e.link}" target="_blank">${e.title}</a> (${e.date})`;
            } else {
                p.textContent = `${e.title} (${e.date})`;
            }
            eventList.appendChild(p);
        });
    }

    document.getElementById("prev-month").addEventListener("click", () => {
        if (currentMonth > 0) {
            currentMonth--;
            renderCalendar(currentYear, currentMonth);
        }
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    renderCalendar(currentYear, currentMonth);
});