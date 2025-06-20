import { Link, useParams } from "react-router-dom";
import useSingleInstructor from "../../Hooks/useSingleInstructor";
import image from "../../assets/instructorimg/i1.jpg";
import LoadingSpinner from "../Shared/LoadingSpinner";

const InstructorDetails = () => {
  const { id } = useParams();

  const [instructor, loading] = useSingleInstructor(id);

  let instructorData;

  if (instructor && instructor.data) {
    instructorData = instructor.data;
  } else {
    return (
      <div>
        No Course available.
        <LoadingSpinner />;
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!instructorData) {
    return <div>No Instructor Data available.</div>;
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <p className="text-xs font-bold">{id}</p>
            <h1 className="text-xl text-cyan-400 font-bold">
              {instructorData?.name?.firstName +
                " " +
                instructorData?.name?.lastName}
            </h1>

            <p className="py-2 text-lg text-blue-400">
              Expartise:{instructorData.expertise?.primary},
              {instructorData.expertise?.secondary}
            </p>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h1 className="text-yellow-700 text-lg">
              Connected with {instructorData?.name?.firstName}
            </h1>

            <p className="py-2 text-blue-700 text-xl flex">
              Social Media:{" "}
              <ul className="flex">
                <li className="btn btn-sm btn-outline mx-2 cursor-pointer">
                  <a href={instructorData.socialMedia?.facebook} target="blank">
                    Facebook
                  </a>
                </li>
                <li className="btn btn-sm btn-outline mx-2 cursor-pointer">
                  <a href={instructorData.socialMedia?.github} target="blank">
                    Github
                  </a>
                </li>
                <li className="btn btn-sm btn-outline mx-2 cursor-pointer">
                  <a href={instructorData.socialMedia?.linkedin} target="blank">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </p>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <Link to={`/courses/instructor/${id}`}>
              <button className="btn btn-outline btn-sm">
                Show {instructorData?.name?.firstName} Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
