const sessionForm = document.getElementById("sessionForm");
const workoutForm = document.getElementById("workoutForm");
const sessionList = document.getElementById("sessionList");
const workoutList = document.getElementById("workoutList");

let sessions = [];
let currentSession = null;

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
    currentSession = addTask(sessionRating, sessionDuration);
    displayTask(currentSession, 'session');
    sessionForm.reset();
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('checked');
    });
});

workoutForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (currentSession) {
        let workoutType = workoutForm.elements.workoutType.value;
        let workoutName = workoutForm.elements.workoutName.value;
        let workoutSets = workoutForm.elements.workoutSets.value;
        let workoutReps = workoutForm.elements.workoutReps.value;
        let workoutWeight = workoutForm.elements.workoutWeight.value;
        let workout = addWorkout(currentSession, workoutType, workoutName, workoutSets, workoutReps, workoutWeight);
        displayTask(workout, 'workout', currentSession);
        workoutForm.reset();
    } else {
        alert('Please create a session first!');
    }
});

function addTask(sessionRating, sessionDuration) {
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
        workoutTypeImage: "",
        workoutName: workoutName,
        workoutSets: workoutSets,
        workoutReps: workoutReps,
        workoutWeight: workoutWeight,
        workoutPR: "",
    };

    session.workoutItems.push(workoutItem);
    return workoutItem;
}

function displayTask(task, type, session) {
    let item = document.createElement("li");
    item.setAttribute("data-id", task.id);
    if (type === 'session') {
        item.innerHTML = `<p><strong>Session</strong><br>
                          Rating: ${task.sessionRating}<br>
                          Duration: ${task.sessionDuration} minutes<br>
                          Date: ${task.sessionDate}</p>`;
        sessionList.appendChild(item);
    } else if (type === 'workout') {
        item.innerHTML = `<p><strong>${task.workoutName}</strong><br>
                          Type: ${task.workoutType}<br>
                          Sets: ${task.workoutSets}<br>
                          Reps: ${task.workoutReps}<br>
                          Weight: ${task.workoutWeight} kg</p>`;
        workoutList.appendChild(item);
    }

    // Setup delete button DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    // Listen for when the delete button is clicked
    delButton.addEventListener("click", function(event) {
        item.remove(); // Remove the task item from the page when button clicked
        if (type === 'session') {
            sessions = sessions.filter(session => session.id != task.id);
            workoutList.innerHTML = '';
        } else if (type === 'workout') {
            session.workoutItems = session.workoutItems.filter(workout => workout.id != task.id);
        }
        // Make sure the deletion worked by logging out the whole array
        console.log(sessions);
    });
}

function displaySessions() {
    document.getElementById('sessionListDisplay').textContent = JSON.stringify(sessions, null, 2);
}
