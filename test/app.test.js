const test = require("node:test");
const assert = require("node:assert/strict");
const { getPlans, addMember, calculateBMI } = require("../src/gym");

test("getPlans returns at least three gym plans", () => {
  const plans = getPlans();
  assert.equal(Array.isArray(plans), true);
  assert.equal(plans.length >= 3, true);
});

test("addMember creates a valid member", () => {
  const member = addMember({ name: "Uriel Djantou", email: "uriel@example.com", plan: "Premium Plan" });
  assert.equal(member.name, "Uriel Djantou");
  assert.equal(member.email, "uriel@example.com");
  assert.equal(member.plan, "Premium Plan");
});

test("addMember rejects invalid email", () => {
  assert.throws(() => addMember({ name: "Test User", email: "wrong-email", plan: "Basic Plan" }), /valid email/);
});

test("calculateBMI returns BMI and category", () => {
  const result = calculateBMI({ weight: 70, height: 1.75 });
  assert.equal(result.bmi, 22.86);
  assert.equal(result.category, "Healthy weight");
});
