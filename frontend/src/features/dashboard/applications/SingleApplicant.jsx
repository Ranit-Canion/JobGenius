import {
  BanknotesIcon,
  BriefcaseIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  MapIcon,
  MapPinIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useDeleteApplication from "./useDeleteApplication";
import useUpdateApplicationStatus from "./useUpdateApplicationStatus";
import ToolTip from "../../../ui/ToolTip";
import { Link } from "react-router-dom";
function SingleApplicant({ application }) {
  const { user, resume } = application;
  const { deleteApplication } = useDeleteApplication();
  const { updateStatus } = useUpdateApplicationStatus();
  return (
    <div className="flex justify-between items-center border-2 border-gray-200 rounded-2xl">
      <div>
        <div className="flex py-[1.8rem] px-[2rem]  rounded-2xl">
          <div className="w-[5rem]">
            <img
              src={`http://localhost:5000/user/${user?.photo}`}
              alt=""
              className="rounded-full"
            />
          </div>
          <div className="flex gap-1.5 ml-[2rem]  flex-col ">
            <h1 className="text-xl font-medium">{user?.name}</h1>
            <div className="flex gap-2 w-[20%]">
              <div className="flex gap-1 items-center justify-center text-gray-500">
                <BriefcaseIcon className="w-[0.9rem]" />
                <p>Atlassian</p>
              </div>
              <div className="flex gap-1 items-center justify-center text-gray-500">
                <MapPinIcon className="w-[0.9rem]" />
                <p>mao</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-blue-100 text-blue-400">
                mao
              </p>
              <p className="py-1 px-3 font-semibold w-fit text-[0.9rem] rounded-full bg-green-100 text-green-600">
                {application?.status}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[1rem] transition-all flex gap-2">
        <ToolTip textInfo={"View Application"}>
          <Link state={{ resume }} to={`/allapplicants/${user?._id}`}>
            <EyeIcon className="w-[2rem]  cursor-pointer bg-blue-100 text-blue-500 py-2 px-2 rounded-xl hover:bg-blue-500 hover:text-gray-50 duration-300" />
          </Link>
        </ToolTip>
        <ToolTip textInfo={"Delete Application"}>
          <XMarkIcon
            onClick={() =>
              updateStatus({ id: application?._id, status: "rejected" })
            }
            className="w-[2rem] cursor-pointer bg-blue-100 text-blue-500 py-2 px-2 rounded-xl hover:bg-blue-500 hover:text-gray-50 duration-300"
          />
        </ToolTip>
        <ToolTip textInfo={"Shortlist Application"}>
          <CheckIcon
            onClick={() =>
              updateStatus({ id: application?._id, status: "shortlisted" })
            }
            className="w-[2rem] cursor-pointer bg-blue-100 text-blue-500 py-2 px-2 rounded-xl hover:bg-blue-500 hover:text-gray-50 duration-300"
          />
        </ToolTip>
        <ToolTip textInfo={"Delete Application"}>
          <TrashIcon
            onClick={() => deleteApplication(application?._id)}
            className="w-[2rem] cursor-pointer bg-blue-100 text-blue-500 py-2 px-2 rounded-xl hover:bg-blue-500 hover:text-gray-50 duration-300"
          />
        </ToolTip>
      </div>
    </div>
  );
}

export default SingleApplicant;
