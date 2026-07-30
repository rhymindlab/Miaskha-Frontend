import React, { Suspense, useEffect, useState } from "react";

import CollectionClient from "../../components/Collections/collectionClient";
import BreadCrumbs from "../../components/breadcrumbs";
import SEO from "../../components/SEO/SEO";

import { getAllCollections } from "../../lib/api";

export default function CollectionPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await getAllCollections();

        setCollections(data);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return (
    <>
      <SEO
        title="Jewellery Collections"
        description="Explore Miashka jewellery collections featuring beautifully crafted diamond and gold jewellery designed for every occasion."
        url="https://www.miashka.com/collections"
        type="website"
      />

      <div className="lg:pl-10 pl-[22px] pt-2">
        <BreadCrumbs />
      </div>

      <main>
        <h1 className="text-4xl text-center p-2">
          Our Collections
        </h1>

        {loading ? (
          <div className="py-6 text-center">
            Loading collections...
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="py-6 text-center">
                Loading collections...
              </div>
            }
          >
            <CollectionClient intialCollections={collections} />
          </Suspense>
        )}
      </main>
    </>
  );
}