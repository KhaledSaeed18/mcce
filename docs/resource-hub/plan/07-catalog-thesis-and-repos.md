# 07. Thesis stages and repository index

## Part A. Thesis stage configuration

Input for `src/config/resources/thesis-stages.ts`. Tools are referenced by
the ids in `06`; the thesis page reads `thesisStages` off each tool, so this
table is the authoring checklist, not a second list. "First picks" carry
`featured: true` on the tool and render first in the stage section.

| Order | Stage | Term | First picks | Also here | Stage note (two sentences, for the section header) |
|---|---|---|---|---|---|
| 0 | Frame the topic | A | openalex, papers-with-code, dblp | scimago, google-scholar-metrics, open-knowledge-maps, ieee-template-selector, gpt-researcher | Lock the problem sentence, method family, dataset or testbed, baselines, and target venue before searching in depth. Bring three candidate titles and five seed papers to the first advisor meeting. |
| 1 | Systematic search | A | google-scholar, semantic-scholar, arxiv | openalex, ieee-xplore, acm-dl, scopus, web-of-science, springerlink, sciencedirect, base, undermind, perplexity | Record database, exact query, date, and hit count for every search, including the ones that found nothing. Run each query in at least two databases. |
| 2 | Citation graph widening | A | research-rabbit, connected-papers | litmaps, inciteful, scite | Start from five to ten seed papers and map what they cite and what cites them. Stop when a new round returns only papers already in the collection. |
| 3 | Get the PDF legally | A | unpaywall, arxiv | open-access-button, core | Work the list top down before asking anyone for a copy. Paywalled sources go through the LIU library, never a mirror. |
| 4 | Screen and synthesise | A | asreview, notebooklm | rayyan, reviq, colrev, cadima, thoth, parsifal, relis, prisma-2020, kitchenham-guidelines, elicit, consensus, scispace, explainpaper, chatpdf, claude, chatgpt, gemini, obsidian, zotero | Define inclusion criteria before screening, then log every exclusion. An AI memo may summarise a paper you included; it must never be the source of a citation. |
| 5 | Reference hygiene | A | zotero, zotero-better-bibtex | jabref, mendeley, crossref, doi-org, zoterobib, zotero-shortdoi | Pick one manager by week two and never keep two libraries. One `references.bib` at the repository root, stable keys, weekly DOI check. |
| 6 | Read prior theses | A | oatd, ndltd | ebsco-open-dissertations, dart-europe, openaire, digital-commons-network, proquest-open, hal | For each prior thesis note the question, method, testbed, baselines, metrics, and chapter lengths. That table becomes the scope model for the proposal. |
| 7 | Experiments and data | B | jupyter, docker, dvc | github, mlflow, weights-and-biases, optuna, hydra, snakemake, miniforge, google-colab, kaggle, gnu-octave, matlab, gnu-radio, sionna, comnumpy, kaira, deepmimo, ns-3, wireshark, opencv, label-studio, cvat, fiftyone, pytorch, scikit-learn, vs-code | Reproduce a published baseline before building anything new. One command must regenerate every reported figure from raw inputs, or the work is a draft. |
| 8 | Analysis and figures | B | matplotlib, pandas, quarto | numpy, scipy, seaborn, statsmodels, pingouin, r-rstudio, jasp, jamovi, inkscape, graphviz, pgfplots-tikz | Report a mean and a dispersion for every number; a single run proves nothing. Vector figures with matched fonts and a colormap that survives greyscale. |
| 9 | Write and typeset | B | quarto, overleaf, typst | pandoc, lyx, texstudio, latex-workshop, tex-live, ieee-template-selector, academic-phrasebank, grammarly, languagetool, deepl-write, writefull, hemingway, texlyre, oleafly, tinyleaf, texbrain, openprism, flowtex, scholarly-writing-skill, opendraft | Confirm the thesis office template first; it decides LaTeX, Typst, or Word. Write methodology and setup in term one, before results exist. |
| 10 | Integrity and archiving | B | jplag, zenodo, osf | turnitin, copyleaks, quetext, duplichecker, scribbr-checker, orcid, howfairis | Every citation resolves to a paper you opened, and every figure has a generating script. Tag the commit that produced the results and mint a DOI for it. |
| 11 | Plan the work and defend | B | projectlibre, github-projects, marp | ganttproject, openproject, notion, trello, beamer, google-slides, canva, obs-studio, gradio, mermaid-live | Mirror the plan as a Gantt with proposal, mid-review, and defense as fixed milestones. Build the deck from the same source as the thesis so numbers cannot drift. |

Default stack table (one per stage, shown at the end of the thesis page):
openalex, google-scholar, research-rabbit, unpaywall, asreview, zotero, oatd,
docker, matplotlib, quarto, zenodo, projectlibre.

Route map copy (one table, from the Big Pickle family, kept because four
drafts agree on the shape): CENG695A weeks 1 to 4 frame, 5 to 10 search and
read, 11 to 16 proposal; CENG695B weeks 1 to 8 implement, 9 to 12 analyse,
13 to 16 polish and submit. Shown as a small table under the hero.

## Part B. Repository index draft

Input for `src/config/resources/repos/*.ts`. Every row is `owner/name`, a
one-line description, license, reuse class, maintenance, and the tool id it
belongs to when one exists. Rows marked `verify` have an owner correction
pending (see the table in `05`). Rows marked `mirror` are GitHub mirrors of
a canonical elsewhere and say so in `note`.

Reuse class abbreviations: P permissive, W weak copyleft, C copyleft, K check.

### Backbone

#### writing (18)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| jgm/pandoc | Universal document converter with citations | GPL-2.0-or-later | C | active | pandoc | |
| quarto-dev/quarto-cli | Reproducible publishing from Markdown plus code | MIT | P | active | quarto | |
| typst/typst | Typst compiler | Apache-2.0 | P | active | typst | |
| Myriad-Dreamin/tinymist | Language server for Typst | Apache-2.0 | P | active | typst | |
| lyx/lyx | Structured editing over LaTeX | GPL-2.0-or-later | C | steady | lyx | |
| texstudio-org/texstudio | Desktop LaTeX editor | GPL-3.0 | C | active | texstudio | |
| TeXworks/texworks | Lightweight LaTeX editor | GPL-2.0-or-later | C | steady | | |
| James-Yu/LaTeX-Workshop | VS Code LaTeX extension | MIT | P | active | latex-workshop | |
| marp-team/marp | Markdown slide decks | MIT | P | active | marp | |
| manubot/manubot | Git-based manuscripts with DOI citations | BSD-2-Clause | P | steady | | verify |
| TeXlyre/texlyre | Local-first LaTeX and Typst editor | AGPL-3.0 | C | active | texlyre | new |
| Oleafly/Oleafly | Local-first writing workspace | check | K | active | oleafly | new, verify |
| Oaklight/tinyleaf | Self-hosted Overleaf alternative | check | K | active | tinyleaf | new |
| swimmingbrain/texbrain | Browser LaTeX editor with WASM compile | check | K | active | texbrain | new |
| OpenDCAI/OpenPrism | LaTeX plus AI workspace | MIT | P | active | openprism | new |
| stolucc/flowtex | Collaborative self-hosted LaTeX | check | K | active | flowtex | new |
| ShiyangZheng/scholarly | Section-by-section writing skill | MIT | P | active | scholarly-writing-skill | new |
| PhilioAI/opendraft | Multi-agent draft generator | MIT | P | active | opendraft | new, verify |

#### templates (6)

Recommend linking the two GitHub topic pages (`thesis-template`,
`typst-template`) from the section tagline, and listing these as examples
to adapt to LIU formatting once it is known.

| Repo | Description | License | Class | Maint. | Flags |
|---|---|---|---|---|---|
| Splines/typst-thesis-starter | Typst thesis scaffold | Unlicense | P | steady | |
| StanfordHPDS/typst-stanford-thesis | Dissertation template in Typst and Quarto | MIT | P | steady | |
| joaomlourenco/novathesis | LaTeX template serving many schools | LPPL | K | active | |
| RuedigerVoigt/LaTeX-Thesis-Template | Thesis template with draft mode and build scripts | check | K | steady | |
| goethe-tcs/thesis-template | Minimal modern LaTeX thesis | MIT | P | steady | |
| ctu-mrs/thesis_template | Thesis template with build automation | check | K | steady | |

#### references (9)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| zotero/zotero | Zotero desktop client | AGPL-3.0 | C | active | zotero | |
| retorquere/zotero-better-bibtex | Stable keys and BibTeX export | MIT | P | active | zotero-better-bibtex | |
| JabRef/jabref | BibTeX-native manager | MIT | P | active | jabref | |
| sciunto-org/python-bibtexparser | Parse and validate .bib files | LGPL-3.0 | W | active | | |
| citation-js/citation-js | Citation parsing and formatting | MIT | P | active | | |
| bwiernik/zotero-shortdoi | DOI fetch and check plugin | MIT | P | steady | zotero-shortdoi | |
| citation-style-language/styles | CSL style repository | CC-BY-SA-3.0 | K | active | | |
| FlamingTempura/bibtex-tidy | Clean and sort BibTeX | MIT | P | active | | |
| Juris-M/citeproc-js | CSL citation processor in JavaScript | CPAL/AGPL | K | steady | | |

Dropped: `jgm/pandoc-citeproc` (archived, folded into pandoc),
`thewrenapp/wren` and `papis/papis` (single source; add later if wanted).

#### review (11)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| asreview/asreview | Active-learning screening | Apache-2.0 | P | active | asreview | |
| philipphaindl/ReviQ | Docker review workbench with PRISMA output | check | K | active | reviq | new |
| CoLRev-Environment/colrev | Git-native review environment | MIT | P | active | colrev | |
| geodes-sms/relis | Multi-reviewer screening platform | AGPL-3.0 | C | steady | relis | |
| Proportione/prisma | PRISMA 2020 and MMAT toolkit with CLI | MIT | P | active | | new |
| lars-ulaval/metaScreener | Desktop title and abstract screening | check | K | active | | new |
| Open-and-Sustainable/prismAId | AI-assisted protocol reviews | MIT | P | active | | new |
| Thoth2023/thoth-remake | Review tool with Crossref snowballing | check | K | steady | thoth | verify |
| NLeSC/litstudy | Bibliometric analysis of a paper set | Apache-2.0 | P | steady | | |
| massimoaria/bibliometrix | Science mapping in R | GPL-3.0 | C | active | | |
| ropensci/revtools | Screening and organising bibliographic data in R | GPL-3.0 | C | dormant | | |

#### scholarly-apis (7)

| Repo | Description | License | Class | Maint. | Flags |
|---|---|---|---|---|---|
| scholarly-python-package/scholarly | Google Scholar metadata from Python | Unlicense | P | steady | |
| danielnsilva/semanticscholar | Semantic Scholar API client | MIT | P | active | |
| ourresearch/openalex-api | OpenAlex API docs and examples | MIT | P | active | verify |
| fabiobatalha/crossrefapi | Crossref REST client | BSD-2-Clause | P | dormant | watchlist |
| karpathy/arxiv-sanity-lite | Self-hosted arXiv recommender | MIT | P | dormant | watchlist |
| papers-we-love/papers-we-love | Curated classic papers | BSD-3-Clause | P | active | |
| allenai/paper-scraper | Bulk PDF acquisition utilities | check | K | unverified | verify |

#### reading (5)

| Repo | Description | License | Class | Maint. | Flags |
|---|---|---|---|---|---|
| kermitt2/grobid | Structured extraction from PDFs | Apache-2.0 | P | active | verify |
| pymupdf/PyMuPDF | Fast PDF parsing and rendering | AGPL-3.0 | C | active | |
| pdfminer/pdfminer.six | Layout-aware PDF text extraction | MIT | P | active | |
| Jit-EASE/literature-mapper | PDFs to a knowledge graph with gap detection | MIT | P | active | new |
| lancedb/e2m | Documents to Markdown for pipelines | Apache-2.0 | P | active | |

#### rag-agents (9)

Section note: agents map a field and draft structure. Any drafted paragraph
is rewritten in the student's own analysis and checked against the cited
papers, under LIU integrity rules.

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| Future-House/paper-qa | Cited question answering over local papers | Apache-2.0 | P | active | | |
| stanford-oval/storm | Cited long-form topic reports | MIT | P | active | | |
| HKUDS/LightRAG | Graph plus vector retrieval over documents | MIT | P | active | | |
| infiniflow/ragflow | Document RAG engine with a GUI | Apache-2.0 | P | active | | |
| run-llama/llama_index | Indexing layer for private research collections | MIT | P | active | | |
| deepset-ai/haystack | Search, QA, and RAG pipelines | Apache-2.0 | P | active | | |
| assafelovic/gpt-researcher | Autonomous research agent with cited reports | Apache-2.0 | P | active | gpt-researcher | |
| binary-husky/gpt_academic | Paper reading and LaTeX-aware review assistant | GPL-3.0 | C | active | | watchlist |
| open-webui/open-webui | Self-hosted UI for local models | check | K | active | | watchlist (license changed, branding clause) |

#### reproducibility (12)

| Repo | Description | License | Class | Maint. | Tool |
|---|---|---|---|---|---|
| iterative/dvc | Data and model versioning beside Git | Apache-2.0 | P | active | dvc |
| mlflow/mlflow | Experiment tracking and model registry | Apache-2.0 | P | active | mlflow |
| aimhubio/aim | Self-hosted run comparison | Apache-2.0 | P | active | aim |
| optuna/optuna | Hyperparameter search with pruning | MIT | P | active | optuna |
| facebookresearch/hydra | Experiment configuration as files | MIT | P | active | hydra |
| snakemake/snakemake | Pipelines as a rerunnable DAG | MIT | P | active | snakemake |
| mamba-org/mamba | Fast conda-compatible solver | BSD-3-Clause | P | active | miniforge |
| conda-forge/miniforge | Minimal conda-forge distribution | BSD-3-Clause | P | active | miniforge |
| prefix-dev/pixi | Environment lock for Python plus system deps | BSD-3-Clause | P | active | |
| iterative/cml | Experiment metrics as PR comments | Apache-2.0 | P | steady | |
| python-poetry/poetry | Dependency management with lockfiles | MIT | P | active | |
| pre-commit/pre-commit | Checks before every commit | MIT | P | active | |

#### integrity (8)

| Repo | Description | License | Class | Maint. | Tool |
|---|---|---|---|---|---|
| jplag/JPlag | Structural source code similarity | GPL-3.0 | C | active | jplag |
| dodona-edu/dolos | Source code plagiarism detection | MIT | P | active | |
| fair-software/howfairis | FAIR metadata score for a repository | Apache-2.0 | P | steady | howfairis |
| zenodo/zenodo | The Zenodo platform | GPL-2.0 | C | active | zenodo |
| CenterForOpenScience/osf.io | The OSF backend | Apache-2.0 | P | active | osf |
| microsoft/presidio | PII detection and anonymisation | MIT | P | active | |
| eric-mitchell/detect-gpt | Machine-generated text detection (research) | MIT | P | archived | |
| ORCID/ORCID-Source | The ORCID registry source | MIT | P | active | orcid |

#### collaboration (10)

| Repo | Description | License | Class | Maint. | Tool |
|---|---|---|---|---|---|
| opf/openproject | Web project tracking | GPL-3.0 | C | active | openproject |
| makeplane/plane | Issue tracking and backlog | AGPL-3.0 | C | active | |
| taigaio/taiga-back | Agile backlog and sprints | AGPL-3.0 | C | steady | |
| redmine/redmine | Issue tracking with Gantt | GPL-2.0 | C | steady | |
| GanttProject/ganttproject | Desktop Gantt | GPL-3.0 | C | steady | ganttproject |
| hedgedoc/hedgedoc | Collaborative Markdown | AGPL-3.0 | C | active | hedgedoc |
| ether/etherpad-lite | Real-time collaborative editor | Apache-2.0 | P | active | |
| go-gitea/gitea | Self-hosted Git forge | MIT | P | active | |
| forgejo/forgejo | Community Git forge | GPL-3.0 | C | active | |
| datadiversitylab/LabOps | Nextcloud, Mattermost, and Git lab workflow | check | K | steady | |

#### analysis (14)

| Repo | Description | License | Class | Maint. | Tool |
|---|---|---|---|---|---|
| numpy/numpy | Array computing | BSD-3-Clause | P | active | numpy |
| scipy/scipy | Scientific computing, home of scipy.signal | BSD-3-Clause | P | active | scipy |
| pandas-dev/pandas | Dataframes | BSD-3-Clause | P | active | pandas |
| matplotlib/matplotlib | Plotting | PSF-based | P | active | matplotlib |
| mwaskom/seaborn | Statistical plots | BSD-3-Clause | P | active | seaborn |
| plotly/plotly.py | Interactive figures | MIT | P | active | plotly |
| jupyterlab/jupyterlab | The notebook interface | BSD-3-Clause | P | active | jupyter |
| jasp-stats/jasp-desktop | GUI statistics | AGPL-3.0 | C | active | jasp |
| jamovi/jamovi | GUI statistics on R | AGPL-3.0 | C | active | jamovi |
| gnu-octave/octave | MATLAB-compatible interpreter (mirror) | GPL-3.0 | C | active | gnu-octave |
| statsmodels/statsmodels | Statistical models and tests | BSD-3-Clause | P | active | statsmodels |
| raphaelvallat/pingouin | Tests with effect sizes | GPL-3.0 | C | active | pingouin |
| sympy/sympy | Symbolic mathematics | BSD-3-Clause | P | active | sympy |
| stan-dev/cmdstanpy | Bayesian modelling bridge to Stan | BSD-3-Clause | P | active | |

### Tracks

#### ml (17)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| scikit-learn/scikit-learn | Classical ML | BSD-3-Clause | P | active | scikit-learn | |
| pytorch/pytorch | Deep learning framework | BSD-3-Clause | P | active | pytorch | |
| tensorflow/tensorflow | Deep learning framework | Apache-2.0 | P | active | tensorflow | |
| keras-team/keras | High-level API over JAX, Torch, TensorFlow | Apache-2.0 | P | active | tensorflow | |
| Lightning-AI/pytorch-lightning | Training loop scaffolding | Apache-2.0 | P | active | pytorch-lightning | |
| huggingface/transformers | Pretrained models | Apache-2.0 | P | active | hugging-face | |
| huggingface/datasets | Dataset loading scripts | Apache-2.0 | P | active | hugging-face | |
| shap/shap | Feature attribution | MIT | P | active | shap | verify |
| pytorch/captum | Attribution for PyTorch | BSD-3-Clause | P | active | captum | |
| onnx/onnx | Model interchange format | Apache-2.0 | P | active | | |
| lutzroeder/netron | Model graph visualiser | MIT | P | active | netron | |
| scikit-learn-contrib/imbalanced-learn | Resampling for skewed classes | MIT | P | active | imbalanced-learn | |
| DistrictDataLabs/yellowbrick | Visual model diagnostics | Apache-2.0 | P | steady | yellowbrick | |
| ray-project/ray | Distributed training and tuning | Apache-2.0 | P | active | ray | |
| dmlc/xgboost | Gradient boosting | Apache-2.0 | P | active | | |
| microsoft/LightGBM | Fast boosting for tabular data | MIT | P | active | | |
| gradio-app/gradio | Demo UI for a model | Apache-2.0 | P | active | gradio | |

#### data-mining (11)

| Repo | Description | License | Class | Maint. | Tool |
|---|---|---|---|---|---|
| pola-rs/polars | Rust dataframe | MIT | P | active | polars |
| duckdb/duckdb | In-process analytical SQL | MIT | P | active | duckdb |
| apache/arrow | Columnar format | Apache-2.0 | P | active | apache-arrow |
| dask/dask | Parallel pandas and NumPy | BSD-3-Clause | P | active | dask |
| apache/spark | Distributed processing | Apache-2.0 | P | active | apache-spark |
| rasbt/mlxtend | Association rules and stacking | BSD-3-Clause | P | active | mlxtend |
| pycaret/pycaret | Low-code model comparison | MIT | P | steady | pycaret |
| ydataai/ydata-profiling | Dataset profiling | MIT | P | active | ydata-profiling |
| great-expectations/great_expectations | Data quality assertions | Apache-2.0 | P | active | great-expectations |
| biolab/orange3 | Visual data mining | GPL-3.0 | C | active | orange |
| elki-project/elki | Clustering and outlier toolkit | AGPL-3.0 | C | steady | elki |

#### vision (16)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| opencv/opencv | Vision library | Apache-2.0 | P | active | opencv | |
| scikit-image/scikit-image | NumPy image processing | BSD-3-Clause | P | active | scikit-image | |
| kornia/kornia | Differentiable vision ops | Apache-2.0 | P | active | kornia | |
| albumentations-team/albumentations | Augmentation | MIT | P | active | albumentations | |
| HumanSignal/label-studio | Multi-modal annotation | Apache-2.0 | P | active | label-studio | |
| cvat-ai/cvat | Image and video annotation | MIT | P | active | cvat | |
| voxel51/fiftyone | Dataset curation | Apache-2.0 | P | active | fiftyone | |
| ultralytics/ultralytics | YOLO models | AGPL-3.0 | C | active | ultralytics-yolo | license note |
| facebookresearch/detectron2 | Detection and segmentation | Apache-2.0 | P | steady | detectron2 | |
| open-mmlab/mmdetection | Detection toolbox | Apache-2.0 | P | steady | mmdetection | |
| facebookresearch/sam2 | Promptable segmentation | Apache-2.0 | P | active | segment-anything | |
| isl-org/Open3D | 3D geometry processing | MIT | P | active | open3d | |
| imagej/imagej2 | Scientific image analysis | BSD-2-Clause | P | active | imagej-fiji | |
| pytorch/vision | Reference vision datasets and models | BSD-3-Clause | P | active | | |
| python-pillow/Pillow | Image loading and preprocessing | MIT-CMU | P | active | pillow | |
| roboflow/supervision | Detection result utilities | MIT | P | active | | |

Also: `SkalskiP/make-sense` (GPL-3.0, tool make-sense), `wkentaro/labelme` (GPL-3.0, verify owner), `Project-MONAI/MONAI` (Apache-2.0, medical imaging, optional).

#### dsp (16)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| gnuradio/gnuradio | SDR framework | GPL-3.0-or-later | C | active | gnu-radio | |
| jgaeddert/liquid-dsp | Embedded-grade DSP in C | MIT | P | active | liquid-dsp | |
| 777arc/PySDR | Source for the PySDR textbook | check | K | active | pysdr | verify |
| osmocom/gr-osmosdr | GNU Radio blocks for SDR hardware | GPL-3.0 | C | steady | gr-osmosdr | verify |
| BatchDrake/SigDigger | Signal analyser | GPL-3.0 | C | active | sigdigger | |
| AlexandreRouma/SDRPlusPlus | Light receiver | GPL-3.0 | C | active | sdrpp | |
| f4exb/sdrangel | Full SDR application | GPL-3.0 | C | active | sdrangel | |
| miek/inspectrum | IQ capture inspector | GPL-3.0 | C | steady | inspectrum | |
| librosa/librosa | Audio DSP | ISC | P | active | librosa | verify |
| audacity/audacity | Audio editor | GPL-3.0 | C | active | audacity | |
| grame-cncm/faust | Functional DSP language | LGPL-2.1 | W | active | | |
| PyWavelets/pywt | Wavelet transforms | MIT | P | active | | |
| mwickert/scikit-dsp-comm | Teaching DSP and comms functions | BSD-2-Clause | P | steady | | verify |
| kfrlib/kfr | C++ DSP framework | GPL-2.0 or commercial | C | active | | |
| pothosware/SoapySDR | SDR hardware abstraction | BSL-1.0 | P | active | | |
| EttusResearch/uhd | USRP host driver | GPL-3.0 | C | active | | |

#### wireless (10)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| NVlabs/sionna | GPU link-level simulator | Apache-2.0 | P | active | sionna | |
| veeresht/CommPy | Modulation, channels, coding in Python | BSD-3-Clause | P | dormant | commpy | |
| vincentchoqueuse/comnumpy | Minimal comms chain | MIT | P | active | comnumpy | |
| aff3ct/aff3ct | FEC toolbox | MIT | P | active | aff3ct | |
| ipc-lab/kaira | Learned communications in PyTorch | MIT | P | active | kaira | |
| DeepMIMO/DeepMIMO | Ray-traced channel datasets | Apache-2.0 | P | active | deepmimo | |
| TorchDSP/torchsig | Synthetic RF datasets | check | K | active | torchsig | |
| rwnobrega/komm | Modulation, codes, and channels in NumPy | GPL-3.0 | C | active | | verify |
| lkk688/RF-Stream-PHY | SDR physical layer research framework | MIT | P | active | | new |
| nyuwireless/nyusim | NYUSIM channel model | custom | K | steady | nyusim | verify |

#### mobile-core (7)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| srsran/srsRAN_Project | 5G NR gNodeB | AGPL-3.0 | C | active | srsran | |
| srsran/srsRAN_4G | 4G stack, still used for PHY teaching | AGPL-3.0 | C | steady | srsran | |
| open5gs/open5gs | 5G core and 4G EPC | AGPL-3.0 | C | active | open5gs | |
| OPENAIRINTERFACE/openairinterface5g | 3GPP RAN and core (mirror of EURECOM GitLab) | OAI Public License | K | active | openairinterface | mirror |
| aligungr/UERANSIM | 5G UE and gNodeB simulator | GPL-3.0 | C | steady | | |
| adjacentlink/emane | Mobile ad hoc network emulator | BSD-3-Clause | P | active | | |
| Unipisa/Simu5G | 5G simulation on OMNeT++ | LGPL-3.0 | W | active | simu5g | verify |

5G-LENA is on GitLab and stays a tool entry only.

#### networking (25)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| nsnam/ns-3-dev-git | ns-3 (mirror of nsnam GitLab) | GPL-2.0 | C | active | ns-3 | mirror |
| mininet/mininet | SDN emulator | BSD-3-Clause | P | dormant | mininet | |
| containernet/containernet | Container-based Mininet | BSD-3-Clause | P | steady | | |
| intrig-unicamp/mininet-wifi | Wireless station emulation | BSD-3-Clause | P | steady | | |
| srl-labs/containerlab | Declarative container topologies | BSD-3-Clause | P | active | containerlab | |
| coreemu/core | Lightweight topology emulation | BSD-2-Clause | P | active | core-emulator | |
| FRRouting/frr | Routing suite | GPL-2.0-or-later | C | active | frrouting | |
| CZ-NIC/bird | Routing daemon | GPL-2.0-or-later | C | active | | |
| batfish/batfish | Network config analysis | Apache-2.0 | P | active | batfish | |
| esnet/iperf | Bandwidth measurement | BSD-3-Clause | P | active | iperf3 | |
| the-tcpdump-group/tcpdump | Command-line capture | BSD-3-Clause | P | active | tcpdump | |
| secdev/scapy | Packet crafting | GPL-2.0 | C | active | scapy | |
| openvswitch/ovs | Virtual switch | Apache-2.0 | P | active | open-vswitch | |
| p4lang/behavioral-model | P4 reference switch | Apache-2.0 | P | steady | p4-bmv2 | |
| p4lang/p4c | P4 compiler | Apache-2.0 | P | active | p4-bmv2 | |
| faucetsdn/ryu | OpenFlow controller | Apache-2.0 | P | dormant | | |
| wireshark/wireshark | Analyzer source (mirror of Wireshark GitLab) | GPL-2.0-or-later | C | active | wireshark | mirror |
| GNS3/gns3-gui | GNS3 interface | GPL-3.0 | C | active | gns3 | |
| GNS3/gns3-server | GNS3 backend | GPL-3.0 | C | active | gns3 | |
| appneta/tcpreplay | Replay captured traffic | GPL-3.0 | C | steady | | |
| FFmpeg/FFmpeg | Media framework | LGPL-2.1 with GPL parts | W | active | ffmpeg | |
| gpac/gpac | MP4 and DASH packaging | LGPL-2.1 | W | active | gpac | |
| videolan/vlc | VLC source (mirror) | GPL-2.0 | C | active | vlc | mirror |
| MediaArea/MediaInfo | Media metadata | BSD-2-Clause | P | active | mediainfo | |
| Netflix/vmaf | Perceptual video quality | BSD-2-Clause-Patent | P | active | vmaf | |

Also, single source: `shaka-project/shaka-packager`, `Dash-Industry-Forum/dash.js`, `video-dev/hls.js`, `axiomatic-systems/Bento4`, `AOMediaCodec/SVT-AV1` (GitLab canonical), `webmproject/libwebp`, `ShieldMnt/invisible-watermark`, `obsproject/obs-studio`.

#### embedded (18)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| FreeRTOS/FreeRTOS-Kernel | RTOS kernel | MIT | P | active | freertos | |
| FreeRTOS/FreeRTOS | Full distribution with demos | MIT | P | active | freertos | |
| zephyrproject-rtos/zephyr | Zephyr RTOS | Apache-2.0 | P | active | zephyr | |
| renode/renode | Embedded emulation | MIT | P | active | renode | |
| ARM-software/CMSIS-DSP | ARM DSP library | Apache-2.0 | P | active | cmsis-dsp | |
| ARM-software/CMSIS_6 | Cortex software interface standard | Apache-2.0 | P | active | | verify (CMSIS_5 archived) |
| RIOT-OS/RIOT | IoT RTOS | LGPL-2.1 | W | active | riot-os | |
| apache/nuttx | POSIX RTOS | Apache-2.0 | P | active | nuttx | |
| micropython/micropython | Python on MCUs | MIT | P | active | micropython | |
| platformio/platformio-core | Embedded build system | Apache-2.0 | P | active | platformio | |
| espressif/esp-idf | ESP32 framework | Apache-2.0 | P | active | esp-idf | |
| arduino/arduino-cli | Scripted Arduino builds | GPL-3.0 | C | active | arduino-cli | |
| libopencm3/libopencm3 | Cortex-M firmware library | LGPL-3.0 | W | steady | libopencm3 | |
| pyocd/pyOCD | Debug and flash for Cortex-M | Apache-2.0 | P | active | pyocd | |
| sigrokproject/pulseview | Protocol decoding GUI | GPL-3.0 | C | steady | sigrok-pulseview | |
| openocd-org/openocd | On-chip debug (mirror) | GPL-2.0 | C | active | openocd | verify |
| wokwi/wokwi-elements | Wokwi simulator components | MIT | P | active | wokwi | |
| qemu/qemu | Machine emulator | GPL-2.0 | C | active | qemu | |

KiCad's canonical is GitLab; the GitHub mirror `KiCad/kicad-source-mirror` can be listed with a mirror note.

#### satellite (14)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| jman4162/opensatcom | Link budgets and propagation | MIT | P | active | opensatcom | |
| skyfielders/python-skyfield | Ephemeris and pass prediction | MIT | P | active | skyfield | |
| brandon-rhodes/python-sgp4 | SGP4 propagator | MIT | P | active | python-sgp4 | |
| astropy/astropy | Coordinates, time, units | BSD-3-Clause | P | active | astropy | |
| csete/gpredict | Tracking application | GPL-2.0 | C | steady | gpredict | |
| satnogs/satnogs-client | Ground station client | AGPL-3.0 | C | active | satnogs | |
| satnogs/satnogs-network | Network coordination backend | AGPL-3.0 | C | active | satnogs | |
| daniestevez/gr-satellites | Telemetry decoders | GPL-3.0 | C | active | gr-satellites | |
| SatDump/SatDump | Downlink decoder suite | GPL-3.0 | C | active | satdump | |
| nasa/cFS | Core Flight System | Apache-2.0 | P | active | nasa-cfs | |
| poliastro/poliastro | Orbital mechanics, maintenance mode | MIT | P | dormant | | watchlist |
| nyx-space/nyx | Rust astrodynamics | AGPL-3.0 | C | active | | |
| pytroll/pyorbital | Orbital parameters from TLE | GPL-3.0 | C | active | | |
| pytroll/satpy | Satellite imagery readers | GPL-3.0 | C | active | | |

Dropped: `nasa/GMAT` (verify; SourceForge is primary), `deepsat-project/deepsat`, `open-satcon/oresat-linux`, `Ben-Kempton/SILLEO-SCNS`, `open-space-toolkit` (single medium or low source, unverified owners).

#### security (24)

| Repo | Description | License | Class | Maint. | Tool | Flags |
|---|---|---|---|---|---|---|
| gchq/CyberChef | Data and crypto workbench | Apache-2.0 | P | active | cyberchef | |
| openssl/openssl | TLS and primitives | Apache-2.0 | P | active | openssl | |
| pyca/cryptography | Python primitives | Apache-2.0 or BSD | P | active | pyca-cryptography | |
| jedisct1/libsodium | Misuse-resistant crypto | ISC | P | active | libsodium | |
| open-quantum-safe/liboqs | Post-quantum algorithms | MIT | P | active | liboqs | |
| Legrandin/pycryptodome | Self-contained Python crypto | BSD-2-Clause | P | active | | |
| hashcat/hashcat | Hash auditing | MIT | P | active | hashcat | |
| openwall/john | Password auditing | GPL-2.0 | C | active | john-the-ripper | |
| NationalSecurityAgency/ghidra | Reverse engineering | Apache-2.0 | P | active | ghidra | |
| radareorg/radare2 | Reverse engineering framework | LGPL-3.0 | W | active | radare2 | |
| Gallopsled/pwntools | Exploit development | MIT | P | active | pwntools | |
| zeek/zeek | Network security monitor | BSD-3-Clause | P | active | zeek | |
| OISF/suricata | IDS and IPS | GPL-2.0 | C | active | suricata | |
| wazuh/wazuh | SIEM and XDR | GPL-2.0 | C | active | wazuh | |
| zaproxy/zaproxy | Web scanner | Apache-2.0 | P | active | owasp-zap | |
| semgrep/semgrep | Static analysis | LGPL-2.1 | W | active | semgrep | |
| aquasecurity/trivy | Vulnerability scanning | Apache-2.0 | P | active | trivy | |
| gitleaks/gitleaks | Secret scanning | MIT | P | active | gitleaks | |
| keycloak/keycloak | Identity and access | Apache-2.0 | P | active | keycloak | |
| mitmproxy/mitmproxy | HTTPS proxy | MIT | P | active | mitmproxy | |
| rapid7/metasploit-framework | Penetration testing framework | BSD-3-Clause | P | active | metasploit | |
| VirusTotal/yara | Malware pattern matching | BSD-3-Clause | P | active | yara | |
| nmap/nmap | Discovery scanner | NPSL | K | active | nmap | license note |
| RsaCtfTool/RsaCtfTool | RSA attack collection for teaching | check | K | active | | |

Also: `OWASP/wstg` (CC-BY-SA, testing guide source, tool owasp), `coreruleset/coreruleset` (Apache-2.0), `github/codeql` (MIT, static analysis), `joernio/joern` (Apache-2.0). Dropped `cuckoosandbox/cuckoo` (archived).

#### math (10)

| Repo | Description | License | Class | Maint. | Tool |
|---|---|---|---|---|---|
| networkx/networkx | Graph algorithms | BSD-3-Clause | P | active | networkx |
| coin-or/pulp | Linear programming modeller | MIT | P | active | pulp |
| Pyomo/pyomo | Algebraic modelling | BSD-3-Clause | P | active | pyomo |
| cvxpy/cvxpy | Convex optimisation | Apache-2.0 | P | active | cvxpy |
| google/or-tools | Combinatorial optimisation | Apache-2.0 | P | active | or-tools |
| ERGO-Code/HiGHS | LP and MIP solver | MIT | P | active | highs |
| hmmlearn/hmmlearn | Hidden Markov models | BSD-3-Clause | P | steady | hmmlearn |
| sagemath/sage | Computer algebra system | GPL-3.0 | C | active | sagemath |
| igraph/igraph | Fast graph analysis | GPL-2.0 | C | active | |
| salabim/salabim | Discrete-event simulation | MIT | P | active | |

SimPy's canonical repository is on GitLab; tool entry only.

#### software-engineering (optional, 7)

Only if the optional group is approved in `11`. No MCCE course covers
empirical software engineering, but a thesis that mines repositories or
evaluates code quality would use these.

| Repo | Description | License | Class | Maint. |
|---|---|---|---|---|
| ishepard/pydriller | Mining software repositories | Apache-2.0 | P | active |
| chaoss/grimoirelab | Development data analytics | GPL-3.0 | C | active |
| tree-sitter/tree-sitter | Incremental parsing | MIT | P | active |
| SonarSource/sonarqube | Code quality analysis | LGPL-3.0 | W | active |
| srcML/srcML | Source code markup | GPL-3.0 | C | steady |
| eclipse-jgit/jgit | Git in Java for mining | EDL-1.0 | P | active |
| github/codeql | Code analysis platform | MIT | P | active |

## Repo index totals

Backbone 109, tracks 168 (175 with the optional group): 284 table rows, plus
about 20 more named in the "also" lines. Same note as the tools: the `single` and
`verify` rows are the first to cut if the first release should be smaller,
and every license value above is a draft to be read off the repository's
`LICENSE` file in Phase 0, not trusted as written.

## Watchlist (rendered as a maintenance note, never a first pick)

`karpathy/arxiv-sanity-lite`, `fabiobatalha/crossrefapi`,
`binary-husky/gpt_academic`, `open-webui/open-webui`, `poliastro/poliastro`,
`mininet/mininet`, `faucetsdn/ryu`, `veeresht/CommPy`, `stolucc/flowtex`,
and every `new` row in writing and review.
