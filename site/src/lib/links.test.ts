import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editManifestUrl, entryPath, newEntryIssueUrl, reportIssueUrl, repoUrl } from './links.ts';

const r = { owner: 'o', name: 'r', branch: 'main' };
test('repo and edit urls', () => {
  assert.equal(repoUrl(r), 'https://github.com/o/r');
  assert.equal(editManifestUrl(r, 'x-y'), 'https://github.com/o/r/edit/main/entries/x-y/manifest.yaml');
});
test('issue urls prefill the form', () => {
  assert.equal(newEntryIssueUrl(r), 'https://github.com/o/r/issues/new?template=paku-uut-sissekannet.yml');
  assert.equal(reportIssueUrl(r, 'x-y'), 'https://github.com/o/r/issues/new?template=teata-probleemist.yml&title=%5Bx-y%5D%20&entry=x-y');
});
test('entryPath handles base with or without trailing slash', () => {
  assert.equal(entryPath('/eai/', 'x'), '/eai/e/x/');
  assert.equal(entryPath('/eai', 'x'), '/eai/e/x/');
  assert.equal(entryPath('/', 'x'), '/e/x/');
});
