import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  let history = useHistory();
  const courses = useSelector((state) => state.courses);
  const authors = useSelector((state) => state.authors);
  const propsCourse = useSelector((state) => {
    const slug = props.match.params.slug;
    return slug && state.courses.length > 0 // make sure the api call to get courses is complete
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  });
  const [course, setCourse] = useState({ ...propsCourse });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // if courses are not available yet...
    if (courses.length === 0) {
      try {
        dispatch(loadCourses());
      } catch (error) {
        alert("Loading courses failed" + error);
      }
    } else {
      setCourse({ ...propsCourse });
    }

    // if authors are not available yet...
    if (authors.length === 0) {
      try {
        dispatch(loadAuthors());
      } catch (error) {
        alert("Loading authors failed" + error);
      }
    }
  }, [propsCourse]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    try {
      dispatch(saveCourse(course));
      toast.success("Course saved.");
      history.push("/courses");
    } catch (error) {
      setSaving(false);
      setErrors({ onSave: error.message });
    }
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

export default ManageCoursePage;
