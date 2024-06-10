// listening for all DOM elements to be fully loaded before script begins running
document.addEventListener('DOMContentLoaded', (event) => {
    const sessionForm = document.getElementById("session-form");
    const workoutForm = document.getElementById("workout-form");
    const sessionList = document.getElementById("sessionList");
    const workoutSessionSelect = document.getElementById("workoutSession");

    // parsing localStorage for previously stored sessions, otherwise initialize an empty array 
    let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    let currentSession = null;

    // load sessions from localStorage on page load
    sessions.forEach(session => displaySession(session));
    updateWorkoutSessionOptions();

    // adding clickable star rating functionality
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

    // listening for form submission event
    sessionForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let sessionRating = sessionForm.elements.sessionRating.value;
        let sessionDuration = sessionForm.elements.sessionDuration.value;
        // upon submission, create new session object and display in "tasklist" section
        currentSession = addSession(sessionRating, sessionDuration);
        displaySession(currentSession);
        // updating 'workout' form with the ability to choose which specific session to add workouts to
        updateWorkoutSessionOptions();
        // saving newly submitted sessions to local storage
        saveSessionsToLocalStorage();
        //reset form fields and star rating upon submission
        sessionForm.reset();
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('checked');
        });
    });

    workoutForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let selectedSessionId = workoutForm.elements.workoutSession.value;
        let session = sessions.find(s => s.id == selectedSessionId);
        // Only allowing workoutForm to be submitted after an existing session object has been created
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

    // creating a session object with data model properties from A2 Design Proposal
    function addSession(sessionRating, sessionDuration) {
        let workoutSession = {
            id: Date.now(),
            sessionDate: new Date().toISOString(),
            sessionRating: sessionRating,
            sessionDuration: sessionDuration,
            //the individual 'workout items' were added to the data model as an array within an object, essentially a second-order object
            workoutItems: [],
        };

        sessions.push(workoutSession);
        return workoutSession;
    }

    // adding the individual 'workout items' into the session data model
    function addWorkout(session, workoutType, workoutName, workoutSets, workoutReps, workoutWeight) {
        let workoutItem = {
            id: Date.now(),
            workoutType: workoutType, 
            workoutName: workoutName,
            workoutSets: workoutSets,
            workoutReps: workoutReps,
            workoutWeight: workoutWeight,
            // original data model included workoutPR (personal best/personal record), however this was removed due to being difficult to implement and unnecessary
            // could potentially have made it a 'self-select' button, where users simply decide by themselves rather than using tracked data, but this idea was scrapped
        };

        session.workoutItems.push(workoutItem);
        return workoutItem;
    }

    // GPT was used to assist in writing the "display" functions
    // displaying session in "tasklist" section next to form
    function displaySession(session) {
        let item = document.createElement("li");
        item.setAttribute("data-id", session.id);
        // content to be shown in the individual "cards" 
        item.innerHTML = `<p><strong>Session</strong><br>
                          Rating: ${session.sessionRating}<br>
                          Duration: ${session.sessionDuration} minutes<br>
                          Date: ${new Date(session.sessionDate).toLocaleString()}</p>
                          <ul id="workoutList-${session.id}"></ul>`;

        //allowing for session and workout 'cards' to be deleted
        let delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.addEventListener("click", function() {
            //removing the session from the sessions array
            item.remove();
            sessions = sessions.filter(s => s.id != session.id);
            saveSessionsToLocalStorage();
            updateWorkoutSessionOptions();
        });

        item.appendChild(delButton);
        sessionList.appendChild(item);

        //displaying all workout items for the current session
        session.workoutItems.forEach(workout => displayWorkout(workout, session));
    }

    //function to display workout in the corresponding session's item "card" rather than in its own category
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

    //this function was created by ChatGPT completely. 
    function updateWorkoutSessionOptions() {
        workoutSessionSelect.innerHTML = '';
        sessions.forEach(session => {
            let option = document.createElement("option");
            option.value = session.id;
            option.textContent = `${new Date(session.sessionDate).toLocaleString()} (Rating: ${session.sessionRating}, Duration: ${session.sessionDuration} mins)`;
            workoutSessionSelect.appendChild(option);
        });
    }

    //saving the sessions array to localStorage
    function saveSessionsToLocalStorage() {
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }
});
