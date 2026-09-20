# 05. Merge and dedupe strategy

## Source inventory

| Family | Files | Trust | What it contributed | Caveats |
|---|---|---|---|---|
| Claude | `claude-mcce-resources-tools.md`, `thesis/claude-*` (2) | High | Clean 14-category tool list, honest exclusions of unverifiable names, license notes on repos | Short. Repo list is small |
| Big Pickle | `big-pickle-*` (3), plus near copies `kilo-*` (3) and `ling-*` (3) | High, counted once | Category ids, badge conventions, stage-ordered thesis toolkit, license-annotated repos, governance rules | Kilo adds defense and integrity rows; Ling adds a few extra rows. Both are otherwise Big Pickle verbatim |
| DeepSeek v4 Flash | `deepseek-v4-flash-*` (3) | High | The deepest per-course tool atlas, the reuse-class model, maintenance watchlist, implementation section grounded in this repo | Course-first structure has to be re-cut by tool type |
| Gemini | `gemini-*` (3) | High | Seven-badge taxonomy that matches the decision, per-course tables, phase-ordered thesis method | Proposes `src/data/resources.json` hand-edited, rejected in `03` |
| Mimo v2.5 | `mimo-v2.5-*` (3) | High | Big Pickle structure with extra rows (Desmos, Audacity, CommPy, Gpredict, Skyfield, Mininet, scikit-image, FFmpeg, Pandoc) and a decision-ordered thesis guide | Largely derivative |
| Muse Spark 1.2 | `muse-spark-1.2-*` (3) | High | Independent picks (Julia, NetworkX, Copilot, DBLP, CORE, TeXlyre, ColRev, CADIMA, Open Access Button, DART-Europe) | |
| Muse Spark 1.3 | `muse-spark-1.3-*` (3) | High | Task-group cut, two start-here picks per course, extra repos (komm, pixi, supervision, Orekit, SatPy, xgboost, LightGBM, cmdstanpy) | Some repo owners wrong (see verification list) |
| Poolside Laguna | `poolside-*` (3) | High for hub and toolkit, medium for repos | Semester journey, modifiers model, largest repo list | Repo list includes personal thesis repositories and one-off projects that fail the inclusion rule |
| ChatGPT | `chatgpt-*` (3) | Medium | Broad SLR and open-access coverage, curation principles, metadata schema | Repo list has GitHub search links and some unverified owners |
| DeepSeek Web | `deepseek-web-*` (3) | Medium for hub and toolkit, low for repos | Same as Claude hub plus SageMath, PySDR, Velxio, Make Sense, CrypTool, ResearchRabbit, Elicit, JetBrains | Repo list is mostly small personal projects |
| Perplexity | `perplexity-*`, `thesis/preplexity-*` (2) | Medium for hub and toolkit, discard for repos | Widest generic coverage, "by purpose" search vocabulary, featured-tools idea | Toolkit has invented URLs marked "replace with actual". Repo index: 147 of 200 links are `your-org` placeholders |
| Zai | `zai-*` (3) | Low | A few extra everyday tools (Anki, Obsidian, Logseq, Joplin, DaVinci Resolve) | Hub is a generic student list with a medical section and emoji; toolkit has fabricated URLs (`prism.openai.com`, `github.com/reviq/reviq`, `thoth.io`); repos list mixes real and invented owners |

## Inclusion rule

A tool enters the catalog when either:

1. It appears in two or more source families (Big Pickle, Kilo, and Ling
   count as one), or
2. It appears in one high-trust family with an official URL and a
   one-sentence reason tied to an MCCE course or thesis stage.

A tool from a low-trust family only enters when a high-trust family also
lists it, or when it is a well-known product whose official URL is beyond
doubt (Anki, Obsidian). Everything else is recorded in the exclusions table
with the reason.

Repositories follow the same rule with one addition: the repository must be
the canonical home of the project, not a fork, a mirror of a non-GitHub
canonical (noted when kept), a personal thesis project, or a GitHub search
URL.

## Canonical identity

- `id` is the kebab slug of the canonical name: `google-scholar`,
  `zotero-better-bibtex`, `gnu-radio`. Product renames keep the old id
  (`diagrams-net` stays even though people say draw.io; `draw.io` goes in
  `aliases`).
- `name` is the product's own spelling: "diagrams.net", "GNU Octave",
  "scikit-learn", "Weights & Biases" is written "Weights and Biases" because
  the craft rules avoid decorative characters in UI copy; the ampersand form
  goes in `aliases`.
- `url` is the official product page, `https`, no `www` unless the site
  redirects to it, no trailing slash, no tracking params, no `/download`
  or blog paths. For libraries, the docs site beats the GitHub page when
  one exists (SciPy, pandas); the GitHub page is the repo entry.
- Two things with the same name get distinct ids and a disambiguating name:
  `scholarly-python` ("scholarly (Python package)") and
  `scholarly-writing-skill` ("Scholarly (writing skill)").

### URL normalisation table

Where drafts disagreed, the left column wins.

| Canonical | Seen as |
|---|---|
| `https://chatgpt.com` | `chat.openai.com` |
| `https://www.researchrabbit.ai` | `researchrabbitapp.com` |
| `https://elicit.com` | `elicit.org` |
| `https://consensus.app` | `consensus.ai` |
| `https://scite.ai` | `Scite.ai` |
| `https://www.undermind.ai` | `undermind.ai` |
| `https://iperf.fr` | `software.es.net/iperf` (both are official; `.fr` is the project site) |
| `https://parsif.al` | `parsifal.com.br`, `parsifal.cin.ufpe.br` (verify which resolves) |
| `https://relis.iro.umontreal.ca` | `relis-tool.org`, `relis.irit.fr`, `github.com/geodes-sms/relis` (repo goes to the repo index) |
| `https://thoth-slr.com` | `thoth.io` |
| `https://github.com/philipphaindl/ReviQ` | `reviq.org`, `github.com/reviq/reviq`, a ScienceDirect article |
| `https://www.ebsco.com/open-dissertations` | `biblioboard.com/opendissertations`, `bibliobase.com` |
| `https://ndltd.org` | `www.ndltd.org` |
| `https://www.jetbrains.com/community/education` | `/#students`, `jetbrains.com/student` |
| `https://www.mathworks.com/academia/students.html` | `mathworks.com/academia`, `/tah-portal.html`, `/student-option.html` |
| `https://nvlabs.github.io/sionna` | trailing-slash variant; Sionna RT folds into this entry |
| `https://posit.co/products/open-source/rstudio` | `rstudio.com`, `posit.co` root |
| `https://www.stirlingpdf.com` | `stirlingpdf.com`, GitHub URL (repo index) |
| `https://www.sdrpp.org` | `github.com/maxxeddu/sdrpp` (wrong owner; canonical repo is `AlexandreRouma/SDRPlusPlus`) |

### Repository owner corrections

Rows where at least one draft named the wrong owner. The canonical owner
must be confirmed on GitHub during Phase 0.

| Project | Wrong in drafts | Likely canonical |
|---|---|---|
| GROBID | `grobidOrg/grobid` | `kermitt2/grobid` |
| librosa | `audiolabs/librosa` | `librosa/librosa` |
| PySDR | `pysdr/pysdr` | `777arc/PySDR` |
| gr-osmosdr | `bastibl/gr-osmosdr` | `osmocom/gr-osmosdr` |
| komm | `mitexleo/komm` | `rwnobrega/komm` |
| manubot | `greenelab/manubot` and `manubot/manubot` | `manubot/manubot` |
| OpenDraft | `PhilioAI/opendraft` and `federicodeponte/opendraft` | Verify; two different projects may share the name |
| Deep Researcher | `jackswl/deep-researcher`, `Daiduo0349/deep-researcher`, `HKUDS/Auto-Deep-Research` | Three different projects; keep only what verifies |
| labelme | `agentmorris/labelme` | `wkentaro/labelme` |
| OpenOCD | `raspberrypi/openocd` | `openocd-org/openocd` |
| SimPy | `KubaO/py-simpy`, `SimPy/simpy` | Canonical is on GitLab; GitHub has mirrors only. Mark `check` |
| 5G-LENA | `cttc-nr/5g-lena` | Canonical is on GitLab (`cttc-lena/nr`). Keep as a tool entry, not a repo |
| Simu5G | `simu5g/simu5g` | `Unipisa/Simu5G` |
| OpenAirInterface | `OPENAIRINTERFACE/openairinterface5g`, `openairinterface/openairinterface5g` | GitHub is a mirror of `gitlab.eurecom.fr`; keep with a mirror note |
| Suricata | `suricata/suricata` | `OISF/suricata` |
| SHAP | `slundberg/shap` | `shap/shap` |
| Zephyr | `zephyrproject/zephyr` | `zephyrproject-rtos/zephyr` |
| Skyfield | `rhodesmill.org` personal path | `skyfielders/python-skyfield` |
| CMSIS | `ARM-software/CMSIS_5` | Archived; successor `ARM-software/CMSIS_6`, DSP lives in `ARM-software/CMSIS-DSP` |
| Weka | `cs.waikato.ac.nz/ml/weka` GitHub claim | Not on GitHub; tool entry only |
| ProjectLibre | GitHub claim | SourceForge; tool entry only |
| GMAT | `nasa/GMAT` | Verify; primary distribution is SourceForge |
| Ryu | `faucetsdn/ryu` | Correct owner but the project is unmaintained; `dormant` |
| Cuckoo | `cuckoosandbox/cuckoo`, `cuckoo/cuckoo` | Archived; note or drop |

## Badge conflict resolution

Applied in order:

1. `verification: "liu"` beats everything for IEEE Xplore, ACM DL, Scopus,
   Web of Science, SpringerLink, ScienceDirect, MATLAB, Simulink, Turnitin,
   EndNote, and the LIU library row. Badge `university`.
2. If any high-trust family says Freemium and another says Free, use
   Freemium (NotebookLM is the exception: five of six say Free and Google
   documents no paid tier for the core; keep Free with `verifiedOn`).
3. If a draft says Paid and another says Student, use Student when a
   student program exists (Multisim, STK) and Paid otherwise.
4. Open source is decided from the project's license, not from any draft's
   badge column.
5. Ties left over go to the more conservative badge and the row gets
   `verification: "pending"`.

Rows where this rule changed a draft's badge: Wokwi (Free in four drafts,
Freemium in three; Freemium wins), Mendeley (Free vs Freemium; Freemium),
KNIME (Free vs Freemium; Freemium), Obsidian (Free vs Freemium; Freemium,
sync is paid), GitHub (Free vs Freemium; Freemium), Docker (Free vs
Freemium; Free, Desktop is free for education and personal use, note it),
Cisco Packet Tracer (Free vs Student; Student, NetAcad account).

## Exclusions

| Item | From | Reason |
|---|---|---|
| Kenhub, AMBOSS, Osmosis, Lecturio, Sketchy, OnlineMedEd, Zero to Finals, Passmedicine, Radiopaedia, PubMed | Zai cat. 6 | Medical education, not an MCCE need |
| YouLearn, StudyCards AI, Merlin, Brainscape, RemNote, Memrise, StudyStack | Zai | Generic study apps, single low-trust source |
| Google Drive, OneDrive, Dropbox, Mega, pCloud, Sync.com, Slack, Discord, Zoom, Meet, Teams, Asana, ClickUp | Zai, Perplexity, ChatGPT | Generic storage and chat. The site is a Drive index; a "Google Drive" card is noise |
| Roam, XMind, MindMeister, Coggle, Whimsical, Slidesgo, SlidesCarnival, Prezi, Focus To-Do, Forest, Toggl, Reclaim, Cold Turkey, RescueTime | Zai | Single low-trust source, no engineering use |
| Bitwarden, KeePass, Proton Pass, 1Password, LastPass | Zai cat. 17 | Password managers are advice, not study tools |
| LeetCode, HackerRank, Codeforces, GeeksforGeeks, Codewars | Zai | Interview prep, outside scope |
| Shotcut, DaVinci Resolve, OpenShot, YouTube | Zai | Video editing and a video site |
| Google Scholar Labs | DeepSeek Web, Perplexity, Zai | Claude's pass could not verify it as a product; Scholar itself covers it |
| Iris.ai, Scisummarizer, Scholarcy, Paperpal, Jenni AI, R Discovery, Trinka, SWIFT-Review, SysRev, EPPI-Reviewer, Citavi, Paperpile, Docear, PlagScan, Ouriginal, Viper, Plagiarisma, Plagiarism Detector, Tableau, NI Academic | Perplexity, Zai | Single low-trust source, or paid tools with no student path |
| Free-Turnitin-Plagiarism-Checker | DeepSeek Web, Zai | Unofficial, implies circumvention; ChatGPT and Claude both reject it |
| SmallSEOTools | several | Uploading a thesis to an SEO site is a privacy problem; DupliChecker and Quetext cover the same need |
| IPPOLIS Write, Synthesis Lab, Tzukwan CLI, CONNECT, LinkR, EDAmame (as a data tool) | DeepSeek Web, Perplexity, Zai | ChatGPT and Claude could not verify identity or URL; EDAmame and LinkR are domain-scoped to biology and health |
| Favicon scraping via `google.com/s2/favicons` | Zai | Runtime external fetch, blocked by the offline model and the icon plan |
| Robotics group (ROS 2, Gazebo, Webots, MAVLink, PX4, ArduPilot, SLAM) | ChatGPT, DeepSeek Web, Perplexity | No MCCE course. Recorded for a future "beyond the syllabus" group |
| Personal thesis repositories (`delaidam/Thesis-RTOS-Analysis`, `kirlf/cubesats`, `AlessandroConti11/CryptAttackTester`, `Yellow-Fever/DISSERTATION`, `maxwellvaglica/info-security-portfolio`) | Poolside, DeepSeek Web | Not tools |
| GitHub search URLs presented as repos | ChatGPT, Big Pickle (pentesting topic) | Not a repository |
| Every `your-org` link | Perplexity repos | Placeholder |
| Ostinato, VPP, CelPlan, Datasheet Archive, Electronics-Tutorials, SubnetOnline, IP Calculator, Unsplash, Pexels, Flaticon, IconScout, Noun Project, Simple Icons, remove.bg, TinyPNG, Sejda, PDFWix, PDF.io | various single sources | Too niche or off-topic for a first catalog; easy to add later |

## Verification list for Phase 0

Rows that must be checked by a human before they ship with a firm badge or
URL, ordered by how badly a wrong value would mislead a student:

1. LIU library subscriptions: IEEE Xplore, ACM DL, Scopus, Web of Science,
   SpringerLink, ScienceDirect, Wiley. Also the portal URL itself
   (`liu.edu.lb` root vs `library.liu.edu.lb`, both appear in drafts).
2. MATLAB and Simulink campus or student license status.
3. Turnitin availability and whether the department uses it.
4. Papers with Code: confirm it still resolves. It was reported as folded into
   Hugging Face in 2025; if so, the entry points at Hugging Face Papers.
5. Free-tier terms with recent churn: Wokwi, Roboflow, KNIME, Weights and
   Biases, Colab, Connected Papers (five graphs a month), Overleaf compile
   limits, GitHub Copilot in the Student Pack.
6. The 2026 writing tools (Oleafly, tinyleaf, TeXbrain, OpenPrism, TeXlyre,
   FlowTex, Scholarly writing skill, OpenDraft, Deep Researcher, thesis-rag):
   confirm repo, license, and that the project is alive. Ship as
   `experimental`.
7. Every owner in the corrections table above.
8. STK student edition, Keil MDK Community edition terms, Multisim student
   edition.
9. Sionna RT is now part of Sionna; confirm the docs URL.
10. Parsifal domain.
