import { useState, useEffect, useRef } from "react";
import type { User, Course, Submission } from "./types/index";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

const student: User = {
  id: 1,
  name: "Regina Angeli Cadeliña",
  email: "regina@example.com",
  role: "student",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

const submission: Submission = {
  id: 1,
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "github.com/rivioops/itelect4-project",
  submittedAt: new Date(),
  score: 95,
};

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    setTimeout(() => {
      setCourses([course]);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(e.target.value);

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="animate-pulse p-6">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
        Could not load courses.
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <button onClick={toggleDarkMode} className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white dark:bg-gray-200 dark:text-gray-900">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={() => setIsError(true)} className="ml-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700">
          Simulate Error
        </button>
        
        <input ref={searchInputRef} value={searchTerm} onChange={handleSearchChange}
          placeholder="Search courses..." className="mt-4 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p>Previous search: "{previousSearch}" </p>
        )}
        
        <div className="mt-4 flex items-center gap-4">
          {selectedUser && <p className="font-semibold text-blue-600 dark:text-blue-400">Selected: {selectedUser.name}</p>}
          <button onClick={toggleDetails} className="rounded bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            {showDetails ? "Hide" : "Show"} Details
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UserCard user={student} onSelect={setSelectedUser} />
          
          {filteredCourses.map((c) => (
            <CourseCard key={c.code} course={c} variant="compact" />
          ))}
          
          <SubmissionBadge submission={submission}>
            <p>On time!</p>
          </SubmissionBadge>
        </div>
      </div>
    </div>
  );
}

export default App;