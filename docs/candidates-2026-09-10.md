# Candidate entries, research snapshot 2026-09-10

Research notes for filling the registry. Facts below were read from each repo, README or page on 2026-09-10; "unknown" means not stated. Nothing here is an entry yet. `verified: true` still requires a maintainer to run the thing.

Legend: RO = read only. Creds = credentials needed to use.

## MCP servers

| Name | URL | Wraps | License | Last push | Install | RO | Creds |
|---|---|---|---|---|---|---|---|
| telks.ee telekava MCP (seed entry) | https://telks.ee/mcp | Estonian TV guide | MIT | live | remote HTTP | yes | none |
| stuudium-claude-mcp | https://github.com/emervark/stuudium-claude-mcp | Stuudium (parent view: homework, messages), local SQLite sync via Playwright | MIT (plus non endorsement note) | 2026-09-09 | clone, `npm run cli -- mcp` (stdio) | yes, no write tools | user logs in themselves; no password stored |
| selver-mcp (vibenya) | https://github.com/vibenya/selver-mcp | Selver.ee: search, cart, deals, delivery slots | MIT | 2026-04-09 | clone, Bun, `.mcp.json` | no (cart, checkout) | Smart-ID, personal code in .env |
| selver-mcp (martparve) | https://github.com/martparve/selver-mcp | Selver.ee search, guest cart | none declared | 2026-04-24 | clone, `claude mcp add` | writes guest cart | none |
| e-arveldaja-mcp | https://github.com/iseppo/e-arveldaja-mcp | RIK e-arveldaja accounting API, 127 tools, 16 prompts | Apache-2.0 | 2026-09-03 | `npx -y e-arveldaja-mcp` | no (creates, confirms, deletes bookings) | e-arveldaja API key with IP allow list |
| LHV Pank MCP (official) | https://lhv.ai/ , endpoint https://mcp.lhv.ai/mcp | LHV accounts, balances, statements | proprietary, public beta free | live | remote HTTP, OAuth | yes | Smart-ID / Mobile-ID / ID card |
| estonian-mcp | https://github.com/silly-geese/estonian-mcp | 26 Estonian language tools (EstNLTK, EKI rules, Riigi Teataja terms) | Apache-2.0 | 2026-09-10 | remote https://estonian-mcp.fly.dev/mcp ; Docker/uv | yes | none |
| nimistu-mcp | https://github.com/Nimistu/nimistu-mcp | Äriregister companies, people, beneficial owners, trademarks via nimistu.ee | MIT (docs); data per nimistu.ee/litsents | 2026-08-05 | remote https://nimistu.ee/api/mcp | yes | none |
| lahend-mcp | https://github.com/Nimistu/lahend-mcp | Court decisions plus in force acts by paragraph, citation graph | MIT | 2026-08-04 | remote https://lahend.ee/api/lahend-mcp/mcp | yes | none |
| dokumendiregister-mcp | https://github.com/Nimistu/dokumendiregister-mcp | Search across public authority document registers | MIT | 2026-07-21 | remote https://dokumendiregister.ee/api/dokreg-mcp/mcp | yes | none |
| estonia-ai-kit | https://github.com/stefanoamorelli/estonia-ai-kit | Monorepo: RIK, open data, EMTA MCP servers (some WIP), EMTA and LHV CLIs, Riigi Teataja RAG | AGPL-3.0 | 2026-06-30 | npm packages, build from source | MCP servers RO; CLIs can pay | none for MCP; Smart-ID for CLIs |
| riigiteataja_ee_ai_mcp | https://github.com/dustinest/riigiteataja_ee_ai_mcp | Riigi Teataja act search and fetch, ET and EN tool descriptions | MIT | 2026-08-12 | Cloudflare Worker, self host via Docker/wrangler | yes | none |
| mcp-stat-ee | https://github.com/pipeworx-io/mcp-stat-ee | Statistikaamet PxWeb tables, average wage | MIT | 2026-08-26 | remote https://gateway.pipeworx.io/stat-ee/mcp | yes | none |
| estonian-transport-mcp | https://github.com/a-rank/estonian-transport-mcp | Stops, departures, trip planning, live Tallinn vehicle GPS | MIT | 2026-04-18 | `uvx estonian-transport-mcp` | yes | none |
| ehr-mcp | https://github.com/henriv/ehr-mcp | Ehitisregister building data, permits, In-ADS addresses | none declared | 2026-08-18 | self host, HTTP :3000/mcp | yes | optional own bearer |
| rik-mcp | https://github.com/margusliinev/rik-mcp | Äriregister open data dumps in Postgres, annual reports, EMTAK | MIT (README only) | 2026-08-24 | clone, Docker Postgres, Bun ingest | yes | none |
| riigiteataja-mcp | https://github.com/OJHela/riigiteataja-mcp | Act metadata and full text by id or URL | none declared | 2026-09-01 | self host uvicorn, not deployed | yes | none |
| ekilex_mcp | https://github.com/TisteAI/ekilex_mcp | Ekilex / Sõnaveeb dictionary lookups | none declared | 2025-12-15 | `npx ekilex-mcp`, Docker | yes | Ekilex API key |
| tartunlp-mcp | https://github.com/tbitu/tartunlp-mcp | TartuNLP translation API wrapper | MIT (badge) | 2026-02-16 | Docker ghcr.io/tbitu/tartunlp-mcp | yes | none |
| voro-mcp | https://github.com/Leo-Martin-Pala/voro-mcp | Võro language dictionary, corpus, GiellaLT, Neurotõlge | MIT (code) | 2026-07-10 | `make setup`, stdio | yes | none |
| Ansvar Estonian-law / competition / cybersecurity / data-protection MCPs | https://github.com/Ansvar-Systems (archived repos) | Riigi Teataja, Konkurentsiamet, RIA/CERT-EE, AKI, now via https://gateway.ansvar.eu/mcp | Apache-2.0 / custom | 2026-05 to 07 | remote gateway | yes | OAuth to Ansvar |
| legalize.dev MCP + legalize-ee | https://github.com/legalize-dev/mcp | Riigi Teataja acts as Markdown, multi country | MIT / NOASSERTION | 2026-09-02 | remote https://legalize.dev/mcp | mostly | sign in |
| buerokratt-mcp | https://github.com/IgorKrupenja/buerokratt-mcp | Coding rules for Bürokratt modules (developer tooling) | MIT | 2026-04-22 | docker-compose, HTTP :3627 | yes | none |
| eesti_ee_ai_mcp | https://github.com/dustinest/eesti_ee_ai_mcp | eesti.ai events search | MIT | 2026-08-12 | Cloudflare Worker | yes | none |
| wolt-mcp | https://github.com/fogside/wolt-mcp | Wolt venues and menus, Tallinn defaults, not Estonia specific | MIT | 2026-04-19 | clone | yes | none |

Not found: any MCP for X-tee, EMTA (beyond estonia-ai-kit WIP), Sõnaveeb official, ilmateenistus, eKool, Coop/Prisma, Riigikogu, Rahvusarhiiv, DIGAR. tehisintellektid.ee claims EMTA is working on an MCP; nothing public.

## Skills and prompts

| Name | URL | What | Content lang | License | Last update | Client |
|---|---|---|---|---|---|---|
| estonian-writing-assistant | https://github.com/silly-geese/estonian-mcp/blob/main/skills/estonian-writing-assistant/SKILL.md | Proofreading and register workflow on top of estonian-mcp | EN about ET | Apache-2.0 | 2026-09-10 | Claude, Codex, any MCP |
| estonian-grammar | https://github.com/alvarlaigna/agent-skills/tree/main/skills/estonian-grammar | Write and proofread Estonian, EKI first source order, four registers, references and templates | EN | MIT | 2026-06-28 | Agent Skills standard |
| toimeta-eestikeelset-teksti | https://github.com/erikuus/codex-skills/tree/main/toimeta-eestikeelset-teksti | Editing AI generated or translated Estonian text, staged workflow | ET | none declared | 2026-09-08 | Codex, portable SKILL.md |
| EKI promptipank | https://github.com/keeleinstituut/EKKD-III1/tree/main/promptipank | 12 Estonian prompts for lexicography (definitions, register labels) with sample outputs | ET | none declared | 2026-08-30 | any |
| asjaajaja | https://github.com/LarsEckart/asjaajaja | 6 skills: raamatupidaja, maksunõustaja, maksurevident, audiitor, notar, korteriühistu; sources.json of official sources | EN | MIT | 2026-05-08 | Codex, Claude Code, Cursor |
| estonia-skills | https://github.com/dmihhailov/estonia-skills | 9 citizen procedure skills (tax filing, OÜ, residence, driving licence, vanemahüvitis, Töötukassa...) | EN | MIT | 2026-05-05 | Claude Code plugin |
| taivop marketplace: estonia-public-sources, ester, estonian-store-search, estonian-newspaper-archive | https://github.com/taivop/marketplace | Router plus 86 source recipes for Estonian public data | EN | MIT | 2026-08-31 | Claude Code, Codex |
| estonia-vat-return | https://github.com/openaccountants/openaccountants/blob/main/agent-skills/estonia-vat-return/SKILL.md | KMD VAT return skill | EN | AGPL-3.0 code, custom content license | 2026-09-10 | Claude, ChatGPT, Cursor |
| elnora-merit-aktiva | https://github.com/Elnora-AI/elnora-merit-aktiva | 18 Merit Aktiva / Merit Palk skills | EN | Apache-2.0 | 2026-09-07 | Claude Code plugin, needs Merit API |
| grocery-manager | https://github.com/vibenya/grocery-manager | Household pantry and preferences skill, pairs with selver-mcp | EN | MIT | 2026-04-09 | Claude Code |
| estonian-annual-report | https://github.com/porydchik/arfiti-ee-annual-report | Majandusaasta aruanne checklist, vendor bound (Arfiti) | EN | none | 2026-03-05 | Claude Cowork |
| eresidency | https://github.com/AgentaOS/eresidency | e-Residency and OÜ formation guidance | EN | MIT | 2026-03-09 | Claude Code |
| elo-plugin | https://github.com/elohq/elo-plugin | Estonian language Claude Code workflow plugin with EU/Eesti frame | ET | MIT | 2026-05-14 | Claude Code |
| Seadusloome system prompt | https://github.com/henrikaavik/Seadusloome/blob/main/app/chat/system_prompt.py | Legal drafting advisor prompt, app bound | ET | none | 2026-06-14 | app |
| Tehisarukas 50 käsklust | https://tehisarukas.ee/chatgpt-eesti-keeles-50-praktilist-kasklust/ | 50 generic Estonian prompts | ET | copyright | 2025-12 | ChatGPT |
| Custom GPTs: Eesti keele automaattoimetaja, Eesti keele toimetaja, Eesti Võlaõigus, Riigi Teataja, Eesti Keeles Kirjutaja, Eesti GPT | chatgpt.com/g/... (see agent notes) | Estonian editing and law GPTs | ET | n/a | unknown | ChatGPT; creators and instructions not inspectable without login |

Not found: Estonia specific Cursor rules or Copilot instruction files. Estonian material lives in SKILL.md format and custom GPTs.

## Datasets and APIs

| Name | URL | Access | License | Docs |
|---|---|---|---|---|
| e-Äriregistri avaandmed | https://avaandmed.ariregister.rik.ee/en | bulk CSV/XML/JSON/Parquet daily, no auth; XML API needs contract | CC BY 4.0 | ET, EN |
| Riigi Teataja avaandmed and search API | https://www.riigiteataja.ee/avaandmed/ERT/ , https://www.riigiteataja.ee/api/oigusakt_otsing/1/otsi | bulk XML, JSON search, no key | unknown | ET |
| Statistikaamet PxWeb API | https://andmed.stat.ee/api/v1/et | REST, no key, 1000 calls per 10 s | CC BY-SA 4.0 | ET, EN |
| andmed.eesti.ee API | https://andmed.eesti.ee/api/datasets | REST JSON, no key, 5 723 datasets | portal: free reuse; per dataset unknown | ET, EN |
| Elering Dashboard API | https://dashboard.elering.ee/api , spec /v3/api-docs | REST JSON/CSV, no auth (Nord Pool prices, system data) | unknown | EN |
| TartuNLP translation API | https://api.tartunlp.ai/translation/v2 | POST JSON, optional `x-api-key: public` | code MIT, ToS on tartunlp.ai | EN |
| TartuNLP TTS API | https://api.tartunlp.ai/text-to-speech/openapi.json | REST | code MIT | EN |
| Ekilex API | https://github.com/keeleinstituut/ekilex/wiki/Ekilex-API | REST, API key from ekilex.ee profile | CC BY 4.0 | EN wiki |
| Riigikogu API | https://api.riigikogu.ee/ | REST JSON, no auth, 1 req/s | CC BY-SA 3.0 | ET, EN |
| Maa-amet OGC services | https://geoportaal.maaamet.ee/eng/services/public-wms-wfs-p346.html | WMS/WFS/WCS/WMTS, no auth | Maa-amet open data licence (CC BY 4.0 equivalent per FAQ) | ET, EN |
| Ilmateenistus XML | https://ilmateenistus.ee/ilma_andmed/xml/observations.php | XML, no key | attribution required | ET, EN, RU |
| Ühistranspordiregister GTFS | https://peatus.ee/gtfs/gtfs.zip | GTFS zip | free use, no CC named | ET |
| Tallinn transport stops | https://transport.tallinn.ee/data/stops.xml | XML | unknown | ET |
| EMTA quarterly taxes, turnover, employees | https://www.emta.ee/en/private-client/board-news-and-contacts/news-press-information-statistics/statistics-and-open-data | CSV/XLSX | free reuse, no CC named | ET, EN, RU |
| TEHIK avaandmed | https://teabekeskus.tehik.ee/et/avaandmed | REST/OData | CC BY-SA 4.0 | ET |
| EHIS avaandmed | http://enda.ehis.ee/avaandmed/ (REST, from andmed.eesti.ee metadata) | REST CSV/XML/JSON | unknown | ET |
| TartuNLP models on Hugging Face | https://huggingface.co/tartuNLP | download | EstBERT CC BY 4.0; EstLLM Llama 3.1 licence | EN |
| Rahvusarhiivi avaandmed | http://www.ra.ee/apps/opendata/ | apeEAD XML, ZIP | metadata CC0, images CC BY-SA | ET |
| Rahvusraamatukogu data.digar.ee | https://data.digar.ee/ | OAI-PMH, XML | CC BY-SA 3.0 EE | ET |

## Guidance documents (possible retsept entries, or a new type)

| Title | URL | Publisher | Date | Lang |
|---|---|---|---|---|
| Tehisaru kasutusele võtjale (deployer checklist) | https://www.aki.ee/tehisaru/tehisaru-ja-andmekaitse/tehisaru-kasutusele-votjale | Andmekaitse Inspektsioon | 2026-07-24 | ET |
| Tehisintellekti määrus explainer | https://www.aki.ee/tehisaru/tehisaru-ja-andmekaitse/tehisintellekti-maarus | Andmekaitse Inspektsioon | 2026-07-13 | ET |
| TARK: tehisaru rakenduste usaldusväärsuse hindamine | https://www.kratid.ee/tark | Justiits- ja Digiministeerium / RIA | 2024 | ET |
| Generatiivse tehisaru e-kursused | https://digiriigiakadeemia.ee/course/index.php?categoryid=60 | Digiriigi Akadeemia | 2025-09 | ET |
| Avaandmed: API üldjuhend | https://digiriik.eesti.ee/juhend/avaandmed-api-uldjuhend | Justiits- ja Digiministeerium | unknown | ET |
| Tehisaru kasutamine eestikeelsete tekstide keeletoimetamisel (Õiguskeel) | https://www.justdigi.ee/sites/default/files/documents/2025-10/3.%20S%C3%B6%C3%B6t_Tehisaru%20keeletoimetamisel.pdf | Kirke Sööt | 2025-10 | ET |
| RIA AI/ML risk study | https://www.ria.ee/sites/default/files/documents/2024-03/Tehisintellekti-masinoppe-tehnoloogia-riskide-uuring-2024.pdf | RIA | 2024-02 | ET |
| Tehisintellekti tegevuskava 2024–2026 | https://www.mkm.ee/media/10157/download | MKM, JM, HTM | 2024 | ET |
| Tehisaru juhend 2024 (schools) | https://www.hm.ee/sites/default/files/documents/2024-03/Tehisaru%20juhend%202024.pdf | HTM | 2024-01 | ET |
| Tartu Ülikool AI materials hub | https://sisu.ut.ee/ti/materjalid/ | Tartu Ülikool | 2024–2025 | ET |
| UT: AI tools in academic writing (with prompts) | https://www.teadustekst.ut.ee/tehisintellektil-pohinevate-tooriistade-kaasamine-kirjutamisprotsessi/ | Tartu Ülikool | 2025-12 | ET |
| TalTech AI for teaching staff and eeskiri | https://ai.taltech.ee/ai-kasutamine-taltechis/oppejoule/ | TalTech | 2026-08 | ET, EN |
| Algoritmilise kallutatuse riskihalduse juhend | https://www.volinik.ee/infomaterjalid/algoritmilise-kallutatuse-riskihalduse-juhend | Võrdõigusvolinik | 2025 | ET |
| Eesti tehisaru kirjaoskuse pädevusmudel | https://eesti.ai/padevusmudel | Eesti.ai, Tallinna Ülikool | 2026-06 | ET, EN |

## Observations

- The Nimistu family (nimistu, lahend, dokumendiregister), estonian-mcp, mcp-stat-ee and LHV are remote HTTP servers with no install step, the easiest for non developers.
- Several useful repos declare no license (erikuus skill, EKI promptipank, ehr-mcp, ekilex_mcp, OJHela). Listing them is fine; the `license` field would say "none declared" and the maintainer should ask the authors.
- Writing MCPs (e-arveldaja, both Selver servers, estonia-ai-kit CLIs) need a clear `security_note`.
- The guidance documents are not workflow recipes. Either treat them as `retsept` loosely or add a `juhend` type to the taxonomy.
