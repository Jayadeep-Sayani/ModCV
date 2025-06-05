
import type { ResumeSection, ResumeItem } from '../data/types';

export const latexPreamble = String.raw`
\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}
\usepackage{charter}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}
\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}
\titleformat{\section}{\vspace{-4pt}\scshape\raggedright\large}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]
\pdfgentounicode=1

% Custom commands
\newcommand{\resumeItem}[1]{\item\small{#1 \vspace{-2pt}}}
\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
  \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
    \textbf{#1} & #2 \\
    \textit{\small#3} & \textit{\small #4} \\
  \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
  \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
    \small#1 & #2 \\
  \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
`;


export const latexHeader = String.raw`
\begin{document}

\begin{center}
  \textbf{\Huge \scshape Jayadeep Sayani} \\ \vspace{1pt}
  \small 250-880-9270 $|$ 
  \href{mailto:jayadeeps1101@gmail.com}{\underline{jayadeeps1101@gmail.com}} $|$ 
  \href{https://www.linkedin.com/in/jayadeep-sayani/}{\underline{LinkedIn}} $|$ 
  \href{https://github.com/Jayadeep-Sayani}{\underline{GitHub}} $|$ 
  \href{https://jayadeep-sayani.github.io/Portfolio}{\underline{Portfolio}}
\end{center}
`;

const escape = (text = '') => text.replace(/&/g, '\\&');

const renderBullets = (bullets?: string[]) => {
  if (!bullets || bullets.length === 0) return '';
  return [
    '\\resumeItemListStart',
    ...bullets.map((b) => `\\resumeItem{${escape(b)}}`),
    '\\resumeItemListEnd',
  ].join('\n');
};

const renderSubheading = (item: ResumeItem) => {
  const { title, subtitle = '', dateRange = '', bullets } = item;
  return [
    `\\resumeSubheading{${escape(title)}}{${dateRange}}{${escape(subtitle)}}{}`,
    renderBullets(bullets),
  ].join('\n');
};

const renderProject = (item: ResumeItem) => {
  const { title, dateRange = '', bullets } = item;
  return [
    `\\resumeProjectHeading{${escape(title)}}{${dateRange}}`,
    renderBullets(bullets),
  ].join('\n');
};

export const generateLatexFromSections = (sections: ResumeSection[]) => {
  const body = sections
    .filter((section) => section.enabled)
    .map((section) => {
      const title = `\\section{${section.type.charAt(0).toUpperCase() + section.type.slice(1)}}`;
      const enabledItems = section.items.filter((item) => item.enabled !== false);

      const content = [
        title,
        '\\resumeSubHeadingListStart',
        ...enabledItems.map((item) =>
          section.type === 'projects'
            ? renderProject(item)
            : renderSubheading(item)
        ),
        '\\resumeSubHeadingListEnd',
      ].join('\n');

      return content;
    })
    .join('\n\n');

  return `${latexPreamble}\n\n${latexHeader}\n\n${body}\n\n\\end{document}`;
};
