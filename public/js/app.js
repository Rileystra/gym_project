async function loadPlans() {
  const response = await fetch("/api/plans");
  const plans = await response.json();
  const container = document.getElementById("plansContainer");
  container.innerHTML = plans.map(plan => `
    <article class="card">
      <h3>${plan.name}</h3>
      <p class="price">£${plan.price}</p>
      <ul>${plan.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
    </article>`).join("");
}

document.getElementById("bmiForm").addEventListener("submit", async event => {
  event.preventDefault();
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const response = await fetch("/api/bmi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weight, height })
  });
  const data = await response.json();
  document.getElementById("bmiResult").textContent = response.ok
    ? `Your BMI is ${data.bmi}. Category: ${data.category}.`
    : data.error;
});

document.getElementById("memberForm").addEventListener("submit", async event => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const plan = document.getElementById("plan").value;
  const response = await fetch("/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, plan })
  });
  const data = await response.json();
  document.getElementById("memberResult").textContent = response.ok
    ? `Member registered: ${data.name} on ${data.plan}.`
    : data.error;
  if (response.ok) event.target.reset();
});

loadPlans();
