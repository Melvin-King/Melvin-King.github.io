import HomeHero from "./components/home-hero";
import { socialLinks } from "./lib/config";
import VisitorMap from "./components/VisitorMap";
import Script from "next/script";
import { formatDate, getBlogPosts } from "app/lib/posts";
import Carousel from "app/components/Carousel";

import PublicationItem from "./components/PublicationItem";

export default function Page() {
  const BlogBlocks = [
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
      <HomeHero />
      <section className="mx-auto mt-10 max-w-6xl px-6 md:px-[50px]">
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">news</h2>
          <div className="space-y-2">
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
              <span className="text-sm ml-4">
                My undergraduate research is accepted at IEEE-TEM! 🎉
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                Nov 15, 2024
              </span>
              <span className="text-sm text-purple-600 dark:text-purple-400 ml-4">
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
            <h2 className="text-xl font-bold mb-4">services</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-24 flex-shrink-0">
                  Reviewer
                </span>
                <span className="text-sm ml-4">
                  IEEE Transactions on Engineering Management (IEEE-TEM)
                </span>
              </div>
            </div>
          </div>
        
        {/*
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">office address</h2>
          <div 
            className="elfsight-app-fd5d9fb8-51bf-48aa-9435-84dac08007ef" 
            data-elfsight-app-lazy 
          ></div>
        </div>
        */}
      </section>
    </>
  );
}
