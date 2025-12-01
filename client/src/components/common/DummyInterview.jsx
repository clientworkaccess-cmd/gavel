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
    },
    "jobDescription": "About the Opportunity \n Evolve Workforce Solutions is proud to partner with a prominent law firm seeking an experienced Commercial Real Estate Attorney to join their growing real estate practice.This role offers the opportunity to work on sophisticated office and retail leasing transactions across both landlord and tenant representations, while gaining exposure to broader real estate and transactional matters. Ideal candidates will bring at least 3 years of commercial real estate experience, a deep understanding of leasing structures, and excellent drafting and negotiation skills. \n\n This is a fantastic opportunity for an attorney seeking long- term growth, professional development, and a potential partnership track. What’s in It for You Competitive compensation package based on experience Comprehensive benefits including medical, dental, vision, and 401(k) with profit sharing Paid time off, including holidays and parental leave Hybrid work environment with flexible office locations Long - term growth potential within a nationally respected real estate practice Key Responsibilities Draft, review, and negotiate commercial office and retail leases, including related documentation such as amendments, letters of intent, SNDA agreements, consents, estoppel certificates, and commission agreements Support both landlord - side and tenant - side leasing transactions Draft and negotiate commercial transactional documents, including purchase and sale agreements, deeds, assignments, financing instruments, and corporate authority documents Conduct legal due diligence, including lease and contract review, title and survey analysis, and monitoring of contingencies Prepare and review closing documents, conduct closings, and manage post - closing administration Collaborate with senior attorneys, paralegals, and other team members on real estate matters Qualifications J.D.from an accredited law school and licensed to practice in at least one U.S.jurisdiction Minimum 3 years of experience as a practicing attorney in commercial real estate law Demonstrated experience in office and retail leasing transactions Familiarity with purchase sale agreements, title survey review, and real estate due diligence Excellent drafting, negotiation, and communication skills Strong organizational abilities and the capacity to manage multiple deadlines and priorities independently Proficiency in Microsoft Word, Outlook, Excel, and legal document management tools Work Environment & Schedule Hybrid work model with a mix of in -office and remote flexibility Physical presence may be required for closings, client meetings, and in -office collaborations Occasional travel may be necessary for client site visits or industry events Standard business hours with occasional extended hours based on client needs Evolve Workforce Solutions is an equal opportunity employer committed to diversity and inclusion in the workplace. \n We encourage qualified candidates from all backgrounds to apply and join our dynamic team.",
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
    "jobName": "Sales Representative",
    "category": "Legal",
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
        <div id="interview-detail-demo" className="container mx-auto px-4 py-10 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-800 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group rounded-2xl hover:scale-103 cursor-pointer">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Interview Report</h1>

            <InterviewDetail dummyData={demoInterview} />
        </div>
    );
};

export default InterviewDetailDemo;
