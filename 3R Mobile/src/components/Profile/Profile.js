import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import httpClient from "../../services/services";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [dataProfile, setDataProfile] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    httpClient
      .get(`user/archieves/getAchievementByUserId/${user.userId}`, {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        console.log(res.data);
        setDataProfile(res.data.achievement);
      })
      .catch((err) => {
        console.log(err);
      });

    httpClient
      .get(`user/info/${user.userId}`, {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        setProfile(res.data.info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="bg-yellowr w-full flex flex-col items-center p-8 lg:flex-row lg:justify-evenly">
      <Link to="/user" className="text-2xl text-green-500 self-start">
        <i className="fa-regular fa-arrow-left"></i>
      </Link>
      <div className="bg-white w-10/12 p-4 rounded-lg flex flex-col items-center lg:w-2/4 lg:h-3/4 lg:mr-4 lg:py-12">
        <h1 className="text-black text-xl">My Profile</h1>
        <img
          className="rounded-full object-cover w-56 h-48 my-4 img-card lg:px-2 lg:w-80 lg:h-80"
          src={profile.image}
          alt="books"
        />
        <p className="text-black text-center text-xl">{profile.username}</p>
        <Link
          to="/user/profile/edit"
          className="w-4/6 px-6 py-2 mt-4 text-white bg-greenr rounded-lg focus:bg-primary-400 text-lg text-center"
        >
          Edit Profile
        </Link>
      </div>

      <div className="bg-white w-full pt-2 pb-2 px-4 mt-4 rounded-lg lg:w-2/4 lg:h-3/4 h-auto lg:pt-6 lg:mt-0 lg:pb-6">
        <h2 className="text-greenr text-center text-3xl lg:text-5xl lg:mb-2">
          Achievements:
        </h2>
        <div className="w-full overflow-auto flex">
          {dataProfile.length > 0 ? (
            dataProfile.map((item) => (
              <img
                key={item._id}
                className="rounded object-fit w-48 h-56 my-4 img-card lg:px-2 lg:w-96 lg:h-full lg:rounded-3xl mr-5"
                src={item?.achievementId?.image}
                alt="books"
              />
            ))
          ) : (
            <div className="text-center w-full mt-5">
              <p className="text-black text-center text-xl">No achievements</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
