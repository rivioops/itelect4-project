// src/components/SubmissionBadge.tsx
import type { Submission } from "../types/index";
interface SubmissionBadgeProps {
    submission: Submission;
    children?: React.ReactNode;
}
const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({
    submission,
    children,
}) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Submission Details
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Repo:</span>{" "}
                <a
                    href={`https://${submission.repoUrl}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                    target="_blank"
                    rel="noreferrer"
                >
                    {submission.repoUrl}
                </a>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Score:</span>{" "}
                {submission.score ?? "Not graded yet"}
            </p>
            {children && (
                <div className="mt-3 rounded bg-green-50 p-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {children}
                </div>
            )}
        </div>
    );
};
export default SubmissionBadge;