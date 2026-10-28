//this file will contains the jobs that are available, add remove from here

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "OptimusFox",
        location: "Lahore",
        type: "Full time",
        category: "Development",
        salary: 2000,
        posted: "2026-09-01",
        remote: true,
        description: "OptimusFox is looking for a Frontend Developer to build clean, responsive interfaces for our clinet dashboards",
        requirements: [
            "Solid understanding of HTML, CSS, Javascript",
            "Familiarity with responsive design",
            "Basic understading of Git"
        ],
        responsibilities: [
            "Build and maintain UI components",
            "Fix bugs reported by QA",
            "Collaborate with backend developers"
        ]
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "CodeNest",
        location: "Lahore",
        type: "Full Time",
        category: "Development",
        salary: 2500,
        posted: "2026-08-28",
        remote: false,
        description: "CodeNest needs a Backend Developer to design and maintain REST APIs for our e-commerce platform.",
        requirements: [
            "Experience with Node.js or PHP",
            "Understanding of relational databases",
            "Knowledge of REST API design"
        ],
        responsibilities: [
            "Design and build APIs",
            "Optimize database queries",
            "Write basic unit tests"
        ]
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "PixelCraft Studio",
        location: "Karachi",
        type: "Part Time",
        category: "Design",
        salary: 1200,
        posted: "2026-09-03",
        remote: true,
        description: "PixelCraft Studio is hiring a part time UI/UX Designer to craft user flows and high fidelity mockups.",
        requirements: [
            "Portfolio showing UI/UX work",
            "Experience with Figma",
            "Basic knowledge of usability principles"
        ],
        responsibilities: [
            "Create wireframes and prototypes",
            "Run simple usability checks",
            "Work closely with developers"
        ]
    },
    {
        id: 4,
        title: "Digital Marketing Intern",
        company: "BrightWave Media",
        location: "Islamabad",
        type: "Internship",
        category: "Marketing",
        salary: 500,
        posted: "2026-09-05",
        remote: false,
        description: "BrightWave Media is offering an internship for someone excited about social media and content marketing.",
        requirements: [
            "Interest in digital marketing",
            "Comfortable writing short-form content",
            "Basic knowledge of social platforms"
        ],
        responsibilities: [
            "Schedule and publish social posts",
            "Track basic campaign metrics",
            "Assist with content calendars"
        ]
    },
    {
        id: 5,
        title: "Full Stack Developer",
        company: "NimbusWorks",
        location: "Lahore",
        type: "Full Time",
        category: "Development",
        salary: 3000,
        posted: "2026-08-20",
        remote: true,
        description: "NimbusWorks is building a SaaS product and needs a Full Stack Developer comfortable across the stack.",
        requirements: [
            "Experience with a frontend framework",
            "Experience with a backend language",
            "Understanding of databases"
        ],
        responsibilities: [
            "Ship features end-to-end",
            "Review pull requests",
            "Participate in sprint planning"
        ]
    },
    {
        id: 6,
        title: "Graphic Designer",
        company: "InkWell Creative",
        location: "Karachi",
        type: "Full Time",
        category: "Design",
        salary: 1500,
        posted: "2026-08-15",
        remote: false,
        description: "InkWell Creative needs a Graphic Designer to produce marketing visuals for print and digital campaigns.",
        requirements: [
            "Skilled with Adobe Photoshop and Illustrator",
            "Strong sense of layout and color",
            "Attention to detail"
        ],
        responsibilities: [
            "Design social and print creatives",
            "Maintain brand consistency",
            "Prepare files for print"
        ]
    },
    {
        id: 7,
        title: "QA Tester",
        company: "CodeNest",
        location: "Lahore",
        type: "Part Time",
        category: "Development",
        salary: 900,
        posted: "2026-09-02",
        remote: true,
        description: "CodeNest is looking for a detail-oriented QA Tester to test new features before release.",
        requirements: [
            "Understanding of manual testing",
            "Ability to write clear bug reports",
            "Basic knowledge of web applications"
        ],
        responsibilities: [
            "Test new features and report bugs",
            "Verify bug fixes",
            "Write simple test cases"
        ]
    },
    {
        id: 8,
        title: "Content Writer",
        company: "WordCraft Agency",
        location: "Islamabad",
        type: "Part Time",
        category: "Marketing",
        salary: 800,
        posted: "2026-08-25",
        remote: true,
        description: "WordCraft Agency needs a Content Writer who can turn technical topics into easy-to-read articles.",
        requirements: [
            "Strong written English",
            "Ability to research topics quickly",
            "Basic SEO knowledge is a plus"
        ],
        responsibilities: [
            "Write blog posts and articles",
            "Edit and proofread content",
            "Follow the brand style guide"
        ]
    },
    {
        id: 9,
        title: "Mobile App Developer",
        company: "AppForge Labs",
        location: "Karachi",
        type: "Full Time",
        category: "Development",
        salary: 2800,
        posted: "2026-09-04",
        remote: false,
        description: "AppForge Labs is hiring a Mobile App Developer to work on our upcoming Android and iOS apps.",
        requirements: [
            "Experience building mobile apps",
            "Understanding of mobile UI patterns",
            "Comfortable working with APIs"
        ],
        responsibilities: [
            "Build and test app screens",
            "Integrate with backend APIs",
            "Fix crashes and performance issues"
        ]
    },
    {
        id: 10,
        title: "Customer Support Representative",
        company: "HelpDesk Pro",
        location: "Lahore",
        type: "Full Time",
        category: "Support",
        salary: 1000,
        posted: "2026-08-10",
        remote: false,
        description: "HelpDesk Pro needs a friendly Customer Support Representative to assist users over chat and email.",
        requirements: [
            "Good communication skills",
            "Patience when handling complaints",
            "Basic computer literacy"
        ],
        responsibilities: [
            "Respond to customer queries",
            "Log issues in the support system",
            "Escalate complex issues"
        ]
    },
    {
        id: 11,
        title: "Data Entry Operator",
        company: "InfoTrack Solutions",
        location: "Islamabad",
        type: "Part Time",
        category: "Support",
        salary: 600,
        posted: "2026-09-06",
        remote: true,
        description: "InfoTrack Solutions is looking for a Data Entry Operator to keep our internal records accurate.",
        requirements: [
            "Fast and accurate typing",
            "Comfortable with spreadsheets",
            "Good attention to detail"
        ],
        responsibilities: [
            "Enter data into internal systems",
            "Check records for errors",
            "Prepare simple daily reports"
        ]
    },
    {
        id: 12,
        title: "Social Media Manager",
        company: "BrightWave Media",
        location: "Karachi",
        type: "Full Time",
        category: "Marketing",
        salary: 1800,
        posted: "2026-08-30",
        remote: true,
        description: "BrightWave Media needs a Social Media Manager to grow and manage brand presence across platforms.",
        requirements: [
            "Experience managing social accounts",
            "Creative content ideas",
            "Basic analytics knowledge"
        ],
        responsibilities: [
            "Plan and post content",
            "Reply to comments and messages",
            "Report on monthly growth"
        ]
    },
    {
        id: 13,
        title: "Junior Python Developer",
        company: "DataForge",
        location: "Lahore",
        type: "Internship",
        category: "Development",
        salary: 700,
        posted: "2026-09-07",
        remote: false,
        description: "DataForge is offering an internship for a Junior Python Developer to help build internal tools.",
        requirements: [
            "Basic knowledge of Python",
            "Willingness to learn quickly",
            "Understanding of basic data structures"
        ],
        responsibilities: [
            "Write small Python scripts",
            "Assist senior developers",
            "Document code changes"
        ]
    },
    {
        id: 14,
        title: "Product Designer",
        company: "PixelCraft Studio",
        location: "Islamabad",
        type: "Full Time",
        category: "Design",
        salary: 2200,
        posted: "2026-08-18",
        remote: true,
        description: "PixelCraft Studio is hiring a Product Designer to own the design of a new mobile product.",
        requirements: [
            "Strong portfolio of product work",
            "Experience with design systems",
            "Good communication skills"
        ],
        responsibilities: [
            "Design end-to-end product flows",
            "Maintain the design system",
            "Present work to stakeholders"
        ]
    }
];