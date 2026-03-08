import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../sections/Hero";
import Categories from "../sections/Categories";
import FeaturedProducts from "../sections/FeaturedProducts";
import BestSellers from "../sections/BestSellers";
import Reviews from "../sections/Reviews";
import Newsletter from "../sections/Newsletter";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Categories />

      <FeaturedProducts />

      <BestSellers />

      <Reviews />

      <Newsletter />

      <Footer />
    </>
  );
}

export default Home;