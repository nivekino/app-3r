import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/user/UI/Navbar";
import HomeUser from "../components/user/Home/HomeUser";
import ReduceList from "../components/user/Reduce/ReduceList";
import ReuseList from "../components/user/Reuse/ReuseList";
import ReduceCreate from "../components/user/Reduce/ReduceCreate";
import ReuseCreate from "../components/user/Reuse/ReuseCreate";
import ReduceDetail from "../components/user/Reduce/ReduceDetail";
import DictionaryList from "../components/user/Dictionary/DictionaryList";
import DictionaryForm from "../components/user/Dictionary/DictionaryForm";
import ReuseDetail from "../components/user/Reuse/ReuseDetail";
import DictionaryDetails from "../components/user/Dictionary/DictionaryDetails";
import Profile from "../components/Profile/Profile";
import ProfileEdit from "../components/Profile/ProfileEdit";
import Home from "../components/user/Home/Home";

import RecycleList from "../components/user/Recycle/RecycleList";
import RecycleCreate from "../components/user/Recycle/RecycleCreate";

const RoutesLibrarian = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actions" element={<HomeUser />} />

        <Route path="/recycle" element={<RecycleList />} />
        <Route path="/recycle/create" element={<RecycleCreate />} />

        <Route path="/reduce" element={<ReduceList />} />
        <Route path="/reduce/create" element={<ReduceCreate />} />
        <Route path="/reduce/detail/:id" element={<ReduceDetail />} />

        <Route path="/reuse" element={<ReuseList />} />
        <Route path="/reuse/create" element={<ReuseCreate />} />
        <Route path="/reuse/detail/:id" element={<ReuseDetail />} />

        <Route path="/dictionary" element={<DictionaryList />} />
        <Route path="/dictionary/create" element={<DictionaryForm />} />
        <Route path="/dictionary/detail/:id" element={<DictionaryDetails />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
      </Routes>
    </>
  );
};

export default RoutesLibrarian;
