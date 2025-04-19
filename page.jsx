import { useState, useEffect } from 'react';
import { useCourses } from '../../hooks/useCourses';
import CourseList from '../../components/Course/CourseList';
import FiltersAndSort from '../../components/Course/FiltersAndSort';
import Pagination from '../../components/UI/Pagination';

export default function CoursesPage() {
  const { courses, loading, error } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  // Get unique tags
  const tags = [...new Set(courses.map(course => course.tag))];

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleSearch = (term) => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const handleSort = (sortOption) => {
    const sorted = [...filteredCourses].sort((a, b) => {
      switch (sortOption) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        default: return 0;
      }
    });
    setFilteredCourses(sorted);
  };

  const handleFilter = (tag) => {
    setFilteredCourses(tag === 'all' ? courses : courses.filter(c => c.tag === tag));
    setCurrentPage(1);
  };

  
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  if (loading) return <div className="text-center py-8">Loading courses...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      
      <FiltersAndSort 
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        tags={tags}
      />
      
      <CourseList courses={currentCourses} />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}