// src/App.tsx
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import type { User, Course, Submission } from "./types/index";

// ===== LOADING MOCK DATA WITH useEffect =====
import { useState, useEffect } from "react";
// ===== TYPED DOM REFERENCE WITH useRef =====
import { useRef } from "react";

import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

const student: User = {
  id: 1, name: "Regina Angeli Cadeliña", email: "regina@example.com", 
  role: "student", isActive: true,
};
const course: Course = {
  code: "ITELECT4", title: "IT Elective 4",
  units: 3, semester: "1st Semester 2026-2027",
};
const submission: Submission = {
  id: 1, studentId: 1, courseCode: "ITELECT4",
  repoUrl: "github.com/rivioops/itelect4-project",
  submittedAt: new Date(), score: 95,
};

// src/App.tsx (continued)
function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ===== TYPED DOM EVENTS INSIDE HOOKS =====
  // Inside function App(), with your other code:
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Inside function App(), with your other code:
  // useRef<T>(null) -- T is the DOM element type
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // useEffect(fn, deps) -- fn runs after render;
  // an empty deps array [] means "run once, on mount"
  useEffect(() => {
    setTimeout(() => {
      // Reusing GT1's course mock data as the “fetched” result
      setCourses([course]);
      setIsLoading(false);
    }, 500);
  }, []);

  // Focus the input programmatically (e.g. after loading finishes)
  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  }
  // React.ChangeEvent<HTMLInputElement> types e.target as an <input>
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  }
  // Derived value -- recomputed every render, not stored in state
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="app">
      <input
        ref={searchInputRef}
        value={searchTerm}
        type="text"
        placeholder="Search courses..."
        onChange={handleSearchChange}
      />
      <button onClick={focusSearch}>
        Focus Search
      </button>
      
      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p>Previous search: "{previousSearch}"</p>
      )}
      
      <UserCard user={student} onSelect={setSelectedUser} />
      {selectedUser && <p>Selected: {selectedUser.name}</p>}
      <button onClick={toggleDetails}>
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {showDetails && (
        <p>
          Course: {course.title} | Code: {course.code} | Units: {course.units}
        </p>
      )}

      {filteredCourses.map((c) => (
        <CourseCard key={c.code} course={c} />
      ))}
    </div>
  );
};

export default App; 
