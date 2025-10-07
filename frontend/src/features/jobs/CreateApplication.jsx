import Modal from "../../ui/Modal";
import ApplicationModal from "./ApplicationModal";

function CreateApplication({ jobpost }) {
  return (
    <Modal>
      <Modal.Open opens="create-application">
        <button className="px-8 py-3 cursor-pointer bg-blue-500 text-lg font-medium rounded-lg text-gray-50">
          Apply For Job
        </button>
      </Modal.Open>
      <Modal.Window name="create-application">
        <ApplicationModal jobpost={jobpost} />
      </Modal.Window>
    </Modal>
  );
}

export default CreateApplication;
