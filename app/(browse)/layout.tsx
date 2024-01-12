import Navbar from "./_components/navbar";

const BrowserLayout = ({ Children }: { Children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{Children}</div>
    </>
  );
};

export default BrowserLayout;
