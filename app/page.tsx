import HomeHero from "./components/home-hero";
import { socialLinks } from "./lib/config";
import VisitorMap from "./components/VisitorMap";
import Script from "next/script";
import { formatDate, getBlogPosts } from "app/lib/posts";
import Carousel from "app/components/Carousel";

import PublicationItem from "./components/PublicationItem";

import ExperienceItem, { ExperienceProps } from "./components/ExperienceItem";

const EXPERIENCES_DATA: ExperienceProps[] = [
  {
    occupation: "Research Intern",
    affiliation: "Department of Electrical and Computer Engineering, University of Waterloo",
    period: "Jan 2026 – Apr 2026",
    location: "Remote",
    logo: "/logos/loo.png",
    description: [
      "Working on exploring the cost structure of MLLM educational deployment in block-based programming",
      "Proposing a cost-aware multimodal repair pipeline for block-based programming that uses a cheap runtime probe to estimate repair difficulty and schedule the optimal repair option"
    ],
    advisor: { name: "Jialu Zhang", occupation: "Assistant Professor, University of Waterloo", url: "https://jialuzhang.netlify.app/"}
  },
  {
    occupation: "Co-researcher",
    affiliation: "Department of Computer Science and Engineering, The Chinese University of Hong Kong",
    period: "Mar 2025 – Sep 2025",
    location: "Hong Kong",
    logo: "/logos/cuhk.png",
    description: [
      "Worked on analyzing code intelligence of Multi-modal LLMs in various front-end programming scenarios, contributing to the paper Designbench",
      "Proposed a multi-framework, multi-task evaluation benchmark for assessing MLLMs' capabilities in automated front-end engineering",
      "Data Collection and Processing, Metrics, Evaluation, Benchmarking"
    ],
    advisor: { name: "Michael R. Lyu", occupation: "Professor, The Chinese University of Hong Kong", url: "https://www.cse.cuhk.edu.hk/lyu/home"}
  },
  {
    occupation: "Research Assistant",
    affiliation: "Department of Building and Real Estate, The Hong Kong Polytechnic University",
    period: "March 2023 – Mar 2025",
    location: "Hong Kong",
    logo: "/logos/polyu.png",
    description: [
      "Worked on LLM-driven Online Social Network Analysis for Mega infrastructure Project Stakeholder Analysis. Published a Journal paper in IEEE-TEM as the 1st author; co-authored a conference paper, which proposed a LLM-based data-driven framework for digital transformation in civil engineering",
      "Data Retrieval, Large Language Model, Social Network Analysis, Paper Completion and revision"
    ],
    advisor: { name: "Jin Xue", occupation: "Lecturer, The University of Sydney", url: "https://profiles.sydney.edu.au/jin.xue"}
  },
];

export default function Page() {
  const BlogBlocks = [
    {
      image: "/uofa/office.JPG",
      title: "Joining the University of Alberta as a PhD student",
      link: "/blog/uofa"
    },
    {
      image: "/ieee-tem/featured.jpg",
      title: "My first 1st-authored paper accepted!",
      link: "/blog/ieee-tem"
    },
    {
      image: "/graduation/featured.jpg",
      title: "Just graduated from PolyU with a Bachelor's degree in Computer Science!",
      link: "/blog/graduation"
    },
    {
      image: "/pittsburgh/featured.jpg",
      title: "Conference travel at Pittsburgh, Penn",
      link: "/blog/pittsburgh"
    },
    {
      image: "/aws/featured.jpg",
      title: "Milestone achieved as an Amazon Web Services (AWS) student ambassador",
      link: "/blog/aws"
    }
  ];
  let allBlogs = getBlogPosts();

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-G429F01H2D"
         strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G429F01H2D');
        `}
      </Script>
      <Script 
        src="https://elfsightcdn.com/platform.js" 
        strategy="afterInteractive" 
      />
      <HomeHero />
      <section 
        className="mx-auto mt-10 max-w-6xl px-6 md:px-[50px] transition-[padding] duration-500 ease-in-out"
        style={{ 
          paddingBottom: 'calc(var(--dialog-height, 0px) * (1 - Math.sign(window.innerWidth - 768)))' 
        }}
      >
        <div 
          className="pb-[var(--dialog-height)] md:pb-0 transition-[padding] duration-500"
        >
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">news</h2>
          <div className="space-y-2">
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                Sep 1, 2026
              </span>
              <span className="text-sm text-purple-600 dark:text-purple-400 ml-4">
                I joined the University of Alberta as a PhD student! 🎉
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                June 10, 2025
              </span>
              <span className="text-sm ml-4">
                Thanks Rohan Paul for reposting our work - Designbench! 😊
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                Mar 15, 2025
              </span>
              <span className="text-sm text-purple-600 dark:text-purple-400 ml-4">
                My undergraduate work is accepted at IEEE-TEM! 🎉
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                Nov 15, 2024
              </span>
              <span className="text-sm ml-4">
                Excited to attend PolyU's 30th congregation as a graduate! 🎓
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                Aug 5, 2024
              </span>
              <span className="text-sm ml-4">One conference paper presented at i3CE2024, held by Carneige Mellon University! 💬</span>
            </div>
          </div>
        </div>
        {/*
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">latest posts</h2>
          <div className="space-y-2">
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                Mar 26, 2025
              </span>
              <a
                href="#"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline ml-4"
              >
                a post with plotly.js
              </a>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                Dec 04, 2024
              </span>
              <a
                href="#"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline ml-4"
              >
                a post with image galleries
              </a>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                May 14, 2024
              </span>
              <a
                href="#"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center ml-4"
              >
                Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra
                <svg
                  className="w-3 h-3 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        */}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">posts</h2>
            <Carousel blocks={BlogBlocks} />
          <a 
            href="/blog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors"
          >
            View all posts
            <svg 
              className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          
          
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">selected publications</h2>
          
          
          <PublicationItem 
            title="DesignBench: A Comprehensive Benchmark for MLLM-based Front-end Code Generation"
            authors={["J Xiao", "M Wang", "MH Lam", "Y Wan", "J Liu", "Y Huo", "MR Lyu"]}
            venue="ArXiv Preprint"
            date="June 2025"
            image="/paper/designbench.png"
            tag="ArXiv"
            links={{
              html: "https://webpai.github.io/DesignBench/",
              doi: "https://doi.org/10.48550/arXiv.2506.06251"
            }}
            abstract="Multimodal Large Language Models (MLLMs) have demonstrated remarkable capabilities in automated front-end engineering, e.g., generating UI code from visual designs. However, existing front-end UI code generation benchmarks have the following limitations: (1) While framework-based development becomes predominant in modern front-end programming, current benchmarks fail to incorporate mainstream development frameworks. (2) Existing evaluations focus solely on the UI code generation task, whereas practical UI development involves several iterations, including refining editing, and repairing issues. (3) Current benchmarks employ unidimensional evaluation, lacking investigation into influencing factors like task difficulty, input context variations, and in-depth code-level analysis. To bridge these gaps, we introduce DesignBench, a multi-framework, multi-task evaluation benchmark for assessing MLLMs' capabilities in automated front-end engineering. DesignBench encompasses three widely-used UI frameworks (React, Vue, and Angular) alongside vanilla HTML/CSS, and evaluates on three essential front-end tasks (generation, edit, and repair) in real-world development workflows. DesignBench contains 900 webpage samples spanning over 11 topics, 9 edit types, and 6 issue categories, enabling detailed analysis of MLLM performance across multiple dimensions. Our systematic evaluation reveals critical insights into MLLMs' framework-specific limitations, task-related bottlenecks, and performance variations under different conditions, providing guidance for future research in automated front-end development."
            bibtex={`@article{xiao2025designbench,
          title={DesignBench: A Comprehensive Benchmark for MLLM-based Front-end Code Generation},
          author={Xiao, J and Wang, M and Lam, MH and others},
          journal={arXiv preprint arXiv:2506.06251},
          year={2025}
        }`}
            stats={{
              doi: "10.48550/arXiv.2506.06251",
              githubOwner: "WebPAI",
              githubRepo: "DesignBench"
            }}
          />
        
        <PublicationItem 
            title="How Large Language Models Empower the Analysis of Online Public Engagement for Mega Infrastructure Projects: Cases in Hong Kong"
            authors={["M Wang", "R Ma", "GQ Shen", "J Xue"]}
            venue="IEEE Transactions on Engineering Management"
            date="March 2025"
            image="/paper/nprm.png"
            tag="IEEE-TEM"
            links={{
              html: "https://ieeexplore.ieee.org/document/10938235",
              doi: "https://doi.org/10.1109/TEM.2025.3553595"
            }}
            abstract="Mega infrastructure projects (MIPs) have profound societal impacts, and public engagement plays a crucial role in their success. The rise of social media enables the dynamic analysis of public opinions, aiding decision-makers in addressing public concerns. This study introduces a networking, parsing, retrieval, and mapping approach that innovatively leverages large language models (LLMs) for massive text parsing and social network analysis. Using data from Hong Kong's nine MIP topics, this study identifies influencers and examines public and influencer engagement across project lifecycles. The findings and constructed managerial maps reveal the hidden dynamics of involvement and interaction across different project event types, enabling a prioritized management method. The novel LLM-driven framework offers decision-makers actionable insights to comprehensively optimize online public communication and engagement strategies for MIPs."
            bibtex={`@ARTICLE{10938235,
          author={Wang, Ming and Ma, Ruiyang and Shen, Geoffrey Qiping and Xue, Jin},
          journal={IEEE Transactions on Engineering Management}, 
          title={How Large Language Models Empower the Analysis of Online Public Engagement for Mega Infrastructure Projects: Cases in Hong Kong}, 
          year={2025},
          volume={72},
          number={},
          pages={1262-1280},
          keywords={Social networking (online);Stakeholders;Training;Large language models;Electronic mail;Delays;Costs;Uncertainty;Decision making;Buildings;Large language models (LLMs);mega projects;public engagement;social network analysis (SNA)},
          doi={10.1109/TEM.2025.3553595}}
        }`}
            stats={{
              doi: "10.1109/TEM.2025.3553595",
              githubOwner: "",
              githubRepo: ""
            }}
          />

        <PublicationItem 
            title="Large Language Model-Based Data-Driven Framework for Digital Transformation in the Construction Industry"
            authors={["R Ma", "GQ Shen", "P Lou", "M Wang"]}
            venue="ASCE International Conference on Computinng in Civil Engineering, Pittsburgh, USA"
            date="August 2024"
            image="/paper/i3ce.png"
            tag="i3CE"
            links={{
              html: "https://ascelibrary.org/doi/10.1061/9780784486115.012",
              doi: "https://doi.org/10.1061/9780784486115.012"
            }}
            abstract="With the wide and fragmented use of digital technology in construction, a systematic digital transformation (DT) of the industry is needed. The industry’s synergy development context, marked by diverse data resources and significant investment, complicates collaboration and burdens the DT process. Notably, the transformation knowledge of DT is often “buried” within the vast data produced by daily management processes, making it challenging to discern the rules of DT without labor-intensive and time-consuming manual methods. Hence, a well-established data-driven framework for enhancing the DT process to promote whole-lifecycle industry transformation is essential. The large language model (LLM) supercharges the data-driven framework, enabling automated reasoning and precise insights to be derived from extensive data sets, thus fostering a smarter DT framework to manage the DT process. Therefore, this study uses a question-answering system based on an LLM and a localized knowledge base to guide decision-makers in developing engagement strategies that improve DT performance and foster collaboration. This study presents a practical application of LLMs in the DT of construction enterprises, anticipates future applications, and explores their potential use throughout a construction project’s transformation lifecycle."
            bibtex={`@inbook{doi:10.1061/9780784486115.012,
            author = {Ruiyang Ma  and Geoffrey Qiping Shen  and Peiliang Lou  and Ming Wang },
            title = {Large Language Model-Based Data-Driven Framework for Digital Transformation in the Construction Industry},
            booktitle = {Computing in Civil Engineering 2024},
            chapter = {},
            pages = {116-126},
            doi = {10.1061/9780784486115.012},
            URL = {https://ascelibrary.org/doi/abs/10.1061/9780784486115.012},
            eprint = {https://ascelibrary.org/doi/pdf/10.1061/9780784486115.012},
                abstract = { With the wide and fragmented use of digital technology in construction, a systematic digital transformation (DT) of the industry is needed. The industry’s synergy development context, marked by diverse data resources and significant investment, complicates collaboration and burdens the DT process. Notably, the transformation knowledge of DT is often “buried” within the vast data produced by daily management processes, making it challenging to discern the rules of DT without labor-intensive and time-consuming manual methods. Hence, a well-established data-driven framework for enhancing the DT process to promote whole-lifecycle industry transformation is essential. The large language model (LLM) supercharges the data-driven framework, enabling automated reasoning and precise insights to be derived from extensive data sets, thus fostering a smarter DT framework to manage the DT process. Therefore, this study uses a question-answering system based on an LLM and a localized knowledge base to guide decision-makers in developing engagement strategies that improve DT performance and foster collaboration. This study presents a practical application of LLMs in the DT of construction enterprises, anticipates future applications, and explores their potential use throughout a construction project’s transformation lifecycle. }
            }`}
            stats={{
              doi: "10.1061/9780784486115.012",
              githubOwner: "",
              githubRepo: ""
            }}
          />



        </div>

        <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">experiences</h2>
          <div className="flex flex-col">
            {EXPERIENCES_DATA.map((exp, index) => (
              <ExperienceItem
                key={`${exp.affiliation}-${index}`} 
                {...exp} 
              />
            ))}
          </div>
        </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">services</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                  Reviewer
                </span>
                <span className="text-sm ml-4">
                  IEEE Transactions on Engineering Management (IEEE-TEM)
                </span>
                <br /><br />
              </div>
            </div>
          </div>
        
        
          <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">office address</h2>
          <div className="space-y-2">
              <div className="flex">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                  04-069
                </span>
                <span className="text-sm ml-4">
                  University Commons, University of Alberta, Edmonton, AB T6G 2N8
                </span>
                <br /><br />
              </div>
            </div>
          <div className="w-full max-h-[550px] aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 dark:border-zinc-800">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.287259628557!2d-113.52538797062421!3d53.52583709008255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a023f2b3b58c57%3A0x4e5f35c7ead93215!2sUniversity%20Commons!5e0!3m2!1sen!2sca!4v1788760625302!5m2!1sen!2sca" 
              className="w-full h-full dark:invert-[90%] dark:hue-rotate-180 dark:contrast-[85%]"
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>


        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">time availability</h2>
          <div className="w-full max-h-[550px] aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 dark:border-zinc-800">
          <iframe 
            src="https://calendar.google.com/calendar/embed?src=melvin4%40ualberta.ca&ctz=America%2FEdmonton" 
            className="w-full h-full border-0 dark:invert dark:hue-rotate-180"
            scrolling="no"
          />
        </div>
        </div>
        

        </div>
      </section>
    </>
  );
}
