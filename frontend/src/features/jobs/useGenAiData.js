import { useMutation } from "@tanstack/react-query";
import { generateDescription } from "../../services/apiJobPosts";
import { toast } from "react-toastify";

const useGenAiData = function () {
  const { isPending, mutate: getGenAiData } = useMutation({
    mutationFn: (genAiObj) => generateDescription(genAiObj),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, getGenAiData };
};
export default useGenAiData;
