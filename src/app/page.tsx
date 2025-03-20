"use client";

import Nav from "@/components/nav/Nav";
import Collection from "@/components/collection/Collection";
import { useState } from "react";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={`bg-dark-bg min-h-screen flex flex-col`}>
      <Nav onSearchSubmit={handleSearchSubmit} />
      <Collection searchQuery={searchQuery} />
    </div>
  );
}
