import type { CurriculumYear } from "@/lib/curriculum/types";

const YEAR_1_FALL: CurriculumYear["semesters"][number] = {
  courses: [
    {
      code: "CENG507",
      corequisites: [],
      credits: 3,
      description:
        "This course introduces the student to the development of embedded systems from the ground up. The student is introduced to advanced microcontrollers (e.g., ARM Cortex-M) platform and related application development tool chain that can be used for creating embedded systems. Design and implementation of real-time embedded systems. This is a practical, project oriented course that allows the student to gain the required skills for creating embedded systems and applications.",
      kind: "course",
      name: "Embedded Systems",
      objectives: [
        "Introduce the architecture of ARM processors.",
        "Develop low-power embedded systems with hardware, software, and sensors.",
        "Build a programmable embedded platform from scratch and interface a variety of sensors.",
        "Use a real-time operating system (FreeRTOS) for multitasking.",
      ],
      prerequisites: [],
    },
    {
      code: "EENG527",
      corequisites: [],
      credits: 3,
      description:
        "The objective of this course is to build a good understanding of the principles of Digital Signal Processing starting from the theoretical analysis of Discrete Time Systems up to the design and implementation of Digital Filters. Topics include: Analog to Digital Conversion, sampling, quantization, coding, Z-transform and its applications, structures for FIR and IIR systems, design and implementation of Filters using: window, frequency sampling and equiripple filter. In order to provide students with strong foundation of engineering practices and perform a practical application of the acquired knowledges, some design and simulation examples using Matlab are covered.",
      kind: "course",
      name: "Digital Signal Processing",
      objectives: [
        "Introduce the fundamentals of digital signals and systems.",
        "Characterize signals and systems.",
        "Introduce the design of FIR and IIR filters and analyze the performance of these filters.",
      ],
      prerequisites: [],
    },
    {
      code: "EENG537",
      corequisites: [],
      credits: 3,
      description:
        "The course is an introduction to modern digital communications at a graduate/senior undergraduate level. The coverage emphasizes a conceptual understanding of principles, techniques, and fundamental limits in digital communication systems. This course covers modulation for digital communications over additive white Gaussian noise (AWGN) channels: bandpass and lowpass signal representation; signal space representation of waveforms; modulation; demodulation; optimum receivers for AWGN channels; probability of error analysis; channel coding; synchronization; an introduction to digital communication through band-limited channels.",
      kind: "course",
      name: "Digital Communications",
      objectives: [
        "Introduce the fundamental building blocks of modern digital communications systems.",
        "Analyze the performance of different digital modulation schemes.",
        "Introduce the Additive White Gaussian Noise (AWGN) channel model.",
        "Analyze optimum receivers for the AWGN channel.",
      ],
      prerequisites: [],
    },
    {
      code: "ENGG515",
      corequisites: [],
      credits: 3,
      description:
        "This course covers core mathematical theories required by upper undergraduate and graduate engineering students. The course covers topics in operations research, graph theory, statistics and statistical inference that have a direct application to engineering applications.",
      kind: "course",
      name: "Advanced Engineering Mathematics",
      objectives: [
        "Understand graph theory, formulate engineering problems using graph theory, and apply known algorithms and tools to solve these problems.",
        "Acquire knowledge about Markov Chains and the ability to formulate engineering problems as Markov chains.",
        "Introduce queuing theory and its different models.",
        "Formulate nonlinear optimization problems and solve these problems using constrained and unconstrained algorithms.",
      ],
      prerequisites: [],
    },
  ],
  id: "y1-fall",
  label: "Fall Semester",
  term: "fall",
};

const YEAR_1_SPRING: CurriculumYear["semesters"][number] = {
  courses: [
    {
      code: "CENG557",
      corequisites: [],
      credits: 3,
      description:
        "After introducing the basic network architecture terms represented by the TCP/IP stack in CENG415 (Communication networks) course, student needs a deeper look to the backbone terminologies of communication networks. The main objective of Advanced Network Architectures course is to describe the different network technologies that are used by the service providers (mainly of the Internet) in order to build an international communication network. The student will be first introduced to the major access technologies that run nowadays to help the end user accessing international networks. Then, an inside look to the core network architecture technologies such as SONET/SDH, ATM and MPLS will be given. The course will also provide the student with an outstanding knowledge about the Quality of Service and Quality of Experience as a major need in the communication networks.",
      kind: "course",
      name: "Advanced Network Architectures",
      objectives: [
        "Study backbone terminologies in detail.",
        "Introduce the different network technologies used by service providers.",
        "Study quality of service and quality of experience in communication networks.",
      ],
      prerequisites: ["ENGG515"],
    },
    {
      code: "EENG587",
      corequisites: [],
      credits: 3,
      description:
        "This course introduces the applications and challenges of current and envisioned wireless systems, as well as the fundamental principles underlying wireless communications. Topics include: overview of current wireless standards, wireless channels characteristics and models, path loss, shadowing, noise, interference, link budget, flat and frequency selective properties of multipath fading, capacity limits, diversity and combining techniques, multiple antenna techniques MIMO and space-time coding, multicarrier modulation and orthogonal frequency division multiplexing OFDM, spread-spectrum and frequency hopping techniques, multi-user systems.",
      kind: "course",
      name: "Wireless Communication",
      objectives: [
        "Introduce the fundamental principles underlying wireless communications.",
        "Discuss and compare wireless standards.",
        "Introduce and analyze frequency division multiplexing schemes.",
        "Introduce and analyze frequency hopping schemes and multi-user systems.",
      ],
      prerequisites: ["EENG537"],
    },
    {
      code: "CENG675",
      corequisites: ["CENG557"],
      credits: 3,
      description:
        "This course introduces students to multimedia systems concepts: fundamentals, theory, current practices, and future trends. A brief revision of signals, LTI systems, Fourier Transforms, and sampling precedes an introduction to image, video, audio, and graphics representation. Coding standards and compression techniques for the three media types are studied next with a focus on current practices. Topics related to content distribution and quality of service over wired and wireless networks are discussed. The course also addresses watermarking and encryption techniques for intellectual property protection.",
      kind: "course",
      name: "Multimedia Networks",
      objectives: [],
      prerequisites: ["EENG527"],
    },
    {
      code: "CENG566",
      corequisites: ["CENG566L"],
      credits: 3,
      description:
        "This course introduces machine learning topics and algorithms. Machine learning uses techniques such as optimization, statistics, and programming among others to create a system that is able to process data provide predictions without human interference. Topics included: Datasets, Supervised and unsupervised learning, reinforced learning, decision trees, Clustering, pattern recognition. This course prepares students for research and industrial applications that utilize machine learning. This course is part of Data Science Track offered by the Department of Computer and Communication Engineering.",
      kind: "course",
      name: "Machine Learning",
      objectives: [
        "Teach the fundamental algorithms of machine learning.",
        "Introduce the concept of a single perceptron.",
        "Introduce single-layer multi-perceptron networks.",
        "Introduce multiple-layer perceptron networks.",
      ],
      prerequisites: ["EENG527", "ENGG515"],
    },
    {
      code: "CENG566L",
      corequisites: ["CENG566"],
      credits: 1,
      description:
        "This lab course consists of a set of experiments that implement machine learning algorithms. Software programs will be created to simulate real life applications. The aim of this course is to enable students to analyze, and employ datasets, and implement supervised and unsupervised machine-learning algorithms.",
      kind: "lab",
      name: "Machine Learning Laboratory",
      objectives: [],
      prerequisites: ["ENGG515", "EENG527"],
    },
  ],
  id: "y1-spring",
  label: "Spring Semester",
  term: "spring",
};

const CURRICULUM_YEAR_1: CurriculumYear = {
  id: "y1",
  label: "First Year",
  semesters: [YEAR_1_FALL, YEAR_1_SPRING],
  year: 1,
};

export const CURRICULUM: CurriculumYear[] = [CURRICULUM_YEAR_1];
