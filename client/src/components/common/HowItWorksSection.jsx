/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksSection = () => {

    const navigate = useNavigate()
    return (
        <section className="px-6 py-20" aria-labelledby="how-it-works">
            <h2 id="how-it-works" className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4 text-center">
                How it works
            </h2>
            <p className="text-gray-600 max-w-3xl mb-8 mx-auto text-center">
                From role upload to ranked shortlists — Gavel automates the boring parts of hiring so you focus on
                decisions that matter.
            </p>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
                {/* Left: Steps */}
                <div>
                    <div className="space-y-6">
                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45 }}
                            className="flex gap-4"
                        >
                            <div className="flex-none w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Upload a role</h3>
                                <p className="text-gray-600">Paste a job description or upload your role — Gavel configures screening questions automatically.</p>
                            </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, delay: 0.06 }}
                            className="flex gap-4"
                        >
                            <div className="flex-none w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">AI interviews candidates</h3>
                                <p className="text-gray-600">Candidates start interviews from the browser — our AI asks questions, records responses, and extracts signal.</p>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, delay: 0.12 }}
                            className="flex gap-4"
                        >
                            <div className="flex-none w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center border border-green-100">
                                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Receive ranking + summaries</h3>
                                <p className="text-gray-600">Gavel scores every candidate for skills & fit, generates concise summaries, and ranks a ready-to-hire shortlist.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-lg:justify-center">
                        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700" onClick={() => navigate("/login")}>Try the Interview</Button>
                        <Button variant="outline" className="px-6 py-3 rounded-lg" onClick={() => navigate("/login")}>View sample report</Button>
                    </div>
                </div>

                {/* Right: Scorecard mockup */}
                <div className="w-full max-w-3xl mx-auto bg-linear-to-b from-white to-gray-50 border border-gray-100 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700">Candidate scorecard</h4>
                            <p className="text-xs text-gray-500">Auto-generated after interview</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-extrabold text-gray-900">92</div>
                            <div className="text-xs text-gray-500">Recommended</div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-3" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-800">Communication</div>
                                <div className="text-xs text-gray-500">Clear & confident</div>
                            </div>
                            <div className="text-lg font-semibold text-gray-700">9/10</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-800">Role fit</div>
                                <div className="text-xs text-gray-500">Relevant experience</div>
                            </div>
                            <div className="text-lg font-semibold text-gray-700">8/10</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-800">Reliability</div>
                                <div className="text-xs text-gray-500">On-time & honest</div>
                            </div>
                            <div className="text-lg font-semibold text-gray-700">9/10</div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-4" />

                    <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-600">Summary</div>
                        <a className="text-blue-600 font-medium" href="#">View full report</a>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default HowItWorksSection