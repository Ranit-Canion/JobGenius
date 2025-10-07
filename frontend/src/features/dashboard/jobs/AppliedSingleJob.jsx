import {
  BriefcaseIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { getFormattedExpDate } from "../../../utils/DateService";
import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import DeleteConfirmation from "../../../ui/DeleteConfirmation";
import { useDeleteAppliedJob } from "./useDeleteAppliedJob";

function AppliedSingleJob({ appliedJob }) {
  useEffect(function () {
    Aos.init();
  }, []);
  const { deleteAppliedJob } = useDeleteAppliedJob();
  const { post, application, createdAt } = appliedJob;
  const appliedDate = getFormattedExpDate(createdAt);
  if (!post) return;
  const { title, location } = post;
  return (
    <div className="p-4 flex flex-col border-b-1 border-gray-300">
      <div className="grid grid-cols-[5fr_1fr_1fr_1fr] gap-4 px-4 py-3 ">
        <div className="flex ">
          <div className="w-[3rem]">
            <img src="/com1.jpg" alt="" className="rounded-lg" />
          </div>
          <div className="flex gap-1.5 ml-[2rem]  flex-col ">
            <h1 className="text-xl font-medium">{title}</h1>
            <div className="flex gap-2 w-[20%]">
              <div className="flex gap-1 items-center justify-center text-gray-500">
                <BriefcaseIcon className="w-[1.2rem]" />
                <p>{post?.companyName}</p>
              </div>
              <div className="flex gap-1 items-center justify-center text-gray-500">
                <MapPinIcon className="w-[1.2rem]" />
                <p>{location}</p>
              </div>
            </div>
          </div>
        </div>
        <div>{appliedDate}</div>
        <div className="text-green-500 text-[0.9rem] font-semibold bg-green-50 uppercase w-fit h-fit py-1 px-2 rounded-full">
          {application?.status}
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-3 mb-[2.2rem] ml-[1rem]">
            <Modal>
              <Menus>
                <Menus.Toggle id={appliedJob?._id} />
                <Menus.List id={appliedJob?._id}>
                  <Menus.Button icon={<PencilIcon />}>Udpate</Menus.Button>
                  <Modal.Open opens="delete-appliedjob">
                    <Menus.Button icon={<TrashIcon />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>
                {/* <Modal.Open opens="delete-post">
                  <TrashIcon className="w-[2rem] cursor-pointer bg-blue-100 text-blue-500 py-2 px-2 rounded-xl hover:bg-blue-500 hover:text-gray-50 duration-300" />
                </Modal.Open> */}
                <Modal.Window name="delete-appliedjob">
                  <DeleteConfirmation
                    onConfirmed={() => deleteAppliedJob(appliedJob?._id)}
                    resourceName="appliedjob"
                  />
                </Modal.Window>
              </Menus>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppliedSingleJob;
