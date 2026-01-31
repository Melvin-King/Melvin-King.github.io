export interface Project {
  title: string;
  year: number;
  month: string; 
  description: string;
  url: string;
  image: string; 
  linkText: string;
}

export const projects: Project[] = [
  {
    title: "Data vs Pipeline Parallelism in LLM Training",
    year: 2025,
    month: "Oct",
    description: "Implements distributed training methods, including data parallelism and pipeline parallelism across multiple GPUs.",
    url: "https://github.com/Melvin-King/distributed_training",
    image: "/projects/llm-parallel.png", // 确保图片放在 public 文件夹下
    linkText: "Github",
  },
  {
    title: "DesignBench: A Multi-framework Multi-task Benchmark for Front-end Code Generation",
    year: 2025,
    month: "June",
    description: "Code and dataset for the paper.",
    url: "https://webpai.github.io/DesignBench/",
    image: "/projects/designbench.png", // 确保图片放在 public 文件夹下
    linkText: "Paper page",
  },
  {
    title: "Email Application with PGP Encryption",
    year: 2023,
    month: "Dec",
    description: "The Java-based course project is designed to facilitate secure email transmission using PGP encryption.",
    url: "https://github.com/bardzjhe/COMP4334-PGP-Project",
    image: "/projects/pgp.png", // 确保图片放在 public 文件夹下
    linkText: "Github",
  },
  {
    title: "Search Engine Project with Hybrid Information Retrieval Models",
    year: 2023,
    month: "Dec",
    description: "The search engine project leverages VSM, LSI, and an innovative Boolean + VSM hybrid approach to improve retrieval efficiency, precision, and recall.",
    url: "https://github.com/jasonlyuchina/COMP4133_GrpB",
    image: "/projects/retrieval.png", // 确保图片放在 public 文件夹下
    linkText: "Github",
  },
  {
    title: "Robotic-guided Self-help Telerehabilitation in Metaverse for Stroke Patients",
    year: 2023,
    month: "Apr",
    description: "Cyber-Physical-Social Systems for Telerehabilitation via Metaverse.",
    url: "https://github.com/hongzicong/MetaRehabilitation",
    image: "/projects/reabilitation.png", // 确保图片放在 public 文件夹下
    linkText: "Github",
  },
  {
    title: "Software Engineering Course Project - Jungle Game Software Engineering Course Project - Jungle Game",
    year: 2022,
    month: "Nov",
    description: "A python-based game project with MVC architectural pattern. Install and try!",
    url: "https://github.com/YaluPAN/SE-Project",
    image: "/projects/jungle.png", // 确保图片放在 public 文件夹下
    linkText: "Github",
  },
  // 你可以继续添加更多项目...
];