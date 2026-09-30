import { SiloEventData } from "./SiloEventModal";

export const thisWeekEvents: SiloEventData[] = [
  {
    id: "pytorch-bootcamp",
    title: "PyTorch Deep Dive: Vision Transformers & Diffusion",
    speaker: "Dr. Arvind Rao",
    role: "Faculty Research Mentor & Computational Vision Lead",
    category: "WEEKEND BOOTCAMP",
    date: "Saturday, Sep 12, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "AB-1 Auditorium, VIT Bhopal",
    image: "/event-workshop.jpg",
    description:
      "Three intensive days covering PyTorch tensors, autograd computation graphs, CUDA acceleration, and compiling vision transformers from scratch on consumer hardware.",
    longBio:
      "Dr. Arvind Rao guides participants through hands-on neural network training, gradient checkpointing, mixed-precision FP16 loops, and compiling vision transformers. Attendees will train a miniature diffusion model and deploy it via FastAPI with interactive telemetry.",
    badge: "FEW SPOTS LEFT",
    ticketPrice: "Open to All Students",
  },
  {
    id: "datahacks-26",
    title: "DataHacks '26: Flagship 36-Hour Campus Datathon",
    speaker: "DSC Core Engineering Team",
    role: "Organizing Committee & Technical Mentors",
    category: "HACKATHON",
    date: "Saturday, Oct 18, 2026",
    time: "9:00 AM (36-Hr Sprint)",
    venue: "Innovation Center & Amphitheatre",
    image: "/event-hackathon.jpg",
    description:
      "Our flagship 36-hour hackathon focusing on open civic data APIs, autonomous agent swarms, and campus predictive analytics platforms. 300+ builders expected.",
    longBio:
      "DataHacks '26 features 4 distinct tracks: Agentic AI Systems, Civic Analytics, Edge Intelligence, and Healthcare AI. Competing teams receive direct mentor check-ins, cloud GPU compute vouchers, full meals and midnight snacks, verified certificates, and a cash pool of ₹1,50,000.",
    badge: "REGISTRATIONS ACTIVE",
    ticketPrice: "Teams of 2-4 Builders",
  },
  {
    id: "llms-in-production",
    title: "LLMs in Production: High-Throughput Inference & Guardrails",
    speaker: "Aditi Sen",
    role: "Senior ML Platform Engineer @ ScaleAI (DSC Alumni)",
    category: "INDUSTRY KEYNOTE",
    date: "Friday, Sep 26, 2026",
    time: "5:30 PM - 7:30 PM",
    venue: "Seminar Hall 2, VIT Bhopal",
    image: "/event-talk.jpg",
    description:
      "An insider breakdown of production LLM pipelines, latency budgets, agentic tool-use loops, RAG benchmark evaluations, and cost guardrails.",
    longBio:
      "Drawing from production experience operating LLM inference engines handling millions of tokens daily, Aditi breaks down vLLM paged attention, spec-decoding, vector database index tuning (HNSW vs IVF), dynamic few-shot prompt caching, and hallucination guardrails.",
    badge: "LIMITED SEATS",
    ticketPrice: "Free Admission",
  },
];

export const upcomingEventList: SiloEventData[] = [
  {
    id: "agentic-ai",
    title: "Autonomous Agentic AI & MCP Tool Orchestration",
    speaker: "Siddharth Verma",
    role: "AI Systems Researcher",
    category: "RESEARCH SPRINT",
    date: "Friday, Oct 21, 2026",
    time: "4:00 PM",
    venue: "Lab Complex 4",
    image: "/event-workshop.jpg",
    description:
      "Building multi-agent cognitive architectures with LangGraph, Model Context Protocol (MCP), and real-time self-healing code reflection loops.",
    longBio:
      "Explore how autonomous reasoning loops, reflection patterns, and memory state graphs let AI agents write, test, and debug real systems without human intervention.",
    badge: undefined,
  },
  {
    id: "vector-databases",
    title: "Vector Databases & HNSW Dense Indexing",
    speaker: "Rohan Kulkarni",
    role: "Database Systems Lead",
    category: "WORKSHOP",
    date: "Friday, Oct 28, 2026",
    time: "5:00 PM",
    venue: "Seminar Hall 1",
    image: "/event-talk.jpg",
    description:
      "Scaling dense vector search to 100M items: inverted files, product quantization, HNSW graph structures, and hybrid sparse-dense lexical retrieval.",
    longBio:
      "Understand the mechanics of similarity metric kernels (Cosine, L2, Dot), index building concurrency, memory footprint trade-offs, and hybrid sparse-dense lexical retrieval with Milvus and Qdrant.",
    badge: undefined,
  },
  {
    id: "kafka-streaming",
    title: "Streaming Analytics with Apache Kafka & Flink",
    speaker: "Priya Nair",
    role: "Distributed Pipelines Architect",
    category: "SYSTEMS LAB",
    date: "Saturday, Nov 08, 2026",
    time: "11:00 AM",
    venue: "AB-2 Computer Lab 3",
    image: "/event-hackathon.jpg",
    description:
      "Building real-time message brokers with Apache Kafka, stateful stream joins with Apache Flink, and sub-second anomaly detection dashboards.",
    longBio:
      "Step-by-step setup of Kafka topics, partition rebalancing, exactly-once delivery semantics, stateful stream joins, and real-time anomaly detection pipelines for high-throughput telemetries.",
    badge: "FEW SPOTS LEFT",
  },
  {
    id: "tinyml-edge",
    title: "Embedded TinyML on Microcontrollers",
    speaker: "Aniket Sharma",
    role: "IoT & Embedded AI Lead",
    category: "HARDWARE SPRINT",
    date: "Saturday, Nov 15, 2026",
    time: "2:00 PM",
    venue: "Robotics & Innovation Lab",
    image: "/event-workshop.jpg",
    description:
      "Running quantized int8 TensorFlow Lite models directly on ESP32 microcontrollers and ARM Cortex chips under 256KB RAM constraints.",
    longBio:
      "Learn weights post-quantization techniques, hardware timer interrupts, sensor spectrogram extraction, and keyword spotting neural networks operating at 15mW power budgets.",
    badge: undefined,
  },
  {
    id: "kaggle-ensembling",
    title: "Kaggle Grandmaster Sprint: Feature Ensembling",
    speaker: "DSC Competitive Coding Cell",
    role: "Top 1% Kaggle Specialists",
    category: "COMPETITION",
    date: "Saturday, Nov 22, 2026",
    time: "1:00 PM",
    venue: "Lab Complex 1",
    image: "/event-team.jpg",
    description:
      "Feature engineering mastery, cross-validation leak prevention, and stacking XGBoost, LightGBM, and neural predictors for leaderboard finishes.",
    longBio:
      "Secrets from top-tier competitive ML: Target encoding, adversarial validation, out-of-fold calibration, blending weights optimization, and structuring reproducible competition notebooks.",
    badge: "REGISTRATIONS ACTIVE",
  },
  {
    id: "ai-safety-alignment",
    title: "AI Safety, Red Teaming & Model Alignment",
    speaker: "Dr. Meera Nambiar",
    role: "AI Ethics & Alignment Researcher",
    category: "SPECIAL TALK",
    date: "Saturday, Nov 29, 2026",
    time: "4:30 PM",
    venue: "Central Auditorium",
    image: "/event-talk.jpg",
    description:
      "Frontier model vulnerabilities, prompt injection defenses, automated red-teaming harnesses, and mechanistic interpretability of residual stream activations.",
    longBio:
      "A deep dive into frontier model vulnerabilities, automated red-teaming harnesses, sparse autoencoder feature extraction, and steering vectors for factual alignment and harmlessness.",
    badge: undefined,
  },
  {
    id: "graph-neural-nets",
    title: "Graph Neural Networks & Molecular Modeling",
    speaker: "Vikramaditya Dave",
    role: "Computational Biology Lead",
    category: "RESEARCH SPRINT",
    date: "Saturday, Dec 06, 2026",
    time: "10:30 AM",
    venue: "Seminar Hall 2",
    image: "/event-hackathon.jpg",
    description:
      "Message passing neural networks (MPNN), node embeddings with PyTorch Geometric, and predictive modeling for molecular property graphs.",
    longBio:
      "Hands-on tutorial building GCN, GAT, and GraphSAGE layers with PyTorch Geometric to predict molecule bioactivity and campus graph community clusters.",
    badge: undefined,
  },
  {
    id: "robotics-cv",
    title: "Autonomous Robotics & Real-time Computer Vision",
    speaker: "DSC Robotics Lab",
    role: "Autonomous Systems Group",
    category: "HACK LAB",
    date: "Saturday, Dec 13, 2026",
    time: "3:00 PM",
    venue: "Innovation Center Ground Floor",
    image: "/event-workshop.jpg",
    description:
      "YOLOv11 real-time object tracking, ROS2 sensor fusion, optical flow estimations, and autonomous path planning on mobile rovers.",
    longBio:
      "Hands-on session integrating stereo camera streams, TensorRT inference optimization, robot operating system (ROS2) nodes, and LiDAR SLAM mapping in indoor environments.",
    badge: undefined,
  },
];
