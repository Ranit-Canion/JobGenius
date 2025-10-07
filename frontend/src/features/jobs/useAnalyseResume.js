import { useMutation } from "@tanstack/react-query";
import { analyzeResume as analyzeResumeApi } from "../../services/apiJobPosts";
import { toast } from "react-toastify";

export const useAnalyseResume = function () {
  const { isPending, mutate: analyzeResume } = useMutation({
    mutationFn: (fileData) => analyzeResumeApi(fileData),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, analyzeResume };
};
