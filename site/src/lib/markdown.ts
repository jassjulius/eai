/** Remove a leading YAML frontmatter block (as found in SKILL.md files). */
export function stripFrontmatter(md: string): string {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n\s*/, '');
}
