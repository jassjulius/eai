export interface RepoRef {
  owner: string;
  name: string;
  branch: string;
}

export const repoUrl = (r: RepoRef): string => `https://github.com/${r.owner}/${r.name}`;
export const fileUrl = (r: RepoRef, path: string): string => `${repoUrl(r)}/blob/${r.branch}/${path}`;
export const editManifestUrl = (r: RepoRef, id: string): string =>
  `${repoUrl(r)}/edit/${r.branch}/entries/${id}/manifest.yaml`;
export const newEntryIssueUrl = (r: RepoRef): string =>
  `${repoUrl(r)}/issues/new?template=paku-uut-sissekannet.yml`;
export const reportIssueUrl = (r: RepoRef, id: string): string =>
  `${repoUrl(r)}/issues/new?template=teata-probleemist.yml&title=${encodeURIComponent(`[${id}] `)}&entry=${encodeURIComponent(id)}`;

export const withSlash = (base: string): string => (base.endsWith('/') ? base : `${base}/`);
export const entryPath = (base: string, id: string): string => `${withSlash(base)}e/${id}/`;
