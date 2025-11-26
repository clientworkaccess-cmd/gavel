import InterviewDetail from "./InterviewDetail";

const demoInterview = {
    "_id": "69247e1945f6633479998291",
    "candidate": "Henry Adams",
    "candidateId": {
        "_id": "69245d983484d41ab0b6c4d8",
        "name": "Henry Adams",
        "email": "test@example.com",
        "phoneNumber": 60376767674,
        "company": ["Evolve Workforce Solutions", "Global Realty Partners"],
        "role": "candidate",
        "skills": ["Commercial Real Estate", "Lease Negotiation", "Contract Drafting"],
        "position": [
            {
                "title": "Commercial Real Estate Associate",
                "company": "Global Realty Partners",
                "startDate": "2020-01-15",
                "endDate": "2023-06-30"
            },
            {
                "title": "Senior Real Estate Attorney",
                "company": "Evolve Workforce Solutions",
                "startDate": "2023-07-01",
                "endDate": "Present"
            }
        ],
        "interviews": [
            "692469c1619a20f97d81dd7f",
            "6924739dfb01fe8690cb1697",
            "692474bf5ef880d9c53ef39c",
            "6924750a64b019f8f23d6868",
            "692475575e8e582d776a057e",
            "6924764ab9986918a367f096",
            "692477f845f6633479998124",
            "69247aab45f6633479998201",
            "69247b9945f663347999822b",
            "69247e1945f6633479998291"
        ],
        "emailVerified": true,
        "createdAt": "2025-11-24T13:28:56.972Z",
        "updatedAt": "2025-11-25T13:25:05.062Z",
        "__v": 2
    },
    "jobDescription": "About the Role \n The Cook will take charge of preparing large quantities of food for private events and banquets.You’ll manage one or more prep or line stations, coordinate with chefs and assistants, ensure timeliness and quality, and help deliver a memorable dining experience for event guests. \n key Responsibilities \n Oversee and execute preparation of menu items for banquets and private events. Ability to follow recipes and maintain consistency in taste, portion, and presentation. Manage specific stations(grill, sauté, roast, etc.), ensuring consistency and high presentation quality. Coordinate with banquet manager, sous chef, and kitchen team to ensure food is delivered on schedule. Portion control, plating, and quality checks before service.",
    "summary": [
        "Candidate demonstrated strong communication skills during the interview.",
        "Exhibited solid knowledge of commercial real estate leasing and contract drafting.",
        "Professional and collaborative attitude noted throughout the conversation.",
        "Overall, candidate appears to be a strong fit for the Commercial Real Estate Attorney role."
    ],
    "transcript": [
        {
            "role": "assistant",
            "content": "Hi Henry, thanks for joining the call today. Let's start with a quick introduction — can you tell me a little about yourself and your background in commercial real estate?",
            "_id": "69247e1945f6633479999101"
        },
        {
            "role": "user",
            "content": "Sure. I’m Henry Adams, and I’ve been working in commercial real estate law for about 5 years, mostly focusing on office and retail leases.",
            "_id": "69247e1945f6633479999102"
        },
        {
            "role": "assistant",
            "content": "Great. When you're reviewing a lease for a new client, what's the first thing you typically focus on?",
            "_id": "69247e1945f6633479999103"
        },
        {
            "role": "user",
            "content": "I look at the key terms — rent structure, duration, liability clauses, and anything that might create risk for the client.",
            "_id": "69247e1945f6633479999104"
        },
        {
            "role": "assistant",
            "content": "Makes sense. Can you describe your general approach when negotiating lease terms with the opposing counsel?",
            "_id": "69247e1945f6633479999105"
        },
        {
            "role": "user",
            "content": "I keep the discussion straightforward. I highlight the clauses we want adjusted, explain the reasoning, and try to find solutions that work for both sides.",
            "_id": "69247e1945f6633479999106"
        },
        {
            "role": "assistant",
            "content": "Nice. Let's talk about due diligence. How do you handle reviews of titles, surveys, or potential encumbrances?",
            "_id": "69247e1945f6633479999107"
        },
        {
            "role": "user",
            "content": "I review everything carefully, flag any easements or issues, and let the client know what might affect the deal before they move forward.",
            "_id": "69247e1945f6633479999108"
        },
        {
            "role": "assistant",
            "content": "Good approach. How would you describe your communication style when working with clients or brokers?",
            "_id": "69247e1945f6633479999109"
        },
        {
            "role": "user",
            "content": "Clear and direct. I like keeping clients informed without overwhelming them with too much legal detail.",
            "_id": "69247e1945f6633479999110"
        },
        {
            "role": "assistant",
            "content": "Understood. One last question — what keeps you motivated to work in commercial real estate law?",
            "_id": "69247e1945f6633479999111"
        },
        {
            "role": "user",
            "content": "I enjoy the complexity of deals and helping clients reach their goals. Every transaction feels different.",
            "_id": "69247e1945f6633479999112"
        },
        {
            "role": "assistant",
            "content": "Thanks for sharing all of that, Henry. That was the last question on my end. I appreciate your time today. This concludes our interview. Have a great rest of your day!",
            "_id": "69247e1945f6633479999113"
        }
    ]
    ,
    "jobName": "Commercial Real Estate Attorney",
    "category": "legal",
    "scores": {
        "communication": 90,
        "knowledge": 80,
        "attitude": 90,
        "overallFit": 93,
        "_id": "69247e1945f6633479998293"
    },
    "recommendation": "🟢 Strong Fit",
    "expectedSalary": "$120000 per year",
    "goodkeyInsights": [
        "Candidate has 5 years of relevant commercial real estate experience.",
        "Strong understanding of lease negotiation and contract drafting.",
        "Professional, clear communicator with collaborative attitude.",
        "Capable of handling complex due diligence tasks independently."
    ],
    "badkeyInsights": [
    ],
    "redFlags": [],
    "reviewStatus": "approved",
    "evaluatedAt": "2025-11-25T14:00:00.000Z",
    "createdAt": "2025-11-24T15:47:37.973Z",
    "updatedAt": "2025-11-25T14:10:00.000Z",
    "__v": 0
}


const InterviewDetailDemo = () => {

    return (
        <div className="container mx-auto px-4 py-10 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-800 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group rounded-2xl hover:scale-103 cursor-pointer">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Interview Report</h1>

            <InterviewDetail dummyData={demoInterview} />
        </div>
    );
};

export default InterviewDetailDemo;
