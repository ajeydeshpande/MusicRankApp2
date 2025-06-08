// Reference to Firestore (already set in index.html)
const db = firebase.firestore();

const teacherSelect = document.getElementById("teacher");
const studentSelect = document.getElementById("student");
const rankSelect = document.getElementById("rank");
const submitBtn = document.getElementById("submit");
const messageDiv = document.getElementById("message");
const dataTable = document.getElementById("dataTable").getElementsByTagName("tbody")[0];

const teacherStudents = {
    Ajey: ["Raina", "Rehaan", "Aydin", "Zidan", "Nozer", "KumarKirpalani"],
    Sonam: ["NishantNanw", "Rianna", "Kimaya", "Samyra", "Kiyaan", "Raunaq"],
    Rohan: ["Rashnae", "Eira"]
};

// Update student dropdown when a teacher is selected
teacherSelect.addEventListener("change", () => {
    const selectedTeacher = teacherSelect.value;
    studentSelect.innerHTML = '<option value="">Select Student</option>'; // Reset

    if (teacherStudents[selectedTeacher]) {
        teacherStudents[selectedTeacher].forEach(student => {
            const option = document.createElement("option");
            option.value = student;
            option.innerText = student;
            studentSelect.appendChild(option);
        });
    }
});


submitBtn.addEventListener("click", async () => {
    const teacher = teacherSelect.value;
    const student = studentSelect.value;
    const rank = rankSelect.value;
    const timestamp = new Date();

    if (!teacher || !student || !rank) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        await db.collection("rankEntries").add({
            teacher,
            student,
            rank,
            timestamp
        });

        messageDiv.innerText = "✅ Entry recorded!";
        messageDiv.style.color = "green";

        loadData(); // Refresh table
    } catch (error) {
        console.error("Error adding document: ", error);
        messageDiv.innerText = "❌ Error saving data.";
        messageDiv.style.color = "red";
    }
});

// Load saved data from Firestore
async function loadData() {
    dataTable.innerHTML = ""; // Clear table

    const snapshot = await db.collection("rankEntries").orderBy("timestamp", "desc").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        const row = dataTable.insertRow();
        row.insertCell(0).innerText = data.teacher;
        row.insertCell(1).innerText = data.student;
        row.insertCell(2).innerText = data.rank;
        row.insertCell(3).innerText = new Date(data.timestamp.toDate()).toLocaleString();
    });
}

// Load data on app start
window.onload = () => {
    loadData();
};
