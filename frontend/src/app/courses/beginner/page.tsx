"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from 'react-markdown';

interface Course {
  id: string;
  title: string;
  description: string;
  image_url?: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  section_order: number;
}

export default function BeginnerCoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      // Fetch the beginner course
      const { data: courses, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("type", "beginner")
        .limit(1);
        console.log('courses:', courses, 'error:', courseError)
      if (courseError || !courses || courses.length === 0) {
        setLoading(false);
        return;
      }
      setCourse(courses[0]);
      // Fetch sections for this course
      const { data: sectionsData } = await supabase
        .from("sections")
        .select("*")
        .eq("course_id", courses[0].id)
        .order("section_order", { ascending: true });
      setSections(sectionsData || []);
      setSelectedSection(sectionsData && sectionsData.length > 0 ? sectionsData[0] : null);
      setLoading(false);
    };
    fetchCourseData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }
  if (!course) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Beginner course not found.</div>;
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">
      <div className="flex flex-1 w-full max-w-7xl mx-auto mt-12 mb-16 rounded-2xl shadow-lg overflow-hidden bg-white/90 dark:bg-gray-900/90">
        {/* Sidebar */}
        <aside className="w-64 min-w-[200px] bg-blue-50 dark:bg-gray-800 border-r border-blue-200 dark:border-pink-400 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 dark:text-pink-300 mb-4">Sections</h2>
          <nav className="flex flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className={`text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedSection?.id === section.id
                    ? "bg-blue-600 text-white dark:bg-pink-400 dark:text-gray-900 shadow"
                    : "bg-white dark:bg-gray-700 text-blue-700 dark:text-pink-300 hover:bg-blue-100 dark:hover:bg-pink-900/30"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <section className="flex-1 p-10 overflow-y-auto">
          <h1 className="text-3xl font-extrabold text-blue-700 dark:text-pink-300 mb-2">{course.title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">{course.description}</p>
          {selectedSection && (
            <article>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-pink-200 mb-4">{selectedSection.title}</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown>{selectedSection.content}</ReactMarkdown>
              </div>
            </article>
          )}
        </section>
      </div>
    </main>
  );
} 