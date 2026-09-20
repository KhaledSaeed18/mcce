# 06. Tool catalog draft

Merged from every draft under the rules in `05`. This is authoring input for
`src/config/resources/catalog/*.ts`, not the final data: descriptions are
seeds to tighten, badges follow the conflict rule, and every row flagged
`verify` needs a human check in Phase 0.

Columns:

- Tier: `core` (four or more source families), `supported` (two or three),
  `single` (one family, kept under inclusion rule 2).
- OSS: open source flag.
- Flags: `liu` (verification liu), `new` (status experimental, 2026 project),
  `acct` (requires account), `verify` (URL or badge needs a check),
  `privacy` (carries a privacy note).
- Stages: thesis stage ids from `02` when the tool belongs on the thesis page.

Counts after merge: 25 categories, 395 tools in the tables plus 13 listed
inline as `single`, 406 once the two duplicate pairs at the end are resolved.
The number is well above the 200 target on purpose; the Tier column makes it
easy to cut `single` rows (65 in the tables, 13 inline) if the first release
should be smaller. Tier split in the tables: 124 core, 207 supported, 65 single.

## Everyday

### ai-assistants (6)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| claude | Claude | freemium | no | https://claude.ai | core | Long-context reading and step-by-step derivations. | acct, privacy | screen |
| chatgpt | ChatGPT | freemium | no | https://chatgpt.com | core | General assistant with the largest plugin ecosystem. | acct, privacy | screen |
| gemini | Google Gemini | freemium | no | https://gemini.google.com | core | Ties into Drive and Docs, where course material already lives. | acct, privacy | screen |
| notebooklm | NotebookLM | free | no | https://notebooklm.google.com | core | Answers only from the PDFs and slides you upload. | acct, privacy | screen |
| perplexity | Perplexity | freemium | no | https://www.perplexity.ai | core | Web answers with inline citations for quick grounding. | acct, privacy | search |
| microsoft-copilot | Microsoft Copilot | free | no | https://copilot.microsoft.com | supported | Bundled with a Microsoft account, no extra signup. | acct, privacy | |

### file-utilities (13)

| Id | Name | Access | OSS | URL | Tier | Description | Flags |
|---|---|---|---|---|---|---|---|
| ilovepdf | iLovePDF | freemium | no | https://www.ilovepdf.com | core | Merge, split, compress, convert, and sign PDFs. | |
| iloveimg | iLoveIMG | freemium | no | https://www.iloveimg.com | core | Compress, resize, crop, and convert images. | |
| smallpdf | Smallpdf | freemium | no | https://smallpdf.com | supported | PDF editing, compression, and OCR. | |
| pdf24 | PDF24 Tools | free | no | https://tools.pdf24.org | core | Browser and desktop PDF tools with no upload quota. | |
| stirling-pdf | Stirling PDF | free | yes | https://www.stirlingpdf.com | core | Self-hosted PDF toolkit when files must stay on your machine. | |
| cloudconvert | CloudConvert | freemium | no | https://cloudconvert.com | supported | Converts documents, audio, and video between formats. | |
| handbrake | HandBrake | free | yes | https://handbrake.fr | core | Compress lecture recordings for storage. | |
| photopea | Photopea | free | no | https://www.photopea.com | supported | Photoshop-style editing in the browser. | |
| gimp | GIMP | free | yes | https://www.gimp.org | supported | Raster image editor for figure cleanup. | |
| imagemagick | ImageMagick | free | yes | https://imagemagick.org | single | Batch image conversion from the command line. | |
| diffchecker | Diffchecker | freemium | no | https://www.diffchecker.com | supported | Compare text, code, images, and PDFs. | |
| adobe-acrobat-online | Adobe Acrobat online | freemium | no | https://www.adobe.com/acrobat/online.html | single | Basic PDF operations from Adobe. | acct |
| syncthing | Syncthing | free | yes | https://syncthing.net | single | Folder sync between laptop and desktop without a cloud account. | |

### diagramming (13)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| excalidraw | Excalidraw | free | yes | https://excalidraw.com | core | Hand-drawn style sketches for system and network diagrams. | | |
| mermaid-live | Mermaid Live Editor | free | yes | https://mermaid.live | core | Flowcharts, sequence diagrams, and Gantt charts from text. | | defend |
| diagrams-net | diagrams.net | free | yes | https://app.diagrams.net | core | Full stencil sets for network and architecture diagrams. Alias draw.io. | | |
| tldraw | tldraw | free | yes | https://www.tldraw.com | supported | Infinite canvas whiteboard with live collaboration. | | |
| plantuml | PlantUML | free | yes | https://plantuml.com | supported | UML, component, and Gantt diagrams from text. | | |
| lucidchart | Lucidchart | freemium | no | https://www.lucidchart.com | supported | Polished diagrams, education plans available. | acct | |
| inkscape | Inkscape | free | yes | https://inkscape.org | core | Vector editor for publication figures and block diagrams. | | analyse |
| graphviz | Graphviz | free | yes | https://graphviz.org | supported | Graph and topology figures from a DOT description. | | analyse |
| pgfplots-tikz | PGFPlots and TikZ | free | yes | https://pgfplots.sourceforge.net | supported | Plots and diagrams compiled inside LaTeX. | | analyse |
| miro | Miro | freemium | no | https://miro.com | supported | Online whiteboard for group planning. | acct | |
| figma | Figma and FigJam | freemium | no | https://www.figma.com | supported | Interface design and collaborative diagrams. Free for education. | acct | |
| canva | Canva | freemium | no | https://www.canva.com | supported | Slides, posters, and simple figures. | acct | defend |
| google-slides | Google Slides | free | no | https://slides.google.com | supported | Collaborative presentations. | acct | defend |

### productivity (16)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| notion | Notion | freemium | no | https://www.notion.so | core | Notes, databases, and boards in one workspace. Free Plus plan for students. | acct | defend |
| obsidian | Obsidian | freemium | no | https://obsidian.md | supported | Local Markdown notes with backlinks; pairs with a Zotero export. | | screen |
| logseq | Logseq | free | yes | https://logseq.com | single | Outliner notes with backlinks, local first. | | |
| joplin | Joplin | free | yes | https://joplinapp.org | single | Markdown notes with encrypted sync. | | |
| onenote | OneNote | free | no | https://www.onenote.com | supported | Digital notebook, good for handwritten notes. | acct | |
| trello | Trello | freemium | no | https://trello.com | core | Kanban boards for tasks and milestones. | acct | defend |
| linear | Linear | freemium | no | https://linear.app | supported | Issue tracking for technical projects. | acct | |
| todoist | Todoist | freemium | no | https://todoist.com | supported | Task and deadline management. | acct | |
| github-projects | GitHub Projects | freemium | no | https://docs.github.com/en/issues/planning-and-tracking-with-projects | supported | Kanban tied to repository issues. | acct | defend |
| projectlibre | ProjectLibre | free | yes | https://www.projectlibre.com | core | Desktop Gantt and earned value, a Microsoft Project alternative. | | defend |
| ganttproject | GanttProject | free | yes | https://www.ganttproject.biz | core | Desktop scheduling with critical path. | | defend |
| openproject | OpenProject | free | yes | https://www.openproject.org | core | Web project tracking with roadmaps and work packages. | | defend |
| clockify | Clockify | free | no | https://clockify.me | supported | Time tracking for project management coursework. | acct | |
| google-calendar | Google Calendar | free | no | https://calendar.google.com | supported | Deadlines and schedules. | acct | |
| hedgedoc | HedgeDoc | free | yes | https://hedgedoc.org | supported | Collaborative Markdown for shared notes and minutes. | | |
| pomofocus | Pomofocus | free | no | https://pomofocus.io | single | Pomodoro timer in the browser. | | |

### dev (14)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| vs-code | Visual Studio Code | free | yes | https://code.visualstudio.com | core | The editor across every course with a coding component. | | experiment |
| github | GitHub | freemium | no | https://github.com | core | Version control, code review, and hosting for course and thesis code. | acct | experiment |
| github-codespaces | GitHub Codespaces | freemium | no | https://github.com/features/codespaces | supported | Browser VS Code with cloud compute. More hours with the Student Pack. | acct | |
| gitlab | GitLab | freemium | no | https://gitlab.com | supported | Git hosting with built-in CI. | acct | |
| replit | Replit | freemium | no | https://replit.com | supported | Browser coding with zero setup. | acct | |
| jetbrains-ides | JetBrains IDEs | student | no | https://www.jetbrains.com/community/education | supported | PyCharm, IntelliJ, CLion. Free while enrolled. | acct | |
| docker | Docker | free | yes | https://www.docker.com | core | Reproducible environments that pin the toolchain. Desktop is free for education. | | experiment |
| git | Git | free | yes | https://git-scm.com | supported | Version control itself. | | |
| miniforge | Miniforge and Mamba | free | yes | https://github.com/conda-forge/miniforge | supported | Conda-compatible Python environments without licensing strings. | | experiment |
| stack-overflow | Stack Overflow | free | no | https://stackoverflow.com | supported | Programming questions and answers. | | |
| mdn-web-docs | MDN Web Docs | free | yes | https://developer.mozilla.org | single | Web platform reference. | | |
| devdocs | DevDocs | free | yes | https://devdocs.io | single | Searchable offline documentation for many languages. | | |
| github-desktop | GitHub Desktop | free | yes | https://github.com/apps/desktop | single | Beginner-friendly Git client. | | |
| neovim | Neovim | free | yes | https://neovim.io | single | Modal editor for terminal-first work. | | |

### learning (9)

| Id | Name | Access | OSS | URL | Tier | Description | Flags |
|---|---|---|---|---|---|---|---|
| anki | Anki | free | yes | https://apps.ankiweb.net | single | Spaced repetition flashcards. Desktop and Android are free; iOS is paid. | verify |
| quizlet | Quizlet | freemium | no | https://quizlet.com | supported | Flashcards and quiz modes. | acct |
| khan-academy | Khan Academy | free | no | https://www.khanacademy.org | supported | Free courses on math and computing. | |
| mit-ocw | MIT OpenCourseWare | free | no | https://ocw.mit.edu | single | Lecture notes, exams, and videos from MIT courses. | |
| coursera | Coursera | freemium | no | https://www.coursera.org | single | Audit university courses free, pay for certificates. | acct |
| edx | edX | freemium | no | https://www.edx.org | single | University courses, audit track free. | acct |
| freecodecamp | freeCodeCamp | free | yes | https://www.freecodecamp.org | single | Free coding curriculum. | |
| cloudflare-learning-center | Cloudflare Learning Center | free | no | https://www.cloudflare.com/learning | single | Plain explanations of networking concepts. | |
| purdue-owl | Purdue OWL | free | no | https://owl.purdue.edu | supported | Academic writing and citation guidance. | |

## Coursework

### math (15)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| wolfram-alpha | Wolfram Alpha | freemium | no | https://www.wolframalpha.com | core | Step-by-step checks for transforms, series, and statistics. | | |
| desmos | Desmos | free | no | https://www.desmos.com | supported | Fast function and signal plotting. | | |
| geogebra | GeoGebra | free | no | https://www.geogebra.org | supported | Geometry, calculus, and linear algebra visualisation. | | |
| symbolab | Symbolab | freemium | no | https://www.symbolab.com | supported | Step-by-step solver for homework checks. | | |
| gnu-octave | GNU Octave | free | yes | https://octave.org | core | MATLAB-compatible environment with no license friction. | | experiment |
| matlab | MATLAB | university | no | https://www.mathworks.com/academia/students.html | core | Standard for DSP and communications teaching. Confirm the LIU license before buying. | liu, verify | experiment |
| simulink | Simulink | university | no | https://www.mathworks.com/products/simulink.html | supported | Block-based system and signal modelling. Same license question as MATLAB. | liu, verify | |
| sagemath | SageMath | free | yes | https://www.sagemath.org | core | Symbolic engine covering algebra, calculus, and number theory. | | |
| sympy | SymPy | free | yes | https://www.sympy.org | supported | Symbolic algebra in Python for series, integrals, and Z transforms. | | |
| julia | Julia | free | yes | https://julialang.org | supported | Fast numerics for optimisation and simulation code. | | |
| networkx | NetworkX | free | yes | https://networkx.org | supported | Graph algorithms for the graph theory block. | | |
| simpy | SimPy | free | yes | https://simpy.readthedocs.io | supported | Discrete-event simulation for queues. | | |
| pulp | PuLP | free | yes | https://coin-or.github.io/pulp | supported | Linear programming modeller in Python. | | |
| cvxpy | CVXPY | free | yes | https://www.cvxpy.org | supported | Convex optimisation modelling. | | |
| or-tools | OR-Tools | free | yes | https://developers.google.com/optimization | supported | Routing, scheduling, and assignment solvers. | | |

Also from a single high-trust source and kept: `pyomo` (https://www.pyomo.org), `highs` (https://highs.dev), `hmmlearn` (https://hmmlearn.readthedocs.io), `labplot` (https://labplot.kde.org). Four rows, all `free`, open source, `single`.

### data-analysis (16)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| jupyter | JupyterLab | free | yes | https://jupyter.org | core | Notebooks that double as reproducible thesis appendices. | | experiment, analyse |
| numpy | NumPy | free | yes | https://numpy.org | supported | Arrays and linear algebra under every Python stack. | | analyse |
| scipy | SciPy | free | yes | https://scipy.org | core | Optimisation, statistics, and signal routines. `scipy.signal` covers filter design. | | analyse |
| pandas | pandas | free | yes | https://pandas.pydata.org | core | Tabular cleaning and result tables. | | analyse |
| matplotlib | Matplotlib | free | yes | https://matplotlib.org | core | Vector plots that match the document font. | | analyse |
| seaborn | seaborn | free | yes | https://seaborn.pydata.org | supported | Statistical plots with confidence bands. | | analyse |
| plotly | Plotly | free | yes | https://plotly.com/python | single | Interactive figures for exploration. | | |
| r-rstudio | R and RStudio | free | yes | https://posit.co/products/open-source/rstudio | core | Statistics and publication plots outside the Python path. | | analyse |
| jasp | JASP | free | yes | https://jasp-stats.org | core | Point-and-click Bayesian and frequentist statistics. | | analyse |
| jamovi | jamovi | free | yes | https://www.jamovi.org | supported | GUI statistics with an R syntax bridge. | | analyse |
| pspp | PSPP | free | yes | https://www.gnu.org/software/pspp | supported | SPSS-compatible free alternative. | | |
| statsmodels | statsmodels | free | yes | https://www.statsmodels.org | supported | Regression, hypothesis tests, and multiple-comparison correction. | | analyse |
| pingouin | Pingouin | free | yes | https://pingouin-stats.org | supported | Statistical tests with effect sizes in one call. | | analyse |
| knime | KNIME | freemium | no | https://www.knime.com | supported | Visual analytics workflows without code. | acct | |
| rawgraphs | RAWGraphs | free | yes | https://www.rawgraphs.io | single | Structured data to custom charts without code. | | |
| observable | Observable | freemium | no | https://observablehq.com | single | Browser notebooks for interactive visualisation. | acct | |

### dsp (15)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| gnu-radio | GNU Radio | free | yes | https://www.gnuradio.org | core | Flow-graph SDR framework for modulation and demodulation chains. | | experiment |
| pysdr | PySDR | free | no | https://pysdr.org | core | Free textbook with runnable Python for SDR and RF basics. | | |
| octave-signal | Octave signal package | free | yes | https://gnu-octave.github.io/packages/signal | supported | Filter design and transforms with MATLAB-compatible calls. | | |
| liquid-dsp | liquid-dsp | free | yes | https://liquidsdr.org | core | C DSP library small enough to read, built for embedded SDR. | | |
| sigdigger | SigDigger | free | yes | https://github.com/BatchDrake/SigDigger | supported | Inspect captures and identify unknown transmissions. | | |
| sdrpp | SDR++ | free | yes | https://www.sdrpp.org | supported | Light receiver app for browsing spectrum with cheap hardware. | | |
| sdrangel | SDRangel | free | yes | https://www.sdrangel.org | single | Feature-rich SDR application with transmit support. | | |
| inspectrum | inspectrum | free | yes | https://github.com/miek/inspectrum | supported | Visual inspection of recorded IQ captures. | | |
| gr-osmosdr | gr-osmosdr | free | yes | https://osmocom.org/projects/gr-osmosdr | supported | GNU Radio source and sink blocks for low-cost SDR hardware. | verify | |
| rtl-sdr-quick-start | RTL-SDR quick start | free | no | https://www.rtl-sdr.com/rtl-sdr-quick-start-guide | single | The cheapest receive-only hardware path into the course. | | |
| audacity | Audacity | free | yes | https://www.audacityteam.org | supported | Spectrogram view for checking a filter output. | | |
| sonic-visualiser | Sonic Visualiser | free | yes | https://www.sonicvisualiser.org | single | Layered audio analysis with spectrogram and pitch. | | |
| tfilter | TFilter | free | no | http://t-filter.engineerjs.com | supported | Browser FIR designer that plots impulse and frequency responses. | verify | |
| librosa | librosa | free | yes | https://librosa.org | supported | STFT, mel spectrograms, and audio features. | | |
| cmsis-dsp | CMSIS-DSP | free | yes | https://github.com/ARM-software/CMSIS-DSP | supported | ARM's optimised DSP library, the bridge from EENG527 to embedded. | | |

### wireless (19)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| sionna | Sionna | free | yes | https://nvlabs.github.io/sionna | core | GPU link-level simulator for 5G and 6G PHY, with ray tracing. | | experiment |
| comnumpy | comnumpy | free | yes | https://github.com/vincentchoqueuse/comnumpy | supported | Minimal Python chain for QAM, AWGN, OFDM, MIMO, and BER curves. | | experiment |
| commpy | CommPy | free | yes | https://github.com/veeresht/CommPy | core | Modulators, channels, and Viterbi decoding in Python. | | |
| aff3ct | AFF3CT | free | yes | https://aff3ct.github.io | supported | Fast C++ toolbox for LDPC, Turbo, Polar, and BCH codes. | | |
| kaira | Kaira | free | yes | https://github.com/ipc-lab/kaira | supported | PyTorch toolkit for learned communications and joint source-channel coding. | | experiment |
| deepmimo | DeepMIMO | free | no | https://www.deepmimo.net | supported | Ray-traced channel datasets that plug into Sionna and MATLAB. | | experiment |
| torchsig | TorchSig | free | yes | https://github.com/TorchDSP/torchsig | single | Synthetic RF datasets and signal classification in PyTorch. | | |
| nyusim | NYUSIM | free | no | https://wireless.engineering.nyu.edu/nyusim | supported | Millimetre-wave channel simulator from NYU Wireless. | acct | |
| quadriga | QuaDRiGa | free | no | https://quadriga-channel-model.de | single | Quasi-deterministic MIMO channel generator with mobility. | | |
| srsran | srsRAN Project | free | yes | https://www.srsran.com | core | Open 5G RAN suite runnable on SDR hardware or in simulation. | | |
| open5gs | Open5GS | free | yes | https://open5gs.org | core | 5G core and 4G EPC for end-to-end experiments. | | |
| openairinterface | OpenAirInterface | free | yes | https://openairinterface.org | supported | 3GPP-compliant RAN and core on commodity hardware. Setup cost is high. | | |
| ns3-5g-lena | 5G-LENA | free | yes | https://5g-lena.cttc.es | single | ns-3 module for 5G New Radio including mmWave. | | |
| simu5g | Simu5G | free | yes | https://simu5g.org | supported | OMNeT++ library for 5G user and control plane. | | |
| osmocom | Osmocom | free | yes | https://osmocom.org | single | Open GSM, UMTS, and LTE stack components. | | |
| 3gpp-specs | 3GPP specifications | free | no | https://www.3gpp.org/specifications-technologies/specifications-3gpp | supported | The primary standards; cite these, not a blog summary. | | |
| rf-wireless-world | RF Wireless World calculators | free | no | https://www.rfwireless-world.com/calculators | supported | Path loss, Fresnel zone, and link budget calculators. | | |
| smith-chart-tool | Smith Chart Tool | free | no | https://www.will-kelsey.com/smith_chart | supported | Interactive Smith chart for impedance matching. | | |
| ltspice | LTspice | free | no | https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html | supported | Circuit simulation where comms theory meets hardware. | | |

### satellite (18)

| Id | Name | Access | OSS | URL | Tier | Description | Flags |
|---|---|---|---|---|---|---|---|
| opensatcom | opensatcom | free | yes | https://github.com/jman4162/opensatcom | core | Link budgets, DVB-S2 ModCods, and ITU-R propagation in Python. | |
| rftools-sat-link-budget | RF Tools satellite link budget | free | no | https://rftools.io/tools/sat-link-budget | supported | Probabilistic link margins with ITU-R rain and gas models. | verify |
| hawklogic-link-budget | HawkLogic link budget | free | no | https://hawklogicsystems.com/tools/comms-link-budget | supported | Browser link budget with rain fade from S to V band. | verify |
| gpredict | Gpredict | free | yes | https://oz9aec.dk/gpredict | core | Real-time tracking and pass prediction with rotator control. | |
| skyfield | Skyfield | free | yes | https://rhodesmill.org/skyfield | core | Python pass prediction and orbital geometry on JPL ephemerides. | |
| python-sgp4 | python-sgp4 | free | yes | https://github.com/brandon-rhodes/python-sgp4 | supported | The SGP4 propagator behind most tracking tools. | |
| astropy | Astropy | free | yes | https://www.astropy.org | single | Coordinates, time, and units for space work. | |
| nasa-gmat | NASA GMAT | free | yes | https://software.nasa.gov/software/GSC-17177-1 | supported | Mission design and trajectory optimisation. | |
| satnogs | SatNOGS | free | yes | https://satnogs.org | core | Open ground station network and client. | |
| gr-satellites | gr-satellites | free | yes | https://github.com/daniestevez/gr-satellites | core | GNU Radio telemetry decoders for CubeSat and science missions. | |
| satdump | SatDump | free | yes | https://www.satdump.org | single | Decoder suite for weather and amateur downlinks. | |
| orbitron | Orbitron | free | no | http://www.stoff.pl | supported | Windows tracking for pass planning. | verify |
| celestrak | CelesTrak | free | no | https://celestrak.org | supported | Two-line element sets for propagators. | |
| space-track | Space-Track | free | no | https://www.space-track.org | single | Official US catalog, free after registration. | acct |
| nasa-cfs | NASA cFS | free | yes | https://github.com/nasa/cFS | supported | Core Flight System used on real spacecraft. | |
| nasa-spice | NASA SPICE Toolkit | free | no | https://naif.jpl.nasa.gov/naif/toolkit.html | supported | Observation geometry for mission planning. | |
| orekit | Orekit | free | yes | https://www.orekit.org | single | Flight dynamics library for precise propagation. | |
| stk | Ansys STK | student | no | https://www.ansys.com/products/missions/ansys-stk | single | Industry mission analysis; student edition to be confirmed. | verify |

### networking (19)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| wireshark | Wireshark | free | yes | https://www.wireshark.org | core | Packet capture and dissection across protocols and security work. | | experiment |
| tcpdump | tcpdump | free | yes | https://www.tcpdump.org | single | Command-line capture for headless runs. | | |
| gns3 | GNS3 | free | yes | https://www.gns3.com | core | Emulates real router and switch images. | | |
| cisco-packet-tracer | Cisco Packet Tracer | student | no | https://www.netacad.com/courses/packet-tracer | core | Campus-standard topology simulator. Needs a free NetAcad account. | acct | |
| eve-ng | EVE-NG | freemium | no | https://www.eve-ng.net | supported | Network emulation lab platform. | | |
| ns-3 | ns-3 | free | yes | https://www.nsnam.org | core | Discrete-event simulator still standard in networking papers. | | experiment |
| mininet | Mininet | free | yes | https://mininet.org | core | SDN and OpenFlow testbed on one Linux kernel. Maintenance has slowed. | | |
| containerlab | Containerlab | free | yes | https://containerlab.dev | single | Declarative container topologies with real routing images. | | |
| core-emulator | CORE | free | yes | https://github.com/coreemu/core | single | Lightweight container-style topologies for IP labs. | | |
| omnetpp | OMNeT++ with INET | free | no | https://omnetpp.org | single | Modular discrete-event modelling, free for academic use. | | |
| frrouting | FRRouting | free | yes | https://frrouting.org | supported | BGP, OSPF, IS-IS, and MPLS on Linux. | | |
| batfish | Batfish | free | yes | https://batfish.org | single | Static analysis of network configurations. | | |
| iperf3 | iperf3 | free | yes | https://iperf.fr | supported | Bandwidth and jitter measurement. | | |
| tc-netem | tc and netem | free | yes | https://wiki.linuxfoundation.org/networking/netem | single | Inject delay, loss, and reordering on Linux. | | |
| scapy | Scapy | free | yes | https://scapy.net | supported | Craft, send, and dissect packets in Python. | | |
| open-vswitch | Open vSwitch | free | yes | https://www.openvswitch.org | supported | Virtual switch with OpenFlow for SDN labs. | | |
| p4-bmv2 | P4 and BMv2 | free | yes | https://github.com/p4lang/behavioral-model | single | Programmable data plane and its reference switch. | | |
| onos | ONOS | free | yes | https://opennetworking.org/onos | single | SDN controller for programmable control experiments. | | |
| cisco-netacad | Cisco Networking Academy | free | no | https://www.netacad.com | supported | Networking courses and the Packet Tracer account. | acct | |

### multimedia (6)

| Id | Name | Access | OSS | URL | Tier | Description |
|---|---|---|---|---|---|---|
| ffmpeg | FFmpeg | free | yes | https://ffmpeg.org | core | Transcode, mux, demux, and stream from the command line. |
| gpac | GPAC and MP4Box | free | yes | https://gpac.io | supported | MP4 and MPEG-DASH packaging for delivery research. |
| vlc | VLC | free | yes | https://www.videolan.org/vlc | supported | Playback with stream inspection and codec reporting. |
| mediainfo | MediaInfo | free | yes | https://mediaarea.net/en/MediaInfo | supported | Codec, bitrate, and container details for any file. |
| vmaf | Netflix VMAF | free | yes | https://github.com/Netflix/vmaf | single | Perceptual video quality metric for compression comparisons. |
| obs-studio | OBS Studio | free | yes | https://obsproject.com | supported | Record lab demos and defense dry runs. |

### ml (22)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| google-colab | Google Colab | freemium | no | https://colab.research.google.com | core | Hosted notebooks with a free GPU, the path of least resistance for the ML lab. | acct | experiment |
| kaggle | Kaggle | free | no | https://www.kaggle.com | core | Datasets, notebooks, competitions, and weekly GPU quota. | acct | experiment |
| hugging-face | Hugging Face | freemium | no | https://huggingface.co | core | Pretrained models, datasets, and Spaces for demos. | acct | |
| weights-and-biases | Weights and Biases | freemium | no | https://wandb.ai | core | Experiment tracking that turns scattered runs into one table. | acct | experiment |
| mlflow | MLflow | free | yes | https://mlflow.org | core | Self-hosted run tracking and model registry. | | experiment |
| optuna | Optuna | free | yes | https://optuna.org | supported | Hyperparameter search with pruning. | | experiment |
| pytorch | PyTorch | free | yes | https://pytorch.org | core | Default deep learning framework for custom models. | | experiment |
| tensorflow | TensorFlow and Keras | free | yes | https://www.tensorflow.org | supported | Alternative stack required by some published baselines. | | |
| pytorch-lightning | PyTorch Lightning | free | yes | https://lightning.ai | supported | Training loop scaffolding for comparable experiments. | | |
| scikit-learn | scikit-learn | free | yes | https://scikit-learn.org | core | The classical algorithms the syllabus teaches, ready for baselines. | | experiment |
| shap | SHAP | free | yes | https://shap.readthedocs.io | supported | Feature attribution for tree and neural models. | | |
| captum | Captum | free | yes | https://captum.ai | single | Attribution methods for PyTorch models. | | |
| netron | Netron | free | yes | https://netron.app | supported | Visualise ONNX, PyTorch, and TensorFlow model graphs. | | |
| tensorboard | TensorBoard | free | yes | https://www.tensorflow.org/tensorboard | supported | Training curves and embedding projection. | | |
| imbalanced-learn | imbalanced-learn | free | yes | https://imbalanced-learn.org | supported | Resampling for skewed classes. | | |
| yellowbrick | Yellowbrick | free | yes | https://www.scikit-yb.org | supported | Visual diagnostics for model selection. | | |
| uci-ml-repository | UCI Machine Learning Repository | free | no | https://archive.ics.uci.edu | supported | Benchmark datasets reviewers recognise. | | |
| openml | OpenML | free | no | https://www.openml.org | supported | Datasets, tasks, and shared experiments. | | |
| google-dataset-search | Google Dataset Search | free | no | https://datasetsearch.research.google.com | supported | Search engine for open datasets. | | |
| papers-with-code | Papers with Code | free | no | https://paperswithcode.com | core | Papers paired with implementations. Confirm the site still resolves. | verify | frame |
| dvc | DVC | free | yes | https://dvc.org | core | Data and model versioning beside Git. | | experiment |
| gradio | Gradio | free | yes | https://www.gradio.app | single | Quick demo UI for a trained model at the defense. | | defend |

Also kept as `single`: `teachable-machine` (https://teachablemachine.withgoogle.com, free), `ray` (https://www.ray.io, free, OSS), `snakemake` (https://snakemake.github.io, free, OSS, stage experiment), `hydra` (https://hydra.cc, free, OSS, stage experiment), `aim` (https://aimstack.io, free, OSS).

### data-mining (12)

| Id | Name | Access | OSS | URL | Tier | Description | Flags |
|---|---|---|---|---|---|---|---|
| orange | Orange | free | yes | https://orangedatamining.com | supported | Visual workflows for exploratory mining without code. | |
| weka | Weka | free | yes | https://ml.cms.waikato.ac.nz/weka | supported | Classic workbench with a deep algorithm collection. | verify |
| polars | Polars | free | yes | https://pola.rs | supported | Rust dataframe that handles larger-than-memory work. | |
| duckdb | DuckDB | free | yes | https://duckdb.org | supported | In-process SQL over CSV and Parquet. | |
| dask | Dask | free | yes | https://www.dask.org | supported | Parallel pandas and NumPy for datasets beyond RAM. | |
| apache-spark | Apache Spark | free | yes | https://spark.apache.org | single | Distributed mining when one machine is not enough. | |
| mlxtend | mlxtend | free | yes | https://rasbt.github.io/mlxtend | supported | Frequent itemsets, association rules, and stacking. | |
| pycaret | PyCaret | free | yes | https://pycaret.org | single | Low-code model comparison. | |
| ydata-profiling | ydata-profiling | free | yes | https://github.com/ydataai/ydata-profiling | single | One-line dataset profiling reports. | |
| great-expectations | Great Expectations | free | yes | https://greatexpectations.io | single | Data quality assertions for a pipeline. | |
| elki | ELKI | free | yes | https://elki-project.github.io | single | Clustering and outlier detection toolkit. | |
| apache-arrow | Apache Arrow | free | yes | https://arrow.apache.org | single | Columnar format under Polars, DuckDB, and pandas interop. | |

### vision (17)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| opencv | OpenCV | free | yes | https://opencv.org | core | The base vision library and its tutorials. | | experiment |
| scikit-image | scikit-image | free | yes | https://scikit-image.org | core | NumPy-native image processing. | | |
| kornia | Kornia | free | yes | https://kornia.readthedocs.io | single | Differentiable vision operators inside PyTorch. | | |
| albumentations | Albumentations | free | yes | https://albumentations.ai | supported | Fast augmentation with mask and box support. | | |
| label-studio | Label Studio | free | yes | https://labelstud.io | core | Annotation for boxes, polygons, text, and time series. | | experiment |
| cvat | CVAT | free | yes | https://www.cvat.ai | core | Self-hosted image and video annotation. | | experiment |
| fiftyone | FiftyOne | free | yes | https://voxel51.com/fiftyone | core | Dataset curation and model error analysis. | | experiment |
| roboflow | Roboflow | freemium | no | https://roboflow.com | core | Hosted annotation and a fast path to a YOLO model. | acct | |
| make-sense | Make Sense | free | yes | https://www.makesense.ai | supported | Browser annotation with no account. | | |
| labelme | labelme | free | yes | https://github.com/wkentaro/labelme | single | Polygon annotation in Python. | verify | |
| ultralytics-yolo | Ultralytics YOLO | free | yes | https://docs.ultralytics.com | supported | Reference detection models. AGPL applies to derived code. | | |
| detectron2 | Detectron2 | free | yes | https://github.com/facebookresearch/detectron2 | supported | Meta's detection and segmentation framework. | | |
| mmdetection | MMDetection | free | yes | https://mmdetection.readthedocs.io | supported | Open model zoo for detection research. | | |
| segment-anything | Segment Anything | free | yes | https://github.com/facebookresearch/sam2 | supported | Promptable segmentation for building masks fast. | | |
| open3d | Open3D | free | yes | https://www.open3d.org | supported | Point cloud and 3D geometry processing. | | |
| imagej-fiji | ImageJ and Fiji | free | yes | https://imagej.net/software/fiji | supported | Scientific image analysis with a plugin ecosystem. | | |
| pillow | Pillow | free | yes | https://python-pillow.org | single | Image loading and preprocessing in Python. | | |

### security (31)

Every card in this category carries the note "Use only on systems you own or
are authorised to test."

| Id | Name | Access | OSS | URL | Tier | Description | Flags |
|---|---|---|---|---|---|---|---|
| cyberchef | CyberChef | free | yes | https://gchq.github.io/CyberChef | core | Encode, decode, hash, and inspect data in the browser. | |
| cryptohack | CryptoHack | free | no | https://cryptohack.org | core | Challenges built around real ciphers and constructions. | acct |
| cryptool | CrypTool | free | yes | https://www.cryptool.org | supported | Visual cipher and cryptanalysis lab. | |
| tryhackme | TryHackMe | freemium | no | https://tryhackme.com | core | Guided rooms for early security practice. | acct |
| hack-the-box | Hack The Box | freemium | no | https://www.hackthebox.com | core | Unguided labs for stronger students. | acct |
| overthewire | OverTheWire | free | no | https://overthewire.org | single | Linux and security wargames. | |
| portswigger-academy | PortSwigger Web Security Academy | free | no | https://portswigger.net/web-security | single | Web security training labs. | acct |
| shodan | Shodan | freemium | no | https://www.shodan.io | supported | Internet-connected device reconnaissance. | acct |
| have-i-been-pwned | Have I Been Pwned | free | no | https://haveibeenpwned.com | supported | Breach lookup for security awareness. | |
| owasp | OWASP | free | no | https://owasp.org | core | Top 10, testing guide, and threat modelling references. | |
| owasp-zap | OWASP ZAP | free | yes | https://www.zaproxy.org | core | Web application scanner for lab apps. | |
| burp-suite-community | Burp Suite Community | free | no | https://portswigger.net/burp/communitydownload | supported | Manual web testing with an intercepting proxy. | |
| nmap | Nmap | free | yes | https://nmap.org | supported | Host and service discovery. Custom NPSL license. | |
| kali-linux | Kali Linux | free | yes | https://www.kali.org | single | Security distribution that bundles the lab tools. | |
| openssl | OpenSSL | free | yes | https://www.openssl.org | core | TLS and core primitives, the reference for protocol experiments. | |
| pyca-cryptography | pyca/cryptography | free | yes | https://cryptography.io | supported | Python primitives with safe defaults. | |
| libsodium | libsodium | free | yes | https://libsodium.org | supported | Misuse-resistant crypto library. | |
| liboqs | liboqs | free | yes | https://openquantumsafe.org/liboqs | supported | Post-quantum algorithms for advanced crypto work. | |
| hashcat | Hashcat | free | yes | https://hashcat.net/hashcat | supported | Rule-based hash auditing. | |
| john-the-ripper | John the Ripper | free | yes | https://www.openwall.com/john | supported | Password strength auditing. | |
| ghidra | Ghidra | free | yes | https://ghidra-sre.org | supported | Reverse engineering suite. | |
| radare2 | radare2 and Cutter | free | yes | https://rada.re | single | Scriptable reverse engineering with a GUI. | |
| pwntools | pwntools | free | yes | https://docs.pwntools.com | core | Exploit development library for binary analysis work. | |
| zeek | Zeek | free | yes | https://zeek.org | core | Turns traffic into structured security logs. | |
| suricata | Suricata | free | yes | https://suricata.io | core | Intrusion detection and prevention engine. | |
| wazuh | Wazuh | free | yes | https://wazuh.com | core | Host and log monitoring with compliance reporting. | |
| semgrep | Semgrep | freemium | yes | https://semgrep.dev | supported | Static analysis for insecure code patterns. | acct |
| trivy | Trivy | free | yes | https://trivy.dev | supported | Vulnerability scanning for containers and lock files. | |
| gitleaks | gitleaks | free | yes | https://gitleaks.io | supported | Secret scanning across git history. | |
| keycloak | Keycloak | free | yes | https://www.keycloak.org | supported | Identity and access management with OIDC. | |
| mitmproxy | mitmproxy | free | yes | https://mitmproxy.org | supported | Interactive HTTPS proxy for trust experiments. | |

Also kept as `single`: `metasploit` (https://www.metasploit.com, free, OSS), `yara` (https://virustotal.github.io/yara, free, OSS).

### embedded (25)

| Id | Name | Access | OSS | URL | Tier | Description | Flags |
|---|---|---|---|---|---|---|---|
| wokwi | Wokwi | freemium | no | https://wokwi.com | core | Browser simulator for Arduino, ESP32, and STM32. No hardware needed. | acct |
| tinkercad-circuits | Tinkercad Circuits | free | no | https://www.tinkercad.com/circuits | supported | Beginner circuit and Arduino simulation. | acct |
| stm32cubeide | STM32CubeIDE | free | no | https://www.st.com/en/development-tools/stm32cubeide.html | core | Official ST toolchain with peripheral configuration. | acct |
| keil-mdk | Keil MDK | freemium | no | https://www.keil.arm.com | supported | ARM Cortex-M environment; free community edition for education. | verify |
| platformio | PlatformIO | free | yes | https://platformio.org | core | Cross-platform build system inside VS Code. | |
| arduino-ide | Arduino IDE | free | yes | https://www.arduino.cc/en/software | supported | Official Arduino development environment. | |
| esp-idf | ESP-IDF | free | yes | https://idf.espressif.com | supported | Espressif framework for ESP32 work. | |
| freertos | FreeRTOS | free | yes | https://www.freertos.org | core | The RTOS the course names, with docs and demos. | |
| zephyr | Zephyr | free | yes | https://www.zephyrproject.org | core | Scalable RTOS with a modern build system. | |
| riot-os | RIOT | free | yes | https://www.riot-os.org | supported | RTOS for constrained IoT nodes. | |
| micropython | MicroPython | free | yes | https://micropython.org | supported | Python on microcontrollers for fast prototyping. | |
| renode | Renode | free | yes | https://renode.io | core | Instruction-accurate emulation of embedded systems. | |
| qemu | QEMU | free | yes | https://www.qemu.org | supported | General emulator with Cortex-M board support. | |
| saleae-logic | Saleae Logic 2 | free | no | https://www.saleae.com/downloads | supported | Logic analysis with I2C, SPI, UART, and CAN decoders. | |
| sigrok-pulseview | sigrok and PulseView | free | yes | https://sigrok.org/wiki/PulseView | supported | Open signal capture and protocol decoding. | |
| openocd | OpenOCD | free | yes | https://openocd.org | supported | On-chip debug and flash for ARM targets. | |
| pyocd | pyOCD | free | yes | https://pyocd.io | supported | Scriptable debug and flash tool for Cortex-M. | |
| kicad | KiCad | free | yes | https://www.kicad.org | core | Schematic and PCB design. | |
| falstad-circuit | Falstad Circuit Simulator | free | yes | https://www.falstad.com/circuit | single | Interactive circuit simulation in the browser. | |
| circuitlab | CircuitLab | freemium | no | https://www.circuitlab.com | single | Browser circuit simulation. | acct |
| multisim | Multisim | student | no | https://www.ni.com/en/shop/electronic-test-instrumentation/application-software-for-electronic-test-and-instrumentation-category/what-is-multisim.html | single | Circuit simulation; student edition to be confirmed. | verify |
| velxio | Velxio | free | yes | https://velxio.dev | single | Browser multi-board emulator, new in 2026. | new, verify |
| nuttx | Apache NuttX | free | yes | https://nuttx.apache.org | single | POSIX-style RTOS for deeply embedded systems. | |
| libopencm3 | libopencm3 | free | yes | https://libopencm3.org | single | Firmware library for Cortex-M without vendor generators. | |
| arduino-cli | arduino-cli | free | yes | https://arduino.github.io/arduino-cli | single | Scripted Arduino builds for CI. | |

## Research

### literature (30)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| google-scholar | Google Scholar | free | no | https://scholar.google.com | core | Broadest coverage and the standard citation tracker. | | search |
| semantic-scholar | Semantic Scholar | free | no | https://www.semanticscholar.org | core | Metadata-rich search with an open API and TLDRs. | | search |
| arxiv | arXiv | free | no | https://arxiv.org | core | Preprints across ML, signals, networking, and security. | | search, retrieve |
| openalex | OpenAlex | free | yes | https://openalex.org | core | Open scholarly graph with a free API. | | frame, search |
| dblp | DBLP | free | no | https://dblp.org | supported | Clean computer science bibliography for venue checks. | | frame |
| core | CORE | free | no | https://core.ac.uk | supported | Open access aggregation with full-text search. | | retrieve |
| base | BASE | free | no | https://www.base-search.net | supported | Bielefeld index over institutional repositories. | | search |
| doaj | DOAJ | free | no | https://doaj.org | supported | Directory of open access journals; vet a venue here. | | frame |
| unpaywall | Unpaywall | free | yes | https://unpaywall.org | core | Finds a legal open copy of a paywalled DOI. | | retrieve |
| open-access-button | Open Access Button | free | yes | https://openaccessbutton.org | supported | Open copy finder with a request flow. | | retrieve |
| research-rabbit | ResearchRabbit | free | no | https://www.researchrabbit.ai | core | Citation network mapping from seed papers with Zotero sync. | acct | map |
| connected-papers | Connected Papers | freemium | no | https://www.connectedpapers.com | core | Co-citation graph from one seed paper. Five graphs a month free. | | map |
| litmaps | Litmaps | freemium | no | https://www.litmaps.com | supported | Timeline view of a citation network. | acct | map |
| inciteful | Inciteful | free | no | https://inciteful.xyz | supported | Finds bridge paths between two papers. | | map |
| open-knowledge-maps | Open Knowledge Maps | free | no | https://openknowledgemaps.org | supported | Concept map from a keyword when there is no seed paper. | | frame |
| elicit | Elicit | freemium | no | https://elicit.com | core | Extracts methods and findings into a comparison table. | acct, privacy | screen |
| consensus | Consensus | freemium | no | https://consensus.app | core | Agreement signals across papers for a claim. | acct | screen |
| scite | scite | freemium | no | https://scite.ai | core | Whether later work supported or disputed a claim. | acct | map |
| undermind | Undermind | freemium | no | https://www.undermind.ai | core | Slow multi-hop search that surfaces long-tail papers. | acct | search |
| scispace | SciSpace | freemium | no | https://scispace.com | core | Paper explainers and a review workspace. | acct, privacy | screen |
| explainpaper | Explainpaper | freemium | no | https://www.explainpaper.com | core | Highlight a passage and get an explanation. | acct, privacy | screen |
| chatpdf | ChatPDF | freemium | no | https://www.chatpdf.com | supported | Ask questions about one uploaded PDF. | acct, privacy | screen |
| google-scholar-metrics | Google Scholar Metrics | free | no | https://scholar.google.com/citations?view_op=top_venues | supported | Venue ranking by h5-index. | | frame |
| scimago | Scimago Journal Rank | free | no | https://www.scimagojr.com | supported | Journal quartiles for target venues. | | frame |
| ieee-xplore | IEEE Xplore | university | no | https://ieeexplore.ieee.org | core | The core archive for comms, DSP, and embedded literature. | liu | search |
| acm-dl | ACM Digital Library | university | no | https://dl.acm.org | supported | Computing, security, and systems literature. | liu | search |
| scopus | Scopus | university | no | https://www.scopus.com | supported | Citation database for bibliometrics. | liu | search |
| web-of-science | Web of Science | university | no | https://www.webofscience.com | supported | Citation tracking across publishers. | liu | search |
| springerlink | SpringerLink | university | no | https://link.springer.com | supported | Springer journals and book chapters. | liu | search |
| sciencedirect | ScienceDirect | university | no | https://www.sciencedirect.com | supported | Elsevier journals, strong in signals and control. | liu | search |

Also kept as `single`: `ieee-dataport` (https://ieee-dataport.org, freemium, engineering datasets), `internet-archive-scholar` (https://scholar.archive.org, free).

### references (9)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| zotero | Zotero | free | yes | https://www.zotero.org | core | Browser capture, PDF notes, group libraries for supervisor sharing. | | screen, cite |
| zotero-better-bibtex | Better BibTeX for Zotero | free | yes | https://retorquere.github.io/zotero-better-bibtex | core | Stable citation keys and automatic BibTeX export. | | cite |
| jabref | JabRef | free | yes | https://www.jabref.org | core | BibTeX-native manager for LaTeX-only manuscripts. | | cite |
| mendeley | Mendeley | freemium | no | https://www.mendeley.com | core | PDF annotation and collaboration; pick it when the advisor uses it. | acct | cite |
| endnote | EndNote | university | no | https://endnote.com | supported | Institutional reference manager; only if LIU provides it. | liu | |
| zoterobib | ZoteroBib | free | no | https://zbib.org | supported | One-off bibliography without a library. | | cite |
| crossref | Crossref | free | no | https://www.crossref.org | supported | DOI metadata lookup and validation. | | cite |
| doi-org | DOI.org | free | no | https://doi.org | supported | Canonical DOI resolution check before submission. | | cite |
| zotero-shortdoi | Zotero DOI Manager | free | yes | https://github.com/bwiernik/zotero-shortdoi | supported | Fetches and verifies DOIs for imported items. | | cite |

### writing (27)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| overleaf | Overleaf | freemium | no | https://www.overleaf.com | core | Collaborative LaTeX with templates and advisor comments. | acct | write |
| typst | Typst | free | yes | https://typst.app | core | Fast typesetting with readable markup and clean math. | | write |
| quarto | Quarto | free | yes | https://quarto.org | core | One source to PDF, HTML, Word, and slides, code included. | | write, analyse |
| pandoc | Pandoc | free | yes | https://pandoc.org | core | Converts between Markdown, LaTeX, DOCX, and PDF with citations. | | write |
| lyx | LyX | free | yes | https://www.lyx.org | supported | Structure-first editing over LaTeX. | | write |
| texstudio | TeXstudio | free | yes | https://www.texstudio.org | supported | Full-featured desktop LaTeX editor. | | write |
| latex-workshop | LaTeX Workshop | free | yes | https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop | supported | VS Code extension for local LaTeX builds with SyncTeX. | | write |
| tex-live | TeX Live | free | yes | https://tug.org/texlive | supported | Local LaTeX distribution for offline builds. | | write |
| latex-project | LaTeX Project | free | yes | https://www.latex-project.org | supported | Official LaTeX documentation. | | |
| ieee-template-selector | IEEE Template Selector | free | no | https://template-selector.ieee.org | supported | Official IEEE manuscript templates. | | frame, write |
| academic-phrasebank | Academic Phrasebank | free | no | https://www.phrasebank.manchester.ac.uk | core | Sentence patterns for reviews, methods, and limitations. | | write |
| grammarly | Grammarly | freemium | no | https://www.grammarly.com | core | Grammar and clarity checking. | acct, privacy | write |
| languagetool | LanguageTool | freemium | yes | https://languagetool.org | core | Grammar and style with a self-hosted option. | | write |
| deepl-write | DeepL Write | freemium | no | https://www.deepl.com/write | core | Rephrasing polish for non-native English. | privacy | write |
| writefull | Writefull | freemium | no | https://www.writefull.com | supported | Academic phrasing feedback. | acct | write |
| hemingway | Hemingway Editor | free | no | https://hemingwayapp.com | supported | Highlights long sentences and passive voice. | | write |
| marp | Marp | free | yes | https://marp.app | supported | Markdown to slide deck, kept in version control. | | defend |
| beamer | Beamer | free | yes | https://ctan.org/pkg/beamer | supported | LaTeX slides that match the manuscript. | | defend |
| texlyre | TeXlyre | free | yes | https://github.com/TeXlyre/texlyre | supported | Local-first LaTeX and Typst editor with offline builds. | new | write |
| oleafly | Oleafly | free | yes | https://oleafly.com | supported | Local-first LaTeX, Typst, and Markdown workspace with Git history. | new, verify | write |
| tinyleaf | tinyleaf | free | yes | https://github.com/Oaklight/tinyleaf | supported | Self-hosted Overleaf alternative, CLI-first. | new | write |
| texbrain | TeXbrain | free | yes | https://github.com/swimmingbrain/texbrain | supported | Browser LaTeX editor compiling client-side. | new | write |
| openprism | OpenPrism | free | yes | https://github.com/OpenDCAI/OpenPrism | supported | Local-first LaTeX workspace with AI assistance. | new, privacy | write |
| flowtex | FlowTex | free | yes | https://github.com/stolucc/flowtex | supported | Self-hosted collaborative LaTeX with tracked changes. Single maintainer. | new | write |
| scholarly-writing-skill | Scholarly (writing skill) | free | yes | https://github.com/ShiyangZheng/scholarly | supported | Agent skill that walks a paper section by section. | new, privacy | write |
| opendraft | OpenDraft | free | yes | https://github.com/PhilioAI/opendraft | supported | Multi-agent draft generator with citation checks. A drafting aid, not a ghostwriter. | new, verify, privacy | write |
| gpt-researcher | GPT Researcher | free | yes | https://gptr.dev | supported | Autonomous research agent that returns a cited report. | new, privacy | frame |

### review (12)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| prisma-2020 | PRISMA 2020 | free | no | https://www.prisma-statement.org | supported | The reporting standard a review chapter is judged against. | | screen |
| asreview | ASReview | free | yes | https://asreview.nl | core | Active learning that ranks abstracts by relevance. | | screen |
| rayyan | Rayyan | freemium | no | https://www.rayyan.ai | core | Collaborative blind screening with duplicate detection. | acct | screen |
| reviq | ReviQ | free | yes | https://github.com/philipphaindl/ReviQ | core | Docker workbench for the full Kitchenham workflow with PRISMA output. | new | screen |
| parsifal | Parsifal | freemium | no | https://parsif.al | core | Protocol-driven review workspace. | acct, verify | screen |
| relis | ReLiS | free | yes | https://relis.iro.umontreal.ca | supported | Multi-reviewer screening with conflict resolution. | verify | screen |
| thoth | Thoth | free | no | https://thoth-slr.com | supported | Web review tool with Crossref snowballing. | verify | screen |
| colrev | ColRev | free | yes | https://github.com/CoLRev-Environment/colrev | supported | Git-native review loop across search, dedupe, and synthesis. | | screen |
| cadima | CADIMA | free | no | https://www.cadima.info | supported | Review coordination with evidence mapping. | acct | screen |
| covidence | Covidence | paid | no | https://www.covidence.org | supported | Team screening platform, often institutional. | | |
| kitchenham-guidelines | Kitchenham and Charters guidelines | free | no | https://www.cs.auckland.ac.nz/~mriaz/SE4Research/papers/Kitchenham.pdf | supported | The methodological guide for reviews in computing. | verify | screen |
| start | StArt | free | no | http://lapes.dc.ufscar.br/tools/start_tool | supported | Desktop review tool for software engineering. | verify | |

### thesis-archives (8)

| Id | Name | Access | OSS | URL | Tier | Description | Stages |
|---|---|---|---|---|---|---|---|
| oatd | OATD | free | no | https://oatd.org | core | Open access theses and dissertations worldwide. | prior-theses |
| ndltd | NDLTD | free | no | https://ndltd.org | core | Global thesis library network. | prior-theses |
| ebsco-open-dissertations | EBSCO Open Dissertations | free | no | https://www.ebsco.com/open-dissertations | core | Open dissertation index with faceted search. | prior-theses |
| dart-europe | DART-Europe | free | no | https://www.dart-europe.org | supported | European thesis portal with full text. | prior-theses |
| openaire | OpenAIRE | free | no | https://www.openaire.eu | supported | Links publications, data, and funding. | prior-theses |
| digital-commons-network | Digital Commons Network | free | no | https://network.bepress.com | supported | Institutional repository content across universities. | prior-theses |
| proquest-open | ProQuest open access | free | no | https://about.proquest.com/en/content-solutions/open-access | supported | The open slice of the ProQuest index. | prior-theses |
| hal | HAL | free | no | https://hal.science | single | French open archive, strong in European research. | prior-theses |

### integrity-archiving (11)

| Id | Name | Access | OSS | URL | Tier | Description | Flags | Stages |
|---|---|---|---|---|---|---|---|---|
| turnitin | Turnitin | university | no | https://www.turnitin.com | supported | The official similarity check, if the department uses it. | liu | integrity |
| jplag | JPlag | free | yes | https://github.com/jplag/JPlag | core | Source code similarity for the software chapter. | | integrity |
| copyleaks | Copyleaks | freemium | no | https://copyleaks.com | supported | Text similarity and AI-content checks. | acct, privacy | integrity |
| quetext | Quetext | freemium | no | https://www.quetext.com | supported | Deep-search similarity pass for drafts. | privacy | integrity |
| duplichecker | DupliChecker | freemium | no | https://www.duplichecker.com | supported | Second opinion on similarity before the advisor sees it. | privacy | integrity |
| scribbr-checker | Scribbr plagiarism checker | paid | no | https://www.scribbr.com/plagiarism-checker | supported | Student-oriented checker plus writing guides. | privacy | integrity |
| ithenticate | iThenticate | paid | no | https://www.ithenticate.com | single | Publisher-grade similarity check. | | |
| zenodo | Zenodo | free | no | https://zenodo.org | core | Mint a DOI for code and data at submission. | acct | integrity |
| osf | OSF | free | yes | https://osf.io | core | Project workspace, preregistration, and file sharing. | acct | integrity, defend |
| orcid | ORCID | free | no | https://orcid.org | supported | Persistent researcher identifier. | acct | integrity |
| howfairis | howfairis | free | yes | https://github.com/fair-software/howfairis | supported | Scores a repository against FAIR guidance. | | integrity |

## Access

### access (12)

| Id | Name | Access | OSS | URL | Tier | Description | Flags |
|---|---|---|---|---|---|---|---|
| github-student-pack | GitHub Student Developer Pack | student | no | https://education.github.com/pack | core | Copilot, JetBrains, cloud credits, and more while enrolled. | acct |
| jetbrains-student | JetBrains student license | student | no | https://www.jetbrains.com/community/education | core | Full IDE suite, renewable yearly. Same entry as JetBrains IDEs in dev; keep one and cross-reference. | acct, verify |
| azure-for-students | Microsoft Azure for Students | student | no | https://azure.microsoft.com/en-us/free/students | supported | Annual credit without a card. | acct |
| aws-educate | AWS Educate | student | no | https://aws.amazon.com/education/awseducate | supported | Guided cloud labs and credits. | acct |
| google-cloud-skills-boost | Google Cloud Skills Boost | freemium | no | https://www.cloudskillsboost.google | single | Skill paths and lab credits. | acct |
| microsoft-365-education | Microsoft 365 Education | student | no | https://www.microsoft.com/education/products/office | supported | Word, Excel, PowerPoint under the university account. | acct |
| notion-for-education | Notion for Education | student | no | https://www.notion.so/product/notion-for-education | supported | Free Plus plan with an academic email. | acct |
| figma-for-education | Figma for Education | student | no | https://www.figma.com/education | supported | Professional design tools free for students. | acct |
| autodesk-education | Autodesk Education | student | no | https://www.autodesk.com/education | supported | Engineering and design software for students. | acct |
| ieee-student-membership | IEEE student membership | paid | no | https://www.ieee.org/membership/student.html | supported | Student rate for journals and conferences. | acct |
| liu-library-databases | LIU Library databases | university | no | https://liu.edu.lb | core | IEEE, ACM, Scopus, and peers through the library. Portal URL to be confirmed. | liu, verify |
| matlab-student | MATLAB student license | student | no | https://www.mathworks.com/academia/students.html | core | Only if LIU has no campus license. Same product as the MATLAB entry in math; keep one and cross-reference. | liu, verify |

## Duplicates to resolve at authoring time

Two pairs above point at the same product from two categories. The rule is
one entry per product, so pick a home:

| Product | Options | Recommendation |
|---|---|---|
| JetBrains | `dev/jetbrains-ides` or `access/jetbrains-student` | Keep in `dev` with badge `student`; the Access section is a badge filter view (`?badge=student,university`) and will show it there |
| MATLAB | `math/matlab` or `access/matlab-student` | Keep in `math` with badge `university` until LIU confirms; the description names the student license as the fallback |

Cisco NetAcad and Packet Tracer stay as two entries because one is a
program and the other is a tool.
