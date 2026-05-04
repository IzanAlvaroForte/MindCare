import Header from '../components/Layout/Header';

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      
      <main className="relative flex-1">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img src="/PICS/pictures/2nd_page_BG.png" 
            alt="Background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-10 flex h-full p-12 flex-col gap-12">
          <div className="flex gap-12 items-center w-full justify-around">
            <div className="flex items-center gap-4 bg-secondary/80 p-6 rounded-lg">
              <p className="text-xl font-bold text-white">
                Got an invitation code? <br />
                <span className="text-lg font-light">Enter your code manually</span>
              </p>
              <img src="/PICS/pictures/home_page_1.png" alt="Invitation" className="h-18" />
            </div>
            <div className="flex items-center gap-4 bg-secondary/80 p-4 rounded-lg">
              <p className="text-xl font-bold text-white">
                Need a Doctor <br />
                <span className="text-lg font-light">Find a right one for you</span>
              </p>
              <img src="/PICS/pictures/home_page_2.png" alt="Doctor" className="h-24" />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-xl font-bold text-start">EXPLORE</p>
            <div className="flex w-full p-2 justify-between gap-4 bg-white rounded-lg">
              <p className="text-2xl text-red-500">
                Follow <br />
                <span className="text-black">Booking Instructions</span>
              </p>
              <img src="/PICS/pictures/home_page_1.png" alt="Session" className="h-28" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;