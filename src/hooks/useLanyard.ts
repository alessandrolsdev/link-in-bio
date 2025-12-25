"use client";
import useSWR from "swr";

const DISCORD_ID = "310523792239624193";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Hook para buscar dados do Discord via Lanyard API.
 * 
 * Lanyard é um serviço WebSocket/REST que proxyia o status do Discord.
 * Utiliza SWR para data fetching com revalidação automática.
 * 
 * @returns {Object} { data, isLoading, isError }
 */
export const useLanyard = () => {
  const { data, error } = useSWR(
    `https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
    fetcher,
    {
      refreshInterval: 5000, // Polling a cada 5 segundos para atualizar status
    }
  );

  return {
    data: data?.data,
    isLoading: !data && !error,
    isError: error,
  };
};