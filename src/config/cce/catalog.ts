import type { CceCourse } from "@/lib/cce/types";

/**
 * Every course either CCE bachelor program can require, keyed by code. Names,
 * credits, prerequisites, and corequisites come from the department's contract
 * sheets; descriptions come from the course description PDFs, which publish
 * nothing for the major electives and publish ARAB200 and CULT200 in Arabic only.
 *
 * Typed with an undefined value so a lookup by an arbitrary code is checked
 * rather than trusted.
 */
export const CCE_CATALOG: Record<string, CceCourse | undefined> = {
  ARAB200: {
    code: "ARAB200",
    corequisites: [],
    credits: 3,
    description: null,
    name: "Arabic Language and Literature",
    prerequisites: [],
  },
  CENG250: {
    code: "CENG250",
    corequisites: [],
    credits: 3,
    description:
      "This course introduces the concepts of digital logic operations and design. The course teaches fundamentals of digital logic design through the use of a large number of design problems. Topics include: Boolean algebra, theory of logic functions; mapping techniques and function minimization; logic equivalent circuits and gate transformations; base conversion number notations and arithmetic; binary addition/subtraction, decoder, encoder, comparator, multiplexer and de-multiplexer circuits in combinational systems.",
    name: "Digital Logic I",
    prerequisites: ["EENG250"],
  },
  CENG325: {
    code: "CENG325",
    corequisites: [],
    credits: 3,
    description:
      "The objective of this course is to introduce students to various topics in designing and developing computer applications using an object-oriented programming language. Students completing this course will be exposed to the concept, design, implementation, and testing of object-oriented programs. Furthermore, topics such as graphical user interface, tracing, debugging, and creating executables along with the UML (Unified Modeling Language) will be thoroughly covered. Students will be introduced briefly to the concept of socket programming.",
    name: "Software Applications and Design",
    prerequisites: ["CSCI300"],
  },
  CENG335: {
    code: "CENG335",
    corequisites: [],
    credits: 3,
    description:
      "This course is an extension of Digital Logic I. The course introduces the student to sequential circuit concepts and building blocks, such as: latches and flip-flops, state tables and state equations, the Moore and Mealy state machine. The course focuses on well known problems solved by the application of digital logic design methods and components. This course also introduces the student to hardware programming languages.",
    name: "Digital Logic II",
    prerequisites: ["CSCI250", "CENG250"],
  },
  CENG352L: {
    code: "CENG352L",
    corequisites: [],
    credits: 1,
    description:
      "This lab introduces experiments concerning designing, simulating and testing digital logic circuits, which uses combinational logic design; decoders and encoders, multiplexers, signed number notations and arithmetic; binary addition/subtraction circuits; PLA, PAL, theory of sequential circuits; timing diagrams; analysis and synthesis of D, JK, and T flip flop based sequential circuits; design with D and JK flip-flops. The objective of this course is to cover experimentally all experiments that are related to the topics above. After that, each group of two students should have the tools to build combinatory circuits as a small project which allows them to submit the design and complete it by simulation and implementation.",
    name: "Digital Logic Circuits Lab",
    prerequisites: ["CENG250", "EENG301L"],
  },
  CENG375: {
    code: "CENG375",
    corequisites: [],
    credits: 3,
    description:
      "This course offers students an introduction to the design and programming of database systems. In particular, it covers the ER (Entity-Relationship) approach to data modelling, the relational model of database management systems (RDBMS), and the use of relational algebra and query languages such as SQL to create, modify and query the database. Besides, it introduces the linking of database management systems to programming environments such as the Java programming language. This course will also touch upon data normalization and the role of transaction management, as well as creating triggers and assertions.",
    name: "Introduction to Database Systems",
    prerequisites: ["CENG325", "CSCI300"],
  },
  CENG380: {
    code: "CENG380",
    corequisites: ["CENG352L"],
    credits: 3,
    description:
      "This course introduces students to the principles of microcontroller design and applications. Students will be introduced to the AVR microcontroller architecture. Moreover, the course introduces programming using AVR assembly language and the C programming language. Topics introduced will include: hardware architecture, looping, branching, arithmetic and logical operations, timers, interrupts, parallel I/O and interfacing.",
    name: "Microprocessors and Microcontrollers",
    prerequisites: ["CENG250", "CENG335", "EENG250", "CSCI250"],
  },
  CENG400: {
    code: "CENG400",
    corequisites: [],
    credits: 3,
    description:
      "This course introduces fundamental concepts in computer organization and digital logic design, including computer arithmetic, MIPS processor design including ALU, data path and controls, pipelining and pipeline hazards, interrupts and exceptions, memory hierarchy, caches, and virtual memory.",
    name: "Computer Organization and Design",
    prerequisites: ["CENG335", "CENG250", "CENG380"],
  },
  CENG400L: {
    code: "CENG400L",
    corequisites: [],
    credits: 1,
    description:
      "This lab covers the programming and hardware application of Arduino microcontroller projects. This course contains an introduction to Arduino ATmega328P programming, serial/parallel bus interfacing with Arduino, using C languages in programming, using ISIS Proteus software for simulation, and using Atmel 7.0 software in editing, compiling, simulating and programming. The main objective of this laboratory is to cover experimentally all the applications on the Arduino microchip microcontroller. It is an integral part of CENG380 Microprocessors and Microcontrollers and it reinforces and complements the material covered in this course.",
    name: "Microcontroller Applications Lab",
    prerequisites: ["CENG380"],
  },
  CENG415: {
    code: "CENG415",
    corequisites: [],
    credits: 3,
    description:
      "This course constitutes an introduction to fundamental concepts in the design and implementation of computer communication networks, their protocols and applications (FTP, SMTP, HTTP, etc.). Topics include: overview of network architectures and topologies, applications, reliable data transfer, transport, congestion and flow control, routing, and data link protocols, addressing, local area networks. This course covers all the material required in the CCNA1 Cisco exam. After finishing the course, students will be ready to do the theoretical exam and also the skills exam based on the lab sessions given during the semester on Packet Tracer.",
    name: "Communication Networks",
    prerequisites: ["CENG250", "CENG325", "CSCI250", "CSCI300"],
  },
  CENG420: {
    code: "CENG420",
    corequisites: [],
    credits: 3,
    description:
      "The course focuses on the design and development of web based applications using a number of currently popular tools and technologies. Also to be explored is the use of databases as data repositories for multitier web applications. Topics to be examined include: introduction to HTML and CSS, client-side scripting (JavaScript and DOM) and jQuery, server-side scripting with PHP and AJAX, database connectivity, session tracking, HTTP headers and their use, security and privacy risks.",
    name: "Web Programming and Technologies",
    prerequisites: ["CENG325", "CSCI300", "CENG375"],
  },
  CENG430L: {
    code: "CENG430L",
    corequisites: [],
    credits: 1,
    description:
      "This lab course teaches scripting for the Raspberry Pi platform. Both Linux and Python scripting are introduced with the focus on Linux scripting for the Raspberry Pi. Topics covered in the lab include automation, interfacing and networking.",
    name: "Linux Lab",
    prerequisites: ["CENG380", "CENG325"],
  },
  CENG435: {
    code: "CENG435",
    corequisites: [],
    credits: 3,
    description:
      "This course focuses on the development of advanced mobile applications using the Android platform. Students will be introduced to the Android environment and learn the necessary skills for creating, simulating and deploying Android applications. The topics include: Android platform installation, AndroidManifest, user interfaces, data persistency, geo-locations, media handling, networking, services and deployment. Students are also exposed to business models and current trends in mobile application development.",
    name: "Mobile Application Development",
    prerequisites: ["CENG325", "CSCI300", "CENG375"],
  },
  CENG450L: {
    code: "CENG450L",
    corequisites: [],
    credits: 1,
    description:
      "This course teaches students popular scientific scripting languages that are used in engineering, especially computer and communications engineering.",
    name: "Scripting Languages Lab",
    prerequisites: ["CENG430L"],
  },
  CENG455L: {
    code: "CENG455L",
    corequisites: [],
    credits: 1,
    description:
      "Based on student theoretical knowledge in communication networks, this lab is designed to help them start practical experience in Internet networking. Students will be introduced to the Packet Tracer network simulator, with which they will be able to build, configure, and manipulate a LAN and a WAN network. Moreover, students will be introduced to the major concepts of how to configure a real LAN network by running switches, routers, and IPv4/IPv6. Furthermore, basic client/server applications would be introduced and implemented. In addition, students will learn how to filter network traffic using standard or extended access lists and how to logically separate networks using virtual local area networks (VLAN). Quizzes are based on review questions after each experiment. These questions are CCNA2 based questions.",
    name: "Communication Networks Lab",
    prerequisites: ["CENG415"],
  },
  CENG460: {
    code: "CENG460",
    corequisites: [],
    credits: 3,
    description: null,
    name: "Operating Systems",
    prerequisites: ["CENG380", "CSCI300"],
  },
  CENG470: {
    code: "CENG470",
    corequisites: [],
    credits: 3,
    description: null,
    name: "Data Structures and Analysis of Algorithms",
    prerequisites: ["CENG325", "CSCI300"],
  },
  CENG480: {
    code: "CENG480",
    corequisites: [],
    credits: 3,
    description: null,
    name: "Introduction to GIS",
    prerequisites: ["CENG415", "CENG375"],
  },
  CENG495: {
    code: "CENG495",
    corequisites: [],
    credits: 3,
    description:
      "This course integrates the knowledge acquired in the various courses of the undergraduate curriculum into an open-ended design effort and applies the knowledge gained to the solution of a contemporary engineering problem. Students improve oral and written communication skills, gain familiarity with available technical literature, and experience the life cycle of a design project within a group environment. Many projects include practice in the use of computers and relevant support software while solving a design problem. Students work together as a team to accomplish common goals and be able to participate in regional and national competitions.",
    name: "Senior Project",
    prerequisites: [
      "CENG420",
      "EENG350",
      "EENG447",
      "CENG435",
      "CENG415",
      "CENG380",
      "CENG375",
    ],
  },
  CSCI250: {
    code: "CSCI250",
    corequisites: ["CSCI250L"],
    credits: 3,
    description:
      "This course introduces the basic concepts and principles of structured programming in Java. It starts with an introduction to Java showing its syntax and the structure of a program in Java, then teaches simple data types, control structures, methods, arrays, and strings.",
    name: "Introduction to Programming",
    prerequisites: ["ENGL101"],
  },
  CSCI250L: {
    code: "CSCI250L",
    corequisites: ["CSCI250"],
    credits: 1,
    description:
      "This course is a corequisite for the Introduction to Programming course (CSCI250). The students apply in the lab the fundamentals of programming explained in CSCI250 by solving lab exercises. In this lab, students solve programming problems by using primary data types, selection and repetition structures, methods and arrays. This lab is an opportunity for the students to have direct help when needed from the instructor, but it is not sufficient for practice; students should practice with more exercises on their own.",
    name: "Introduction to Programming Lab",
    prerequisites: ["ENGL101"],
  },
  CSCI300: {
    code: "CSCI300",
    corequisites: [],
    credits: 3,
    description:
      "The course emphasizes the principles of object oriented programming using the Java programming language. It starts with an introduction to creating applications using Java. Then the course introduces how to define classes and declare objects and discusses the main topics related to object-oriented programming (constructors, methods, dependency, aggregation, inheritance, and polymorphism). Finally, the course introduces exception handling as well as writing to and reading from files.",
    name: "Intermediate Programming with Objects",
    prerequisites: ["CSCI250L", "CSCI250"],
  },
  CULT200: {
    code: "CULT200",
    corequisites: [],
    credits: 3,
    description: null,
    name: "Introduction to Arab - Islamic Civilization",
    prerequisites: [],
  },
  EENG250: {
    code: "EENG250",
    corequisites: ["ENGG200", "MATH210"],
    credits: 3,
    description:
      "The course provides an introduction to electrical and electronics engineering. The course has been designed to introduce fundamental principles of circuit theory commonly used in engineering research and science applications, the concepts of voltage, current, power, resistance, capacitance and inductance. Circuit analysis techniques such as Kirchhoff's laws, node voltages, and mesh currents. Thevenin's and Norton's equivalent circuits, in addition to special circuits with op-amps and the response of first order RL and RC circuits.",
    name: "Electric Circuits I",
    prerequisites: ["PHYS161", "PHYS160", "MATH161", "MATH160", "ENGL051"],
  },
  EENG300: {
    code: "EENG300",
    corequisites: ["EENG301L"],
    credits: 3,
    description:
      "This course introduces the techniques of AC circuit analysis, containing ideal and dependent sources. It also covers sinusoidal steady state power calculations, balanced three phase circuits and frequency selective circuits.",
    name: "Electric Circuits II",
    prerequisites: ["EENG250"],
  },
  EENG301L: {
    code: "EENG301L",
    corequisites: ["EENG300"],
    credits: 1,
    description:
      "This lab introduces experiments concerning designing, building, and testing DC and AC electric circuits which use resistors, capacitors, inductors, transformers, and op-amps. The objectives of this course are to reinforce and complement the material covered in the course. It enhances the technical abilities of the students by engaging them in experiments that involve the most common electric lab equipment such as multimeters, function generators, DC sources and oscilloscopes. Also, this lab offers the ability to test electric circuits using schematics software (LTspice). The lab concludes with designing applications on filters and op-amps.",
    name: "Electric Circuits Lab",
    prerequisites: ["EENG250"],
  },
  EENG350: {
    code: "EENG350",
    corequisites: ["EENG350L"],
    credits: 3,
    description:
      "This course includes the following topics: semiconductors, P-N junction: current-voltage characteristics, diode models, diode circuit applications. Bipolar junction transistor (BJT): structure, current-voltage characteristics, DC biasing, small-signal model, BJT amplifiers. Metal Oxide Semiconductor Field-Effect Transistor (MOSFET): structure, current-voltage characteristics, DC biasing, small-signal model, MOSFET amplifiers.",
    name: "Electronic Circuits I",
    prerequisites: ["ENGG200", "CENG250", "EENG300", "EENG250"],
  },
  EENG350L: {
    code: "EENG350L",
    corequisites: ["EENG350"],
    credits: 1,
    description:
      "This lab introduces experiments concerning designing, building, and testing electronic circuits which use diodes, BJTs, and MOSFETs. The objectives of this lab are to reinforce and complement the material covered in the course. It introduces experiments related to the design, implementation, and testing of the characteristics of different types of diodes and verifies practically some of their applications. Moreover, BJT and MOSFET characteristics as well as their different types of amplifier configurations are going to be modeled, implemented and tested.",
    name: "Electronic Circuits I Lab",
    prerequisites: ["EENG300", "EENG250", "EENG301L"],
  },
  EENG385: {
    code: "EENG385",
    corequisites: ["MATH310", "MATH270"],
    credits: 3,
    description:
      "This course introduces signals and systems, their types and properties, and their relation in the time and frequency domains. It covers signal and system modeling concepts, system modeling and analysis of LTI systems in the time domain, the Fourier series, the Fourier transform and its applications, and the Laplace transformation and its applications.",
    name: "Signals and Systems",
    prerequisites: ["MATH225", "EENG300"],
  },
  EENG388: {
    code: "EENG388",
    corequisites: [],
    credits: 3,
    description:
      "This is a comprehensive undergraduate course on electromagnetic fields and waves, discussing general electromagnetic theory and covering the following topics. Vector analysis: vectors in different coordinate systems, including divergence, gradient and curl operators. The electrostatic topics include Coulomb's law, Gauss's law, Joule's law and electric forces and electric potential. The magnetostatics include Biot-Savart's law, Ampere's law and magnetic forces and torques. Finally, in dynamic fields, the topics include Maxwell's equations, Faraday's law and plane wave propagation.",
    name: "Electromagnetic Fields and Waves",
    prerequisites: ["MATH270", "PHYS220", "MATH220", "EENG300"],
  },
  EENG447: {
    code: "EENG447",
    corequisites: [],
    credits: 3,
    description:
      "This course provides a thorough understanding of the principles of analog communication systems for undergraduate students in electrical and computer communications engineering. The course covers basic background material on linear systems and noiseless modulation, spectral density and correlation of deterministic and random analog signals, thermal noise and white noise models, linear and angle modulation, interference, feedback demodulators, and noise effects in modulation systems.",
    name: "Analog Communication Systems",
    prerequisites: ["MATH310", "EENG385"],
  },
  EENG467L: {
    code: "EENG467L",
    corequisites: [],
    credits: 1,
    description:
      "This lab introduces experiments concerning the design and simulation of a complete analog communication system using LabVIEW. The objectives of this course are to reinforce and complement the material covered in the course. The lab includes designing the modulators and demodulators of different analog modulation schemes such as AM, DSB, SSB and FM. Each scheme is studied in both time and frequency domain to obtain power and performance characteristics. The lab concludes with real time testing using NI USRP2901 to study the complexity and performance of each modulation scheme.",
    name: "Analog Communication Systems Lab",
    prerequisites: ["EENG447"],
  },
  ENGG200: {
    code: "ENGG200",
    corequisites: [],
    credits: 3,
    description:
      "Introduction to Engineering is a first-year course designed to help students explore the world of engineering by introducing them to what engineers do, the fundamental principles that form the basis of their work, and how they apply that knowledge within a structured design process. The course gives the student an opportunity to apply those concepts by developing a prototype system as part of a team. The course also enables the student to develop technical presentation skills.",
    name: "Introduction to Engineering",
    prerequisites: ["MATH160", "CHEM160"],
  },
  ENGG300: {
    code: "ENGG300",
    corequisites: ["MATH220"],
    credits: 3,
    description:
      "This course covers the fundamentals of engineering economics for engineering professionals to match engineering practice today. It recognizes the role of the engineer as a decision maker who has to make and defend sensible decisions. It emphasizes the analytical consideration of money and its impact on decision making as well as other factors such as environmental and social factors and tasks. By the end of the course students will be equipped with basic analytical skills for solving problems of an economic nature with real-world examples.",
    name: "Engineering Economics",
    prerequisites: ["ENGL201", "MATH225"],
  },
  ENGG450: {
    code: "ENGG450",
    corequisites: ["CENG495"],
    credits: 3,
    description:
      "Engineering Ethics and Professional Practice is a complete study course on the role of ethics in engineering in their historical, philosophical and professional contexts. The course examines the impact of ethical theories and their application to issues encountered in the engineering profession, such as employee rights, whistleblowing, safety, risk and liability, professional responsibility to consumers and employers, conflicts of interest, codes of ethics, legal obligations, environmental and social responsibility. Through the use of real and hypothetical case studies, the course focuses on developing analysis techniques and applying them to ethical problems through independent critical thinking and moral sensitivity.",
    name: "Engineering Ethics and Professional Practice",
    prerequisites: ["ENGG300", "ENGL251"],
  },
  ENGL201: {
    code: "ENGL201",
    corequisites: [],
    credits: 3,
    description:
      "This course builds upon the skills acquired in prerequisite courses, mainly ENGL151, to further develop students' critical thinking and academic writing competencies. Students will read and respond to a variety of texts from different disciplines and produce a research paper using analytical and critical skills in response to texts.",
    name: "Composition and Research Skills",
    prerequisites: ["ENGL151"],
  },
  ENGL251: {
    code: "ENGL251",
    corequisites: [],
    credits: 3,
    description:
      "Workplace occupational writing is an advanced interdisciplinary writing course emphasizing workplace and technical communication and editing appropriate to diverse professions. It incorporates practice and study of selected types of discourse employed in professional writing situations, preparing students for different systems of writing in their professional lives. Examples from the writing of workplace professionals are analyzed and used as models to demonstrate the transition from academic to professional writing.",
    name: "Communication Skills",
    prerequisites: ["ENGL201"],
  },
  MATH210: {
    code: "MATH210",
    corequisites: [],
    credits: 3,
    description:
      "This is the second course in the calculus sequence. The course material includes logarithmic, exponential, and trigonometric functions, their inverses and their derivatives, integration techniques, improper integrals, sequences, infinite series, tests of convergence, alternating series, power series, polar coordinates and its application.",
    name: "Calculus II",
    prerequisites: ["MATH161", "MATH160"],
  },
  MATH220: {
    code: "MATH220",
    corequisites: [],
    credits: 3,
    description:
      "The course consists of two parts: multivariable calculus and vector calculus. Multivariable calculus is the extension of calculus in one variable to calculus in more than one variable (quadric surfaces, partial differentiation, multiple integration). Vector calculus applies calculus to the concept of vector fields.",
    name: "Calculus III",
    prerequisites: ["MATH210"],
  },
  MATH225: {
    code: "MATH225",
    corequisites: [],
    credits: 3,
    description:
      "This course provides an introduction to linear algebra topics. Emphasis is placed on the development of abstract concepts and applications for vectors, systems of equations, matrices, determinants, vector spaces, multi-dimensional linear transformations, eigenvectors, eigenvalues, diagonalization and orthogonality. The concepts of linear algebra are extremely useful in physics, economics and social sciences, natural sciences, and engineering.",
    name: "Linear Algebra with Applications",
    prerequisites: ["MATH160", "ENGL051", "MATH161"],
  },
  MATH270: {
    code: "MATH270",
    corequisites: ["MATH225"],
    credits: 3,
    description:
      "This course provides an introduction to ordinary differential equations and their applications. The contents of this course include first order equations, separable, exact, and linear equations, second and higher order differential equations, systems of differential equations, series solutions, and Laplace transformation.",
    name: "Ordinary Differential Equations",
    prerequisites: ["MATH210"],
  },
  MATH310: {
    code: "MATH310",
    corequisites: [],
    credits: 3,
    description:
      "The course is intended to provide the basic probabilistic and statistical concepts with related computational and analytic skills for three main purposes: to become an integrated part of the student's scientific education, to give the student an adequate ability for comprehending and interpreting many non-deterministic situations, and to appreciate the wide range of applications of such concepts to real-life situations.",
    name: "Probability & Statistics for Scientists & Engineers",
    prerequisites: ["MATH210", "ENGL201"],
  },
  PHYS220: {
    code: "PHYS220",
    corequisites: ["MATH210"],
    credits: 3,
    description:
      "This course is designed to provide an overview of calculus based introductory physics, which is a requirement for all undergraduate engineering students. It offers an introduction to mechanical oscillations and mechanical waves, exploring different wave phenomena such as interference of mechanical waves, reflection and refraction of light, in addition to image formation.",
    name: "Physics for Engineers",
    prerequisites: ["PHYS161", "ENGL101", "PHYS160"],
  },
};
