import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyDetails } from "../../services/apiAuth";
import { toast } from "react-toastify";

const useProvideCompanyDetails = function () {
  const queryClient = useQueryClient();
  const { isPending, mutate: provideCompanyData } = useMutation({
    mutationFn: (companyData) => updateCompanyDetails(companyData),
    onSuccess: (company) => {
      toast.success("Data successfully updated");
      queryClient.setQueryData(["company"], company);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isPending, provideCompanyData };
};

export default useProvideCompanyDetails;
