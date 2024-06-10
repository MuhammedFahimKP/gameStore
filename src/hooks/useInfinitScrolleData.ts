import { useEffect, useState, useRef } from "react";
import apiClient from "../services/api-client";
import { AxiosError, AxiosRequestConfig } from "axios";
import { FetchPaginatedResponse } from "../types";

class ApiClientError extends AxiosError {}

export default function useInfinitScrolleData<T>(
  url: string,
  limit: number,
  delay: number,
  requestConfiq?: AxiosRequestConfig
) {
  const [data, setData] = useState<T[] | []>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [filters, setFilters] = useState<AxiosRequestConfig["params"] | {}>({});

  const updateFilters = (filters: AxiosRequestConfig["params"]) => {
    setPage(1), setData([]);
    setFilters(filters);
  };

  const elementRef = useRef(null);

  function onInterSection(entries: any) {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems(url);
    }
  }

  async function fetchMoreItems(endpoint: string) {
    setLoading(true);
    let reqConfig = {};
    const params = { page: page, page_size: limit };

    if (requestConfiq?.params) {
      reqConfig = {
        ...reqConfig,
        params: { ...params, filters },
      };
    }
    await setTimeout(async () => {
      try {
        const res = await apiClient.get<FetchPaginatedResponse<T>>(
          endpoint + `?page=${page}&page_size${limit}`,
          {
            ...requestConfiq,
          }
        );

        setLoading(false);

        if (res.data.results.length == 0) {
          setHasMore(false);
        } else {
          setLoading(false);

          setData((prevData) => [...prevData, ...res.data.results]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (err) {
        setLoading(false);
        if (err instanceof ApiClientError) {
          setError(err.message);
        }
      }
    }, delay);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onInterSection);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [data, filters]);

  return { error, loading, elementRef, data, updateFilters };
}
