"use client";
import useSWR from "swr";

const DISCORD_ID = "310523792239624193"; // Seu ID aqui

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useLanyard = () => {
  const { data, error } = useSWR(
    `https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
    fetcher,
    {
      refreshInterval: 5000, // Atualiza a cada 5 segundos
    }
  );

  return {
    data: data?.data,
    isLoading: !data && !error,
    isError: error,
  };
};