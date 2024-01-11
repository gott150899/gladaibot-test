import Banner from './components/Banner/index';
import Companies from './components/Companies/index';
import Work from './components/Work/index';
import Table from './components/Table/index';
import Features from './components/Features/index';
import Simple from './components/Simple/index';
import Trade from './components/Trade/index';
import Faq from './components/Faq/index';
import ListDiff from './components/ListDiff';
import WhyChooseUs from './components/WhyChooseUs';
import TimeLine from './components/TimeLine';
import Commission from './components/Commission';
import TraderComission from './components/TraderComission';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Companies />
        <Work />
        <ListDiff />
        <WhyChooseUs />
        <TimeLine />
        <Commission />
        <TraderComission />
        {/* <Table />
        <Features />
        <Simple />
        <Trade />
        <Faq /> */}
      </main>
      <Footer />
    </>
  )
}
