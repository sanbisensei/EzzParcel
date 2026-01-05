import Banner from "./Banner/Banner";
import BeMerchant from "./BeMerchant/BeMerchant";
import CompanyCollab from "./CompanyCollab/CompanyCollab";
import CustomerReview from "./CustomerReview/CustomerReview";
import FAQ from "./FAQ/FAQ";
import Features from "./Features/Features";
import HowItWorks from "./HowItWorks/HowItWorks";
import OurServices from "./OurServices/OurServices";

const Home = () => {
  return (
    <div>
      <div data-aos="fade-up">
        <Banner></Banner>
      </div>
      <div className="pt-10 max-w-5xl mx-auto">
        <HowItWorks></HowItWorks>
      </div>
      <div className="pt-10 max-w-7xl mx-auto">
        <OurServices></OurServices>
      </div>
      <div className="pt-10 max-w-7xl mx-auto">
        <CompanyCollab></CompanyCollab>
      </div>
      <div className="pt-10 max-w-7xl mx-auto">
        <Features></Features>
      </div>
      <div className="pt-10 max-w-7xl mx-auto">
        <BeMerchant></BeMerchant>
      </div>
      <div className="pt-10 max-w-7xl mx-auto">
        <CustomerReview></CustomerReview>
      </div>
      <div className="pt-10 max-w-5xl mx-auto">
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default Home;
