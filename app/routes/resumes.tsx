import type { Route } from "./+types/resumes";
import Navbar from "~/components/navbar";
import ResumeCard from "~/components/resumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate, Link } from "react-router";
import { useEffect, useState, useMemo } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "My Resumes - Resumind" },
    { name: "description", content: "View and manage all your analyzed resumes" },
  ];
}

export default function Resumes() {
  const { auth, isLoading, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/resumes");
    }
  }, [auth.isAuthenticated, isLoading]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoading(true);

      const kvResumes = (await kv.list("resume:*", true)) as KVItem[];
      if (!kvResumes) {
        setLoading(false);
        return;
      }

      const parsedResumes = kvResumes?.map((resume) =>
        JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoading(false);
    };

    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [auth.isAuthenticated]);

  // Calculate stats
  const stats = useMemo(() => {
    if (resumes.length === 0) return null;

    const scores = resumes
      .filter((r) => r.feedback?.overallScore)
      .map((r) => r.feedback.overallScore);

    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;

    return {
      total: resumes.length,
      avgScore,
      highestScore,
    };
  }, [resumes]);

  // Handle delete
  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
  };

  if (isLoading || !auth.isAuthenticated) return null;

  return (
    <main className="bg-[#f8f9fc] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[url('/images/bg-main.svg')] bg-cover opacity-50 pointer-events-none" />

      <Navbar />

      <section className="main-section relative z-10">
        {/* Header */}
        <div className="page-heading py-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="mb-4">My Resumes</h1>
          <h2 className="max-w-2xl mx-auto">
            Track your applications and view AI-powered feedback to improve your chances.
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 font-medium text-lg">Loading your resumes...</p>
            </div>
          </div>
        ) : resumes.length > 0 ? (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="w-full max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Total Resumes */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Total Resumes</p>
                        <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                      </div>
                    </div>
                  </div>

                  {/* Average Score */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Average Score</p>
                        <p className="text-3xl font-bold text-gray-800">{stats.avgScore}<span className="text-lg text-gray-400">/100</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Highest Score */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Highest Score</p>
                        <p className="text-3xl font-bold text-gray-800">{stats.highestScore}<span className="text-lg text-gray-400">/100</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resume Cards Grid */}
            <div className="resumes-section relative z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {resumes.map((resume, index) => (
                <div
                  key={resume.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ResumeCard resume={resume} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-700">
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center max-w-lg">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Resumes Yet</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Upload your first resume and get AI-powered feedback to land your dream job.
              </p>
              <Link
                to="/upload"
                className="primary-button inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Upload Your First Resume</span>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
