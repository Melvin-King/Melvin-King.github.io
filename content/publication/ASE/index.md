---
title: 'DesignBench: A Comprehensive Benchmark for MLLM-based Front-end Code Generation'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - J. Xiao
  - admin
  - M. H. Lam
  - Y. Wan
  - J. Liu
  - Y. Huo
  - M. R. Lyu

# Author notes (optional)
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'

date: '2025-05-30T00:00:00Z'
doi: 'https://doi.org/10.48550/arXiv.2506.06251'

# Schedule page publish date (NOT publication's date).
publishDate: '2025-05-31T00:00:00Z'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *arXiv Preprint*
publication_short: In *arXiv*

abstract: Multimodal Large Language Models (MLLMs) have demonstrated remarkable capabilities in automated front-end engineering, e.g., generating UI code from visual designs. However, existing front-end UI code generation benchmarks have the following limitations. (1) While framework-based development becomes predominant in modern front-end programming, current benchmarks fail to incorporate mainstream development frameworks. (2) Existing evaluations focus solely on the UI code generation task, whereas practical UI development involves several iterations, including refining editing, and repairing issues. (3) Current benchmarks employ unidimensional evaluation, lacking investigation into influencing factors like task difficulty, input context variations, and in-depth code-level analysis. To bridge these gaps, we introduce DesignBench, a multi-framework, multi-task evaluation benchmark for assessing MLLMs' capabilities in automated front-end engineering. DesignBench encompasses three widely-used UI frameworks (React, Vue, and Angular) alongside vanilla HTML/CSS, and evaluates on three essential front-end tasks (generation, edit, and repair) in real-world development workflows. DesignBench contains 900 webpage samples spanning over 11 topics, 9 edit types, and 6 issue categories, enabling detailed analysis of MLLM performance across multiple dimensions. Our systematic evaluation reveals critical insights into MLLMs' framework-specific limitations, task-related bottlenecks, and performance variations under different conditions, providing guidance for future research in automated front-end development.

# Summary. An optional shortened abstract.
summary: We introduce DesignBench, the first comprehensive multi-framework multi-task benchmark for front-end code generation, encompassing React, Vue, and Angular frameworks. Beyond traditional design generation, we pioneer design edit and repair tasks. Through extensive experiments across task complexity, framework compatibility, difficulty levels, contextual factors and in-depth code-level analysis, we reveal primary limitations in current MLLMs for framework-based development and elicit several actionable advice for researchers and developers.

tags:
  - LLM
  - Software Engineering
  - Benchmark

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: 'https://www.arxiv.org/pdf/2506.06251'
url_code: 'https://github.com/WebPAI/DesignBench'
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
  focal_point: ''
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

{{% callout note %}}
The paper is undergoing review in FSE2026.
{{% /callout %}}