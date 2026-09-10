import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isStale } from './stale.ts';

const now = new Date('2026-09-10T12:00:00Z');
test('fresh within window', () => assert.equal(isStale('2026-06-13', 90, now), false));
test('stale after window', () => assert.equal(isStale('2026-06-11', 90, now), true));
test('placeholder epoch date is stale', () => assert.equal(isStale('1970-01-01', 90, now), true));
test('unparseable is stale', () => assert.equal(isStale('TODO', 90, now), true));
