import { useMutation } from "@tanstack/react-query";
import { generateApplicantAbout as generateApplicantAboutApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export const useGetApplicantAboutByAI = function () {
  const { isPending, mutate: generateApplicantAbout } = useMutation({
    mutationFn: (applicantData) => generateApplicantAboutApi(applicantData),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, generateApplicantAbout };
};
