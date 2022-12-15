import { useLocation, useNavigate } from "react-router-dom";

export const useQueryFilter = (filters?: any) => {
  const query = new URLSearchParams();
  return query;
};
