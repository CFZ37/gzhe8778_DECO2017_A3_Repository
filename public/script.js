// listening for all DOM elements to be fully loaded before script begins running
document.addEventListener('DOMContentLoaded', (event) => {
    const sessionForm = document.getElementById("session-form");
    const workoutForm = document.getElementById("workout-form");
    const sessionList = document.getElementById("sessionList");
    const workoutSessionSelect = document.getElementById("workoutSession");

// parsing localStorage for stored sessions, otherwise initialize an empty array if none exist
    let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    let currentSession = null;

    // Load sessions from localStorage on page load
    sessions.forEach(session => displaySession(session));
    updateWorkoutSessionOptions();

    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            let rating = this.getAttribute('data-rating');
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('checked');
            });
            for (let i = 0; i < rating; i++) {
                document.querySelectorAll('.star')[i].classList.add('checked');
            }
            document.getElementById('sessionRating').value = rating;
        });
    });

    sessionForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let sessionRating = sessionForm.elements.sessionRating.value;
        let sessionDuration = sessionForm.elements.sessionDuration.value;
        currentSession = addSession(sessionRating, sessionDuration);
        displaySession(currentSession);
        updateWorkoutSessionOptions();
        saveSessionsToLocalStorage();
        sessionForm.reset();
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('checked');
        });
    });

    workoutForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let selectedSessionId = workoutForm.elements.workoutSession.value;
        let session = sessions.find(s => s.id == selectedSessionId);
        if (session) {
            let workoutType = workoutForm.elements.workoutType.value;
            let workoutName = workoutForm.elements.workoutName.value;
            let workoutSets = workoutForm.elements.workoutSets.value;
            let workoutReps = workoutForm.elements.workoutReps.value;
            let workoutWeight = workoutForm.elements.workoutWeight.value;
            let workout = addWorkout(session, workoutType, workoutName, workoutSets, workoutReps, workoutWeight);
            displayWorkout(workout, session);
            saveSessionsToLocalStorage();
            workoutForm.reset();
        } else {
            alert('Please select a session first!');
        }
    });

    function addSession(sessionRating, sessionDuration) {
        let workoutSession = {
            id: Date.now(),
            sessionDate: new Date().toISOString(),
            sessionRating: sessionRating,
            sessionDuration: sessionDuration,
            workoutItems: [],
        };

        sessions.push(workoutSession);
        return workoutSession;
    }

    function addWorkout(session, workoutType, workoutName, workoutSets, workoutReps, workoutWeight) {
        let workoutItem = {
            id: Date.now(),
            workoutType: workoutType,
            workoutName: workoutName,
            workoutSets: workoutSets,
            workoutReps: workoutReps,
            workoutWeight: workoutWeight,
        };

        session.workoutItems.push(workoutItem);
        return workoutItem;
    }

    function displaySession(session) {
        let item = document.createElement("li");
        item.setAttribute("data-id", session.id);
        item.innerHTML = `<p><strong>Session</strong><br>
                          Rating: ${session.sessionRating}<br>
                          Duration: ${session.sessionDuration} minutes<br>
                          Date: ${new Date(session.sessionDate).toLocaleString()}</p>
                          <ul id="workoutList-${session.id}"></ul>`;

        let delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.addEventListener("click", function() {
            item.remove();
            sessions = sessions.filter(s => s.id != session.id);
            saveSessionsToLocalStorage();
            updateWorkoutSessionOptions();
        });

        item.appendChild(delButton);
        sessionList.appendChild(item);

        session.workoutItems.forEach(workout => displayWorkout(workout, session));
    }

    function displayWorkout(workout, session) {
        let workoutList = document.getElementById(`workoutList-${session.id}`);
        let item = document.createElement("li");
        item.setAttribute("data-id", workout.id);
        item.innerHTML = `<p><strong>${workout.workoutName}</strong><br>
                          Type: ${workout.workoutType}<br>
                          Sets: ${workout.workoutSets}<br>
                          Reps: ${workout.workoutReps}<br>
                          Weight: ${workout.workoutWeight} kg</p>`;

        let delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.addEventListener("click", function() {
            item.remove();
            session.workoutItems = session.workoutItems.filter(w => w.id != workout.id);
            saveSessionsToLocalStorage();
        });

        item.appendChild(delButton);
        workoutList.appendChild(item);
    }

// ChatGPT generation. 
    function updateWorkoutSessionOptions() {
        workoutSessionSelect.innerHTML = '';
        sessions.forEach(session => {
            let option = document.createElement("option");
            option.value = session.id;
            option.textContent = `${new Date(session.sessionDate).toLocaleString()} (Rating: ${session.sessionRating}, Duration: ${session.sessionDuration} mins)`;
            workoutSessionSelect.appendChild(option);
        });
    }

    function saveSessionsToLocalStorage() {
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }
});
