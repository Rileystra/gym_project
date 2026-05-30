const members = [];

const plans = [
  { id: 1, name: "Basic Plan", price: 19.99, features: ["Gym access", "Locker room", "1 free fitness assessment"] },
  { id: 2, name: "Standard Plan", price: 34.99, features: ["Gym access", "Group classes", "Workout plan"] },
  { id: 3, name: "Premium Plan", price: 49.99, features: ["Gym access", "Personal trainer", "Nutrition guidance"] }
];

function getPlans() {
  return plans;
}

function addMember(member) {
  if (!member || typeof member !== "object") {
    throw new Error("Member details are required.");
  }
  if (!member.name || member.name.trim().length < 2) {
    throw new Error("Member name must be at least 2 characters.");
  }
  if (!member.email || !member.email.includes("@")) {
    throw new Error("A valid email address is required.");
  }
  const newMember = {
    id: members.length + 1,
    name: member.name.trim(),
    email: member.email.trim(),
    plan: member.plan || "Basic Plan"
  };
  members.push(newMember);
  return newMember;
}

function calculateBMI(details) {
  const weight = Number(details.weight);
  const height = Number(details.height);
  if (!weight || !height || weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be positive numbers.");
  }
  const bmi = weight / (height * height);
  let category = "Healthy weight";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi >= 25 && bmi < 30) category = "Overweight";
  else if (bmi >= 30) category = "Obese";
  return { bmi: Number(bmi.toFixed(2)), category };
}

module.exports = { getPlans, addMember, calculateBMI };
