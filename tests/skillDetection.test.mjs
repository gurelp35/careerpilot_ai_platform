import test from "node:test";
import assert from "node:assert/strict";
import { detectSkills } from "../src/lib/skillDetection.ts";
import { skillDefinitions } from "../src/data/skills.ts";

test("detects technical skills regardless of case", () => {
  assert.deepEqual(detectSkills("Strong JAVASCRIPT, TypeScript and REST API skills", skillDefinitions), ["JavaScript", "TypeScript", "API"]);
});

test("does not match short aliases inside unrelated words", () => {
  assert.deepEqual(detectSkills("Digital projects, results, logistics and next steps", skillDefinitions), []);
});

test("matches complete terms surrounded by punctuation", () => {
  assert.deepEqual(detectSkills("Experience with (JS), Next.js, and Git.", skillDefinitions), ["JavaScript", "Next.js", "Git"]);
});

test("does not confuse Next.js or Node.js with standalone JS", () => {
  assert.deepEqual(detectSkills("Next.js and Node.js", skillDefinitions), ["Next.js"]);
});

test("does not treat ordinary rest as REST API", () => {
  assert.deepEqual(detectSkills("Take a rest before the interview", skillDefinitions), []);
});

test("returns no skills for an empty description", () => {
  assert.deepEqual(detectSkills("", skillDefinitions), []);
});
