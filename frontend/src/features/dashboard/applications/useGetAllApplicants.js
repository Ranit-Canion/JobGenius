import { useQuery } from "@tanstack/react-query";
import { getAllApplicants } from "../../../services/apiApplication";
import { useSearchParams } from "react-router-dom";

const useGetAllApplicants = function () {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const pageQuery = `page=${page}&limit=6`;

  const { isPending, data } = useQuery({
    queryKey: ["applications", page],
    queryFn: () => getAllApplicants(pageQuery),
  });
  console.log("data->", data);

  return { isPending, data };
};

export default useGetAllApplicants;
