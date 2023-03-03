import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/admin/UI/Navbar";
import HomeAdmin from "../components/admin/Home/HomeAdmin";
import ReduceList from "../components/admin/Reduce/ReduceList";
import ReuseList from "../components/admin/Reuse/ReuseList";
import ReduceCreate from "../components/admin/Reduce/ReduceCreate";
import ReuseCreate from "../components/admin/Reuse/ReuseCreate";
import ReduceDetail from "../components/admin/Reduce/ReduceDetail";
import DictionaryList from "../components/admin/Dictionary/DictionaryList";
import DictionaryForm from "../components/admin/Dictionary/DictionaryForm";
import ReuseDetail from "../components/admin/Reuse/ReuseDetail";
import DictionaryDetails from "../components/admin/Dictionary/DictionaryDetails";

import RecycleList from "../components/admin/Recycle/RecycleList";
import RecycleCreate from "../components/admin/Recycle/RecycleCreate";

const RoutesLibrarian = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeAdmin />} />

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
      </Routes>
    </>
  );
};

export default RoutesLibrarian;
