import { Link } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "./scoreCircle";

interface ResumeCardProps {
  resume: Resume;
  onDelete?: (id: string) => void;
}

const ResumeCard = ({ resume, onDelete }: ResumeCardProps) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const { fs, kv } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      if (!imagePath) return;

      try {
        const blob = await fs.read(imagePath);
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        setResumeUrl(url);
      } catch (error) {
        console.error("Failed to load resume image:", error);
      }
    };

    loadResume();
  }, [imagePath]);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);

    try {
      // Delete from KV store
      await kv.delete(`resume:${id}`);

      // Try to delete files (ignore errors if files don't exist)
      if (imagePath) {
        try {
          await fs.delete(imagePath);
        } catch (error) {
          console.error("Failed to delete image:", error);
        }
      }

      if (resume.resumePath) {
        try {
          await fs.delete(resume.resumePath);
        } catch (error) {
          console.error("Failed to delete resume file:", error);
        }
      }

      // Notify parent component
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Failed to delete resume:", error);
      alert("Failed to delete resume. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative">
      <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000 block">
        <div className="resume-card-header">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {companyName && <h2 className="!text-black font-bold break-words text-lg">{companyName}</h2>}
            {jobTitle && <h3 className="text-base break-words text-gray-500">{jobTitle}</h3>}

            {!companyName && !jobTitle && <h2 className="!text-black font-bold break-words">Untitled Resume</h2>}
            {!jobTitle && <h3 className="text-lg break-words text-gray-500">No Position Specified</h3>}
          </div>

          <div className="flex items-start gap-3 shrink-0">
            <ScoreCircle score={feedback?.overallScore || 0} />

            {/* Delete Button */}
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Delete resume"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {resumeUrl && (
          <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
              <img
                src={resumeUrl}
                alt="resume"
                className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-xl"
              />
            </div>
          </div>
        )}
      </Link>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 animate-in fade-in duration-200"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white rounded-xl p-6 shadow-xl max-w-xs mx-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Delete Resume?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. The resume and its analysis will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeCard;