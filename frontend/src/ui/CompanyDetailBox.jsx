import Spinner from "./Spinner";

function CompanyDetailBox({ userData, isPending }) {
  // const { isPending, userDataObj } = useGetUserDetails();
  const profile = userData?.profile;
  return (
    <div className="w-[26rem] h-[26rem] bg-blue-50 py-[1.5rem] px-[1.6rem] rounded-xl">
      {isPending ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-[1.8rem]">
          <div className="flex gap-4 items-center">
            <img
              className="w-[15%] rounded-xl"
              src={`http://localhost:5000/company/${profile?.companyLogo}`}
            />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-lg">{profile?.companyName}</p>
              <p className="text-blue-500 font-medium">Visit Our Website</p>
            </div>
          </div>
          <div className="flex flex-col gap-[1.3rem]">
            <div className="flex justify-between">
              <p className="font-medium text-[1.1rem]">Industry :</p>
              <p className="text-gray-600 text-[1rem]">{profile?.industry}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-[1.1rem]">Company Size :</p>
              <p className="text-gray-600 text-[1rem]">{profile?.size}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-[1.1rem]">Founded-In :</p>
              <p className="text-gray-600 text-[1rem]">{profile?.foundedIn}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-[1.1rem]">Location :</p>
              <p className="text-gray-600 text-[1rem]">
                {profile?.companyLocation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDetailBox;
