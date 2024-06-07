import React, { useEffect, useState } from "react";

const TestComponent = () => {
  const [listings, setListings] = useState([]);
  const [collectionData, setCollectionData] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/getNftListings?collectionSlug=pudgypenguins&orderType=0");
        const data = await response.json();
        setListings(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    const fetchCollectionData = async () => {
      try {
        const response = await fetch("/api/getNftCollection?collectionSlug=pudgypenguins");
        const data = await response.json();
        setCollectionData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching collection data:", error);
      }
    };

    fetchListings();
    fetchCollectionData();
  }, []);

  return (
    <div>
      <h1 className="absolute top-72">Fetching NFT Collection Listings and metadata...</h1>
      {/* Add any UI elements or components if needed */}
    </div>
  );
};

export default TestComponent;
