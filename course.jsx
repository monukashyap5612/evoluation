import { createContext, useState, useEffect } from 'react';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../services/firebase';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course) => {
    try {
      const newCourse = await createCourse(course);
      setCourses(prev => [...prev, newCourse]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editCourse = async (id, updates) => {
    try {
      await updateCourse(id, updates);
      setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { getCourses(); }, []);

  return (
    <CourseContext.Provider value={{
      courses,
      loading,
      error,
      getCourses,
      addCourse,
      editCourse,
      removeCourse
    }}>
      {children}
    </CourseContext.Provider>
  );
};