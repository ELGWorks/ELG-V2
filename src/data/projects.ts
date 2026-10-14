import type { Project } from "../types/project";

import amazonImage from "../assets/images/projects/AmazonUIClone.webp";
import calculatorImage from "../assets/images/projects/Calculator.webp";
import chatbotImage from "../assets/images/projects/Chatbot.webp";
import ecommerceImage from "../assets/images/projects/EcommerceProject.webp";
import img2pixelImage from "../assets/images/projects/Img2Pixel.webp";
import MyPromptsImage from "../assets/images/projects/MyPrompts.webp";
import rockPaperScissorsImage from "../assets/images/projects/RockPaperScissor.webp";
import hotelImage from "../assets/images/projects/TheGrandVeloraHotel.webp";
import todoImage from "../assets/images/projects/ToDoList.webp";
import truthStoneImage from "../assets/images/projects/TruthStoneSeekers.webp";
import youtubeImage from "../assets/images/projects/YouTubeUIClone.webp";

export const projects: Project[] = [
  {
    id: "ecommerce-project",
    title: "Ecommerce Project",
    description:
      "A mocked-up shopping website with a React.js for frontend and an AI-assisted Node.js and Express for backend.",
    role: "Frontend Developer (TypeScript)",
    aiRole: "Backend Developer",
    highlights: [
      "Developed the frontend using React.js and TypeScript.",
      "Used an AI-assisted workflow for backend development.",
    ],
    image: ecommerceImage,
    techStack: ["HTML5", "CSS3", "TypeScript", "React.js"],
    sourceUrl: "https://github.com/ELGWorks/Ecommerce-Project",
    siteUrl: "https://ecommerce-project-wheat-nine.vercel.app/",
  },
  {
    id: "myprompts",
    title: "MyPrompts",
    description:
      "A browser extension that saves prompts for easier access while using AI websites.",
    role: "Frontend Developer",
    aiRole: "Code Reviewer",
    highlights: [
      "Built a browser extension for saving and accessing prompts.",
      "Used AI to review code and help identify potential improvements.",
    ],
    image: MyPromptsImage,
    techStack: ["HTML5", "CSS3", "React.js"],
    sourceUrl: "https://github.com/ELGWorks/MyPrompts",
    siteUrl: "https://addons.mozilla.org/en-US/firefox/addon/myprompts-ai/",
  },
  {
    id: "chatbot",
    title: "Chatbot",
    description: "A basic chatbot application built using React.js.",
    role: "Frontend Developer",
    aiRole: "Code Reviewer",
    highlights: [
      "Built the chatbot interface using React.js.",
      "Used AI to review code.",
    ],
    image: chatbotImage,
    techStack: ["HTML5", "CSS3", "JavaScript", "React.js"],
    sourceUrl: "https://github.com/ELGWorks/Chatbot",
    siteUrl: "https://chatbot-2ej.pages.dev/",
  },
  {
    id: "youtube-ui-clone",
    title: "YouTube UI Clone",
    description:
      "A YouTube-inspired interface built to practice fundamental web design and responsive layout techniques.",
    role: "Fullstack Developer",
    aiRole: "None — developed without AI",
    highlights: [
      "Practiced foundational HTML5 and CSS3 concepts.",
      "Focused on interface design and responsive layouts.",
    ],
    image: youtubeImage,
    techStack: ["HTML5", "CSS3", "JavaScript"],
    sourceUrl: "https://github.com/ELGWorks/YouTube-UI-Clone",
    siteUrl: "https://elgworks.github.io/YouTube-UI-Clone/",
  },
  {
    id: "amazon-ui-clone",
    title: "Amazon UI Clone",
    description:
      "A mocked-up Amazon interface built to improve understanding of JavaScript fundamentals and dynamic web pages.",
    role: "Logic Developer (JavaScript)",
    aiRole: "Code Reviewer",
    highlights: [
      "Practiced JavaScript logic and dynamic page behavior.",
      "Used AI as a code reviewer.",
    ],
    image: amazonImage,
    techStack: ["HTML5", "CSS3", "JavaScript"],
    sourceUrl: "https://github.com/ELGWorks/Amazon-UI-Clone",
    siteUrl: "https://amazon-ui-clone-green.vercel.app/",
  },
  {
    id: "img2pixel",
    title: "Img2Pixel",
    description:
      "A simple web application that converts images into pixelated artwork.",
    role: "Fullstack Developer",
    aiRole: "None — developed without AI",
    highlights: [
      "Built an image-to-pixel conversion application.",
      "Handled both the interface and application logic.",
    ],
    image: img2pixelImage,
    techStack: ["HTML5", "CSS3", "JavaScript"],
    sourceUrl: "https://github.com/ELGWorks/Img2Pixel",
    siteUrl: "https://img2pixel.vercel.app/",
  },
  {
    id: "grand-velora-hotel",
    title: "The Grand Velora Hotel",
    description: "A hotel booking frontend interface built using React.js.",
    role: "AI-Driven Web Developer / Prompt Engineer",
    aiRole: "Code Generation",
    highlights: [
      "Designed a hotel booking interface.",
      "Used AI-generated code to develop the frontend.",
    ],
    image: hotelImage,
    techStack: ["HTML5", "CSS3", "JavaScript", "React.js"],
    sourceUrl: "https://github.com/ELGWorks/The-Grand-Velora-Hotel",
    siteUrl: "https://the-grand-velora-hotel.pages.dev/",
  },
  {
    id: "mymovielist",
    title: "MyMovieList",
    description:
      "A movie browsing application built with React.js, JavaScript, and Vite. It uses the TMDB API to search for and display movie information.",
    role: "Frontend Developer",
    aiRole: "None — developed without AI",
    highlights: [
      "Built a movie browsing interface using React.js and Vite.",
      "Integrated the TMDB API to retrieve movie information.",
    ],
    image: "",
    techStack: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite", "TMDB API"],
    sourceUrl: "https://github.com/ELGWorks/MyMovieList",
    siteUrl: "https://mymovielist-3yn.pages.dev/",
  },
  {
    id: "rock-paper-scissors",
    title: "Rock-Paper-Scissors",
    description: "A browser-based Rock-Paper-Scissors game.",
    role: "Fullstack Developer",
    aiRole: "None — developed without AI",
    highlights: [
      "Implemented the game logic using JavaScript.",
      "Built the interface using HTML5 and CSS3.",
    ],
    image: rockPaperScissorsImage,
    techStack: ["HTML5", "CSS3", "JavaScript"],
    sourceUrl: "https://github.com/ELGWorks/Rock-Paper-Scissors",
    siteUrl: "https://elgworks.github.io/Rock-Paper-Scissors/",
  },
  {
    id: "to-do-list",
    title: "To-Do List",
    description: "A basic productivity application for managing tasks.",
    role: "Fullstack Developer",
    aiRole: "None — developed without AI",
    highlights: [
      "Built a task management application.",
      "Implemented the interface and application logic without AI assistance.",
    ],
    image: todoImage,
    techStack: ["HTML5", "CSS3", "JavaScript"],
    sourceUrl: "https://github.com/ELGWorks/To-Do-List",
    siteUrl: "https://elgworks.github.io/To-Do-List/",
  },
  {
    id: "truth-stone-seekers",
    title: "Truth/Stone Seekers",
    description:
      "An under-development RPG about a college boy's adventure in another world.",
    role: "Indie Game Developer",
    aiRole: "RPG Maker MV Tools Guide",
    highlights: [
      "Developing an original RPG project.",
      "Using RPG Maker MV and JavaScript.",
      "Currently under development.",
    ],
    image: truthStoneImage,
    techStack: ["RPG Maker MV", "JavaScript"],
    sourceUrl: "https://github.com/ELGWorks/Truth-Stone-Seekers",
    siteUrl: "https://classy-torrone-2459c9.netlify.app/",
  },
  {
    id: "calculator",
    title: "Calculator",
    description:
      "A classic calculator built to practice fundamental web development concepts.",
    role: "Fullstack Developer",
    aiRole: "None — developed without AI",
    highlights: [
      "Implemented calculator functionality using JavaScript.",
      "Built the interface using HTML5 and CSS3.",
    ],
    image: calculatorImage,
    techStack: ["HTML5", "CSS3", "JavaScript"],
    sourceUrl: "https://github.com/ELGWorks/Calculator",
    siteUrl: "https://elgworks.github.io/Calculator/",
  },
];