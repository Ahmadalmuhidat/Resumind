import type { Route } from "./+types/about";
import Navbar from "~/components/navbar";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "About - Resumind" },
    { name: "description", content: "Learn about Resumind and the developer behind it" },
  ];
}

export default function About() {
  return (
    <main className="bg-[#f8f9fc] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[url('/images/bg-main.svg')] bg-cover opacity-50 pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="main-section relative z-10 pt-8">
        <div className="page-heading py-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="mb-6">About Resumind</h1>
          <h2 className="max-w-2xl mx-auto">
            AI-powered resume analysis to help job seekers stand out and land their dream job.
          </h2>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Job hunting is tough. Your resume often gets rejected by automated systems before a human ever sees it.
              <strong className="text-gray-800"> Resumind</strong> was built to change that.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We use advanced AI to analyze your resume against real hiring criteria — ATS compatibility, content quality,
              structure, and skills alignment. Our goal is to give you actionable feedback that actually helps you
              get more interviews and land your dream job.
            </p>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="relative z-10 py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-gradient text-center mb-12">What Makes Resumind Different</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">AI-Powered</h4>
              <p className="text-gray-500">
                Powered by Claude AI for intelligent, context-aware resume analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Actionable Tips</h4>
              <p className="text-gray-500">
                Get specific, actionable suggestions — not generic advice.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Privacy First</h4>
              <p className="text-gray-500">
                Your resumes are stored securely and never shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gradient text-center mb-12">Meet the Developer</h3>

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Profile Image */}
              <div className="shrink-0">
                <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white ring-4 ring-gray-100">
                  <img
                    src="/images/ahmad_almuhidat.jpg"
                    alt="Ahmad Almuhidat"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Ahmad Almuhidat</h4>
                <p className="text-blue-600 font-medium mb-4">Senior Software Engineer</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  I'm a passionate developer who loves building products that solve real problems.
                  Resumind was born from my own frustration with the job application process —
                  I wanted to create a tool that gives everyone a fair shot at getting their resume noticed.
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a
                    href="https://github.com/ahmadalmuhidat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahmad-almuhidat-57a245217/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gradient mb-8">Built With</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["React", "React Router", "TypeScript", "Tailwind CSS", "Puter.js", "Antigravity AI"].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gradient mb-4">Ready to Improve Your Resume?</h3>
          <p className="text-gray-500 text-lg mb-8">
            Join thousands of job seekers who've improved their resumes with Resumind.
          </p>
          <Link
            to="/upload"
            className="primary-button inline-flex items-center justify-center gap-3 px-8 py-4 text-lg shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Get Started Now</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-bold text-gray-700">Resumind</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Resumind. Made with ❤️ by Ahmad Almuhidat
          </p>
        </div>
      </footer>
    </main>
  );
}
