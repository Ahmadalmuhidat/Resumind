interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

export default function ATS({ score, suggestions }: ATSProps) {
    let gradientColor = "from-red-100";
    let mainIcon = "/icons/ats-bad.svg";

    if (score > 69) {
        gradientColor = "from-green-100";
        mainIcon = "/icons/ats-good.svg";
    } else if (score > 49) {
        gradientColor = "from-yellow-100";
        mainIcon = "/icons/ats-warning.svg";
    }

    return (
        <div className={`bg-gradient-to-b ${gradientColor} to-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-8`}>
            {/* Top Section */}
            <div className="flex flex-row items-center gap-4">
                <img src={mainIcon} alt="ATS Icon" className="w-12 h-12" />
                <h2 className="text-2xl font-bold text-gray-900 leading-none">ATS Score - {score}/100</h2>
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-gray-800">Optimizing for Success</h3>
                    <p className="text-brand-500 leading-relaxed font-medium">
                        Your ATS (Applicant Tracking System) score indicates how effectively your resume communicates your value to automated scanners. A optimized score ensures your resume reaches human eyes.
                    </p>
                </div>

                {/* Suggestions List */}
                <div className="flex flex-col gap-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex flex-row items-start gap-4 bg-white/40 p-4 rounded-2xl border border-white/60 backdrop-blur-sm shadow-sm transition-all hover:bg-white/60">
                            <img
                                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                                alt={suggestion.type}
                                className="w-5 h-5 mt-0.5"
                            />
                            <p className="text-gray-700 font-bold text-sm">{suggestion.tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Closing Line */}
            <div className="pt-4 border-t border-gray-100/50">
                <p className="text-sm font-bold text-brand-600 italic">
                    🚀 {score > 70
                        ? "You're on the right track! Minimal tweaks could make it perfect."
                        : "Focus on the improvements above to break through the automated filters."}
                </p>
            </div>
        </div>
    );
}