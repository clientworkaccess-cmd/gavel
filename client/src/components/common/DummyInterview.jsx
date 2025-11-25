import InterviewDetail from "./InterviewDetail";

const demoInterview = {
    "_id": "69247e1945f6633479998291",
    "candidate": "Michael Jackson",
    "candidateId": {
        "_id": "69245d983484d41ab0b6c4d8",
        "name": "Micheal Jackson",
        "email": "asharimran41@gmail.com",
        "password": "$2b$10$RF4DJg/JTFAHO5AIgFGE7.OADB0Nw.7dTZbKopLrXpVDroSk5y/.m",
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
    "jobDescription": "About the Opportunity Evolve Workforce Solutions is proud to partner with a prominent law firm seeking an experienced Commercial Real Estate Attorney...",
    "summary": [
        "Candidate demonstrated strong communication skills during the interview.",
        "Exhibited solid knowledge of commercial real estate leasing and contract drafting.",
        "Professional and collaborative attitude noted throughout the conversation.",
        "Overall, candidate appears to be a strong fit for the Commercial Real Estate Attorney role."
    ],
    "transcript": [
        {
            "role": "assistant",
            "content": "Hi Michael, thank you for joining today. Can you briefly introduce yourself and your experience in commercial real estate?",
            "_id": "69247e1945f6633479998292"
        },
        {
            "role": "user",
            "content": "Hi, I’m Michael Jackson. I’ve been practicing commercial real estate law for 5 years, primarily handling office and retail leasing agreements. I’ve drafted and negotiated multiple high-value leases and purchase agreements for both landlords and tenants.",
            "_id": "69247e1945f6633479998294"
        },
        {
            "role": "assistant",
            "content": "Great! Can you walk me through your process when negotiating a commercial lease for a client?",
            "_id": "69247e1945f6633479998295"
        },
        {
            "role": "user",
            "content": "Sure. I start by reviewing the lease terms in detail and identifying clauses that could impact my client. Then I discuss potential adjustments with the client and the other party, negotiate terms like rent, duration, and exit clauses, and finally ensure all amendments are properly documented.",
            "_id": "69247e1945f6633479998296"
        },
        {
            "role": "assistant",
            "content": "How do you handle complex due diligence tasks, like reviewing titles and surveys?",
            "_id": "69247e1945f6633479998297"
        },
        {
            "role": "user",
            "content": "I carefully analyze title reports, survey documents, and any existing lease obligations. I highlight risks or discrepancies and advise clients on mitigating them before finalizing transactions.",
            "_id": "69247e1945f6633479998298"
        },
        {
            "role": "assistant",
            "content": "Excellent. Finally, what motivates you to work in commercial real estate law?",
            "_id": "69247e1945f6633479998299"
        },
        {
            "role": "user",
            "content": "I enjoy negotiating complex agreements and helping clients achieve their business goals. I find the dynamic nature of real estate law very stimulating and rewarding.",
            "_id": "69247e1945f6633479998300"
        }
    ],
    "jobName": "Commercial Real Estate Attorney",
    "category": "legal",
    "scores": {
        "communication": 9,
        "knowledge": 8,
        "attitude": 9,
        "overallFit": 9,
        "_id": "69247e1945f6633479998293"
    },
    "recommendation": "🟢 Strong Fit",
    "expectedSalary": "120000 USD per year",
    "goodkeyInsights": [
        "Candidate has 5 years of relevant commercial real estate experience.",
        "Strong understanding of lease negotiation and contract drafting.",
        "Professional, clear communicator with collaborative attitude.",
        "Capable of handling complex due diligence tasks independently."
    ],
    "badkeyInsights": [
        "None observed during the interview."
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
