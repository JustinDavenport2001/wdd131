let participantCount = 1; // start with one participant

// This function returns the HTML template for a participant
function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select name="grade${count}">
          <option selected value="" disabled selected></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

// Add Participant Button Functionality
document.getElementById("add").addEventListener("click", function () {
  participantCount++;
  const addButton = document.getElementById("add");
  addButton.insertAdjacentHTML("beforebegin", participantTemplate(participantCount));
});

// Calculate total fee
function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  return feeElements.reduce((total, fee) => total + Number(fee.value || 0), 0);
}

// Submit Form Functionality
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const total = totalFees();
  const adultName = document.getElementById("adult_name").value;
  const summary = document.getElementById("summary");
  const form = document.querySelector("form");

  form.style.display = "none";
  summary.innerHTML = `
    <h2>Registration Complete</h2>
    <p>Thank you <strong>${adultName}</strong> for registering.</p>
    <p>You have registered <strong>${participantCount}</strong> participant(s).</p>
    <p>Total Fees: <strong>$${total}</strong></p>
  `;
});

