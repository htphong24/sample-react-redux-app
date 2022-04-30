import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const CoursesPage = () => {
  const courses = useSelector((state) => {
    return state.authors.length === 0
      ? []
      : state.courses.map((course) => {
          return {
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId)
              .name,
          };
        });
  });
  const authors = useSelector((state) => state.authors);
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const dispatch = useDispatch();
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      try {
        dispatch(courseActions.loadCourses());
      } catch (error) {
        alert("Loading courses failed" + error);
      }
    }

    if (authors.length === 0) {
      try {
        dispatch(authorActions.loadAuthors());
      } catch (error) {
        alert("Loading authors failed" + error);
      }
    }
  }, []);

  const handleDeleteCourse = (course) => {
    toast.success("Course deleted");

    try {
      dispatch(courseActions.deleteCourse(course));
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => dispatch(setRedirectToAddCoursePage(true))}
          >
            Add Course
          </button>

          <CourseList onDeleteClick={handleDeleteCourse} courses={courses} />
        </>
      )}
    </>
  );
};

export default CoursesPage;
