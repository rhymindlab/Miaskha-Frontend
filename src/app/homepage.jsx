"use client";

import { useState, useEffect } from "react";
import CategoryClient from "../components/Categories/categoryClient";
import { getAllCategories, getAllCollections, getParentChildCategories } from "../lib/api";
import CollectionClient from "../components/Collections/collectionClient";
export default function HomePage() {
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [homeCollections, setHomeCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
      title: "Discover Timeless Elegance",
      subtitle: "Handcrafted diamond jewelry that tells your unique story",
    },
    {
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
      title: "Exquisite Diamond Rings",
      subtitle: "Celebrate life's precious moments with stunning designs",
    },
    {
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
      title: "Luxury Wedding Collection",
      subtitle: "Make your special day unforgettable with our exclusive pieces",
    },
  ];

  useEffect(()=> {
    async function fetchData() {
      const { parentCategories } = await getParentChildCategories();
      
      setCategories(parentCategories);
      console.log(categories)

      const allCollections = await getAllCollections();
      console.log('Colection',allCollections)

      setCollections(allCollections);
    }

  fetchData();

  },[])

  useEffect(() => {
  
  const timer = setInterval(() => {
    setCurrentSlide(
      (prev) => (prev + 1) % slides.length
    );
  }, 3000);

  return () => clearInterval(timer);

}, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
    <div>
      <section className="relative h-screen overflow-hidden">
        <a href="/jewellery">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div>
                  <h1 className="text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-xl text-white">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </a>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
      
      
    </div>
    <h1 className="text-2xl lg:text-4xl pt-5 text-center">Shop by Category</h1>
      <CategoryClient intialCategories={categories} />
    <h1 className="text-2xl lg:text-4xl pt-5 text-center">Shop by Collection</h1>
      <CollectionClient intialCollections={collections} />
    </>
  );
}