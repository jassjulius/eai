# Panustamine

Register on avalik Git-hoidla. Kogu sisu on kaustas `entries/`, iga sissekanne omaette kaustas. Muudatused käivad läbi pull requesti. English summary at the end.

## Kuidas panustada

1. Tee hoidlast fork või uus haru.
2. Kopeeri olemasolev kaust `entries/` all uue nimega. Kausta nimi on sissekande `id`.
3. Täida `manifest.yaml`. Oskuse (`type: skill`) puhul lisa kausta ka `SKILL.md`.
4. Käivita `npm run validate`. Vigase manifestiga PR-i ei võeta vastu, sama kontroll jookseb automaatselt ka GitHubis.
5. Ava pull request ja täida kontroll-loend.

Kui Git on võõras, täida GitHubis vorm „Paku uut sissekannet“. Haldaja teeb selle põhjal manifesti ise.

## Manifesti reeglid

- `id` on kebab-case (väiketähed, numbrid, sidekriipsud) ja sama, mis kausta nimi.
- Kohustuslikud väljad: `id`, `type`, `title`, `summary_et`, `summary_en`, `domains`, `audience`, `works_with`, `language`, `license`, `maintainer` (`name`, `contact`), `last_tested`, `verified`.
- Valikulised väljad: `install`, `source`, `example_prompt_et`, `security_note`, `description_et`.
- `summary_et` ja `summary_en` on kuni 160 tähemärki.
- `type`, `domains`, `audience` ja `works_with` lubatud väärtused on failis `taxonomy.ts`. Skeem `schema/entry.schema.json` genereeritakse sellest.
- `language` on ISO 639 koodide loend, nt `et`, `en`.
- `last_tested` on ISO kuupäev `YYYY-MM-DD`.
- Tundmatud väljad ei ole lubatud, validaator lükkab need tagasi.
- Manifest ei tohi sisaldada saladusi (võtmeid, paroole) ega isikuandmeid peale haldaja enda avaldatud kontakti.
- Teadmata väärtuse asemel kirjuta `TODO`, mitte oletus.

## Reegel „verified“

`verified: true` tähendab, et haldaja on sissekande **ise käivitanud** ja see töötas nii, nagu kirjeldatud. `last_tested` on selle päeva kuupäev.

- Kui sissekande esitab keegi muu kui haldaja, jääb `verified: false` kuni haldaja on selle läbi proovinud.
- Kui `last_tested` on üle 90 päeva vana, kuvab sait märgise „Aegunud“. Uuesti testides uuenda kuupäeva.
- Iganädalane healthcheck kontrollib ainult seda, et `install` URL vastab. See ei asenda inimese testi ega muuda `verified` väärtust.

## Ülevaatus

Haldaja kontrollib enne liitmist, et manifest läbib skeemi, litsents on olemas ja õige, `install` URL või käsk on see, mida kirjeldus lubab, ja `security_note` ütleb ausalt, mida sissekanne teeb (nt kas ta loeb või kirjutab andmeid, kas saadab andmeid kolmandale osapoolele).

## Litsents

Sissekannete sisu (`entries/`) avaldatakse CC BY 4.0 all, kood MIT all. Sissekannet esitades nõustud sellega. Eraldi panustajaleping (CLA) ei ole vajalik.

---

## English summary

- Each entry is a folder under `entries/` with a `manifest.yaml` (and `SKILL.md` for skills). Folder name equals `id`.
- Changes go through pull requests; `npm run validate` must pass locally and in CI. Non developers can use the "Paku uut sissekannet" issue form.
- Required fields: id, type, title, summary_et, summary_en (both max 160 chars), domains, audience, works_with, language, license, maintainer, last_tested, verified. Allowed values live in `taxonomy.ts`; unknown fields are rejected.
- `verified: true` means a maintainer actually ran the entry on `last_tested`. Third party submissions stay unverified until a maintainer tries them. Entries older than 90 days show a stale badge. The weekly healthcheck only pings install URLs.
- No secrets or personal data in manifests. Write `TODO` rather than guessing.
- Content is CC BY 4.0, code is MIT. Submitting means you agree; there is no CLA.
