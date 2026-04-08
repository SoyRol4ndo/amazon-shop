import { getDeals } from "../store/getDeals";

export const fetchGetDeals = async (count: number) => { 

  try {
    const data = await getDeals(count);
    return { products: data, errorMsg: null };
  } catch (error) {
    return {
      products: [],
      errorMsg:
        error instanceof Error
          ? error.message
          : "No se pudieron cargar las ofertas.",
    };
  }
};