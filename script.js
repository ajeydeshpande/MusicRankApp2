const studentData = {
  Ajey: ["Raina", "Rehaan", "Aydin", "Zidan", "Nozer", "KumarKirpalani"],
  Sonam: ["NishantNanw", "Rianna", "Kimaya", "Samyra", "Kiyaan", "Raunaq"],
  Rohan: ["Rashnae", "Eira"]
};

const teacherSelect = document.getElementById("teacher");
const studentSelect = document.getElementById("student");
const rankSelect = document.getElementById("rank");
const confirmation = document.getElementById("confirmation");
const tableBody = document.querySelector("#entriesTable tbody");

teacherSelect.addEventListener("change", () => {
  const selectedTeacher = teacherSelect.value;
  studentSelect.innerHTML = "<option value=''>--Select--</option>";

  if (studentData[selectedTeacher]) {
    studentData[selectedTeacher].forEach((student) => {
      const opt = document.createElement("option");
      opt.value = student;
      opt.textContent = student;
      studentSelect.appendChild(opt);
    });
  }
});

function submitRank() {
  const teacher = teacherSelect.value;
  const student = studentSelect.value;
  const rank = rankSelect.value;

  if (!teacher || !student || !rank) {
    alert("Please select all fields");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `<td>${teacher}</td><td>${student}</td><td>${rank}</td>`;
  tableBody.appendChild(row);

  confirmation.textContent = `✅ Entry saved for ${student}`;
  confirmation.classList.remove("hidden");

  // Reset rank dropdown, keep teacher and student for faster entry
  rankSelect.value = "";
}
