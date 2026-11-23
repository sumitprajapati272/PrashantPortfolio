import { useEffect, useState } from "react";
import { fetchPortfolio } from "../services/api.js";

export default function usePortfolio() {
  const [state, setState] = useState({ data: null, error: "", loading: true });

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolio()
      .then((data) => setState({ data, error: "", loading: false }))
      .catch((error) => {
        if (!controller.signal.aborted) setState({ data: null, error: error.message, loading: false });
      });
    return () => controller.abort();
  }, []);

  return state;
}
