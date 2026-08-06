"use client";

import { useState, useEffect } from "react";
import CategoryClient from "../components/Categories/categoryClient";
import { getAllCategories, getAllCollections, getParentChildCategories } from "../lib/api";
import CollectionClient from "../components/Collections/collectionClient";
import Hero from "../components/home/Hero/Hero";
import FeaturedCollections from "../components/home/FeaturedCollections/FeaturedCollections";
import CategorySection from "../components/home/Categories/CategorySection";
import LuxuryBanner from "../components/home/LuxuryBanner/LuxuryBanner";
import SignatureProducts from "../components/home/SignatureProducts/SignatureProducts";
import WhyChooseMiashka from "../components/home/WhyChooseMiashka/WhyChooseMiashka";
import CustomerTestimonials from "../components/home/CustomerTestimonials/CustomerTestimonials";
import InstagramGallery from "../components/home/Instagram/Instagram";
import Newsletter from "../components/home/Newsletter/Newsletter";
import SEO from "../components/SEO/SEO";
export default function HomePage() {

  return (
    <>
    <SEO
        title="Diamond Jewellery"
        description="Discover beautifully crafted diamond and gold jewellery at Miashka."
      />
    <Hero />
    <FeaturedCollections />
    <CategorySection />
    <LuxuryBanner />
    <SignatureProducts />
    <WhyChooseMiashka />
    <CustomerTestimonials />
    <InstagramGallery />
    <Newsletter />
    </>
  );
}