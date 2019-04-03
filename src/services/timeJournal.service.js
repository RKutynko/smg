import axios from "axios";

export const loadTime = date =>
  axios
    .get("/api/reporting/", { params: { start: date } })
    .then(response => response.data);
