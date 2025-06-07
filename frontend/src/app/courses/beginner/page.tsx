"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import MarkdownPreview from '@uiw/react-markdown-preview';

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
      <div className="flex flex-1 w-full h-[calc(100vh-48px)] gap-8 px-4 md:px-10 py-8 md:py-14">
        {/* Sidebar */}
        <aside className="w-64 min-w-[200px] bg-blue-50 dark:bg-gray-800 border-r border-blue-200 dark:border-pink-400 p-6 md:p-8 flex flex-col gap-4 rounded-xl shadow-md">
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
        <section className="flex-1 w-full h-full p-2 md:p-8 rounded-xl bg-white/70 dark:bg-gray-900/70 shadow-md">
          <h1 className="text-3xl font-extrabold text-blue-700 dark:text-pink-300 mb-4 mt-2">{course.title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">{course.description}</p>
          {selectedSection && (
            <article className="w-full flex-1 flex flex-col mb-8">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-pink-200 mb-4">{selectedSection.title}</h2>
              <div className="flex-1 overflow-y-auto p-0">
                <MarkdownPreview source={selectedSection.content} className="markdown-body text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-100" />
              </div>
              {/* Prev/Next Section Arrows */}
              <div className="flex justify-between items-center mt-8 gap-4">
                <button
                  onClick={() => {
                    const idx = sections.findIndex(s => s.id === selectedSection.id);
                    if (idx > 0) setSelectedSection(sections[idx - 1]);
                  }}
                  disabled={sections.findIndex(s => s.id === selectedSection.id) === 0}
                  className="px-5 py-2 rounded-full font-semibold bg-blue-100 dark:bg-pink-900/30 text-blue-700 dark:text-pink-300 border border-blue-300 dark:border-pink-400 shadow hover:bg-blue-200 dark:hover:bg-pink-800/50 transition-all duration-200 disabled:opacity-50"
                >
                  &#8592; Prev
                </button>
                <button
                  onClick={() => {
                    const idx = sections.findIndex(s => s.id === selectedSection.id);
                    if (idx < sections.length - 1) setSelectedSection(sections[idx + 1]);
                  }}
                  disabled={sections.findIndex(s => s.id === selectedSection.id) === sections.length - 1}
                  className="px-5 py-2 rounded-full font-semibold bg-blue-100 dark:bg-pink-900/30 text-blue-700 dark:text-pink-300 border border-blue-300 dark:border-pink-400 shadow hover:bg-blue-200 dark:hover:bg-pink-800/50 transition-all duration-200 disabled:opacity-50"
                >
                  Next &#8594;
                </button>
              </div>
            </article>
          )}
        </section>
      </div>
    </main>
  );
}