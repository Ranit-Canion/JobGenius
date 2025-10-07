import {
  BriefcaseIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../../ui/Modal";
import DeleteConfirmation from "../../../ui/DeleteConfirmation";
import useDeleteJobPost from "../jobs/useDeleteJobPost";
import Menus from "../../../ui/Menus";
import { getFormattedExpDate } from "../../../utils/DateService";
import { Link } from "react-router-dom";
import { EyeIcon } from "lucide-react";
function ManageJobSingle({ postedjob }) {
  const { title, location, totalApplicants, isExpired, _id, createdAt } =
    postedjob;
  const formattedDate = getFormattedExpDate(createdAt);

  const { isPending, deleteJobPost } = useDeleteJobPost();

  return (
    <div className="p-4 flex flex-col border-b-1 border-gray-300">
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-4 py-3 ">
        <div className="flex ">
          <div className="w-[3rem]">
            <img src="/com1.jpg" alt="" className="rounded-lg" />
          </div>
          <div className="flex gap-1.5 ml-[2rem]  flex-col ">
            <h1 className="text-xl font-medium">{title}</h1>
            <div className="flex gap-2 w-[20%]">
              <div className="flex gap-1 items-center justify-center text-gray-500">
                <BriefcaseIcon className="w-[0.9rem]" />
                <p>Atlassian</p>
              </div>
              <div className="flex gap-1 items-center justify-center text-gray-500">
                <MapPinIcon className="w-[0.9rem]" />
                <p>{location}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center w-1/2 underline text-lg text-blue-500 font-semibold">
          {totalApplicants}+ Applied
        </div>
        <div className="w-[85%] text-center">{formattedDate}</div>
        <div className="flex gap-4 items-center ">
          <p
            className={` text-[0.8rem] text-center w-[54%] font-semibold  uppercase  h-fit py-1 px-2 rounded-full ${
              !isExpired
                ? "text-green-700 bg-green-100"
                : "bg-red-300 text-red-700"
            }`}
          >
            {" "}
            {isExpired ? "In-Active" : "Active"}
          </p>
          <div className="flex gap-3">
            <Modal>
              <Menus>
                <Menus.Toggle id={_id} />
                <Menus.List id={_id}>
                  <Link to={`/dashboard/editjob/${_id}`}>
                    <Menus.Button icon={<PencilIcon />}>View</Menus.Button>
                  </Link>
                  <Modal.Open opens="delete-post">
                    <Menus.Button icon={<TrashIcon />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>
                {/* <Modal.Open opens="delete-post">
                  <TrashIcon className="w-[2rem] cursor-pointer bg-blue-100 text-blue-500 py-2 px-2 rounded-xl hover:bg-blue-500 hover:text-gray-50 duration-300" />
                </Modal.Open> */}
                <Modal.Window name="delete-post">
                  <DeleteConfirmation
                    onConfirmed={() => deleteJobPost(_id)}
                    resourceName="post"
                  />
                </Modal.Window>
              </Menus>
            </Modal>
            {/* <PencilIcon className="w-[2rem] cursor-pointer bg-blue-100 text-blue-500 py-2 px-2 rounded-xl hover:bg-blue-500 hover:text-gray-50 duration-300" /> */}

            {/* <div className="flex items-center justify-end">
              <Menus>
                <Menus.Toggle id={_id} />
                <Menus.List id={_id}>
                  <Menus.Button icon={<PencilIcon />}>Udpate</Menus.Button>
                  <Menus.Button icon={<TrashIcon />}>Delete</Menus.Button>
                </Menus.List>
              </Menus>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageJobSingle;
