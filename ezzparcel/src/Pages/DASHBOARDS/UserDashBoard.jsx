const UserDashBoard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      {/* Single Welcome Card */}
      <div className="bg-blue-400 border-4 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-4">
          Welcome User
        </h1>
        <p className="text-lg font-bold">Your parcel management dashboard</p>
      </div>
    </div>
  );
};

export default UserDashBoard;
