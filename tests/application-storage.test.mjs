import assert from "node:assert/strict";
import test from "node:test";
import {
    APPLICATIONS_STORAGE_KEY,
    persistApplications,
    readStoredApplications,
} from "../src/lib/applicationStorage.ts";

const demoApplications = [{ id: "demo", role: "Developer" }];

test("uses demo entries when no saved tracker exists", () => {
    assert.deepEqual(readStoredApplications(null, demoApplications), demoApplications);
});

test("preserves a deliberately empty tracker after the last deletion", () => {
    assert.deepEqual(readStoredApplications("[]", demoApplications), []);
});

test("restores previously saved applications", () => {
    const saved = [{ id: "saved", role: "Engineer" }];
    assert.deepEqual(readStoredApplications(JSON.stringify(saved), demoApplications), saved);
});

test("recovers gracefully from corrupted JSON", () => {
    assert.deepEqual(readStoredApplications("{not-json", demoApplications), demoApplications);
});

test("rejects saved data that is not an array", () => {
    assert.deepEqual(readStoredApplications('{"id":"unexpected"}', demoApplications), demoApplications);
});

test("persists empty arrays instead of silently skipping them", () => {
    const writes = [];
    const storage = { setItem: (key, value) => writes.push([key, value]) };
    persistApplications(storage, []);
    assert.deepEqual(writes, [[APPLICATIONS_STORAGE_KEY, "[]"]]);
});
