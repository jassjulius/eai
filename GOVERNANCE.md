# Governance

## Purpose and status

This project is a prototype of a free Estonian digital library of AI knowledge: a curated registry of Estonia specific skills, MCP servers, prompts, public datasets and workflow recipes. It is built by a single maintainer with the stated intent that a public body or publicly funded programme adopts and operates it. Until such a handover, decisions about scope, content and releases are made by the maintainer named in the entries and the repository settings.

The design choices follow from that intent: boring technology (Node, TypeScript, a static site, Git), no accounts or backend, no dependency on the maintainer's personal infrastructure, English in code and manifests, Estonian in content and user interface.

## Licensing

- Code (everything outside `entries/`) is licensed under MIT, see `LICENSE`.
- The index content in `entries/` (manifests, SKILL.md files and other attached content) is licensed under Creative Commons Attribution 4.0 International, see `LICENSE-CONTENT`.
- Contributors agree to these terms by submitting a pull request or issue. There is no contributor license agreement.

## What "verified" means

An entry carries `verified: true` only when a maintainer has actually run it on the date in `last_tested` and it behaved as described. Third party submissions remain unverified until a maintainer tries them. The site marks entries whose last test is older than 90 days as stale. The automated weekly healthcheck only confirms that install URLs respond; it never changes the verified flag.

## Handover requirements

A handover to an adopting organisation requires:

1. Transferring the GitHub repository to the organisation (or forking it and archiving the original with a pointer).
2. Updating `eai.config.json`: project name, repository owner and name, site URL and base path.
3. Replacing maintainer names and contacts in `entries/*/manifest.yaml` with the organisation's contact points.
4. Enabling GitHub Pages (source: GitHub Actions) under the new owner, or switching to Cloudflare Pages as described in the README.
5. Reviewing the copyright line in `LICENSE`.
6. Naming a maintainers group and adopting a review policy: at least one maintainer runs each entry before it becomes `verified: true`, and reviews every pull request for licensing and security notes.
7. Optionally running the MCP server as a container from `mcp/Dockerfile`.

There are no secrets to rotate. CI uses only the default `GITHUB_TOKEN`. The project has no accounts, API keys, databases or paid services.

## Non goals

No user accounts, comments, CMS, payments, tracking or analytics that would require consent banners. The registry is a reference tool, not a platform.
