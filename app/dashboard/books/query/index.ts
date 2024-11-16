import { useQueries, useQuery } from "@tanstack/react-query";
import {
  GET_AUTHORS_FOR_BOOKS_ACTION,
  GET_CATEGORIES_FOR_BOOKS_ACTION,
  GET_PUBLISHERS_FOR_BOOKS_ACTION,
  GET_SUB_CATEGORIES_FOR_BOOKS_ACTION,
} from "../action";

export const useGetAuthorsForBooksQuery = (search?: string) => {
  return useQuery({
    queryKey: ["authors-for-books", search],
    queryFn: async () => await GET_AUTHORS_FOR_BOOKS_ACTION(search),
  });
};

export const useGetCategoriesForBooksQuery = (search?: string) => {
  return useQuery({
    queryKey: ["categories-for-books", search],
    queryFn: async () => await GET_CATEGORIES_FOR_BOOKS_ACTION(search),
  });
};

export const useGetSubCategoriesForBooksQuery = (
  categoryId: string | undefined,
  search?: string,
) => {
  return useQuery({
    queryKey: ["sub-categories-for-books", categoryId, search],
    queryFn: async () =>
      await GET_SUB_CATEGORIES_FOR_BOOKS_ACTION({ categoryId, search }),
    enabled: !!categoryId,
  });
};

export const useGetPublishersForBooksQuery = (search?: string) => {
  return useQuery({
    queryKey: ["publishers-for-books", search],
    queryFn: async () => await GET_PUBLISHERS_FOR_BOOKS_ACTION(search),
  });
};
