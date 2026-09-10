import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stripFrontmatter } from './markdown.ts';

test('removes leading YAML frontmatter', () => {
  assert.equal(stripFrontmatter('---\nname: x\n---\n\n# Hi\n'), '# Hi\n');
});
test('leaves text without frontmatter alone', () => {
  assert.equal(stripFrontmatter('# Hi\n---\n'), '# Hi\n---\n');
});
