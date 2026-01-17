import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/summary";
import ATS from "~/components/ats";
import Details from "~/components/details";
import Navbar from "~/components/navbar";

export default function Resume() {
  const { id } = useParams();
  const { auth, isLoading, kv, fs } = usePuterStore();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [resumeUrl, setResumeUrl] = useState<string | undefined>(undefined);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const response = await kv.get(`resume:${id}`);
      if (!response) {
        return;
      }

      const data = JSON.parse(response);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) {
        return;
      }
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      if (!pdfBlob) {
        return;
      }
      setResumeUrl(URL.createObjectURL(pdfBlob));
      setFeedback(data.feedback);

      const resumeImageBlob = await fs.read(data.resumeImagePath);
      if (!resumeImageBlob) {
        return;
      }
      const resumeImage = new Blob([resumeImageBlob], { type: "image/png" });
      setImageUrl(URL.createObjectURL(resumeImage));

      if (data.imagePath) {
        const imageBlob = await fs.read(data.imagePath);
        if (imageBlob) {
          const image = new Blob([imageBlob], { type: "image/png" });
          setImageUrl(URL.createObjectURL(image));
        }
      }
    };

    loadResume();
  }, [id]);

  return (
    <div>
      <main className="bg-[#f8f9fc] relative min-h-screen overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[url('/images/bg-main.svg')] bg-cover opacity-50 pointer-events-none" />

        <Navbar />

        <div className="main-section relative z-10 !pt-20">
          <div className="page-heading mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="mb-4">Resume Review</h1>
            <h2>Comprehensive AI-powered analysis of your resume.</h2>
          </div>

          <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-12 px-4 pb-20 overflow-hidden">
            <section className="w-full lg:w-[45%] flex flex-col items-center">
              {imageUrl ? (
                <div className="animate-in fade-in zoom-in duration-700 sticky top-32">
                  <div className="gradient-border shadow-2xl overflow-hidden rounded-2xl bg-white p-2">
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block hover:opacity-95 transition-opacity">
                      <img src={imageUrl} alt="resume" className="max-w-full h-auto rounded-lg" title="View Full PDF" />
                    </a>
                  </div>
                  <p className="mt-4 text-center text-sm text-gray-500 font-medium italic">Click image to view full PDF</p>
                </div>
              ) : (
                <div className="w-full aspect-[3/4] bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center p-12 text-center">
                  <img src="/images/resume-scan-2.gif" alt="loading" className="w-32 h-32 mb-6" />
                  <h3 className="text-lg font-semibold text-gray-800">Loading Preview...</h3>
                  <p className="text-gray-500 text-sm">We're retrieving your resume data from Puter.</p>
                </div>
              )}
            </section>

            <section className="w-full lg:w-[55%] flex flex-col gap-8">
              {feedback ? (
                <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
                  <Summary feedback={feedback} />
                  <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                  <Details feedback={feedback} />
                </div>
              ) : (
                <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-center">
                  <img src="/images/resume-scan-2.gif" alt="empty" className="w-48 h-48 mb-6" title="empty" />
                  <h3 className="text-xl font-semibold text-gray-800">Analyzing your resume...</h3>
                  <p className="text-gray-500 max-w-xs mt-2">We're extracting insights to help you land your dream job.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>


    </div>
  );
}