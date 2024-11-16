import { useQuery } from "@tanstack/react-query";

import {
  GET_AUTHORS,
  GET_BANNERS,
  GET_CATEGORIES,
  GET_CATEGORIES_HOME,
  GET_DISCOUNT_BOOKS,
  GET_FEATURE_CATEGORY,
  GET_FOR_YOU,
  GET_PUBLICATIONS,
  GET_RECENTLY_ADDED,
  GET_RELATED_BOOKS,
  GET_SUB_CATEGORIES,
  GET_TRENDING_BOOKS,
} from "../action";

export const useGetAuthors = () => {
  return useQuery({
    queryKey: ["authors-for-navbar"],
    queryFn: async () => await GET_AUTHORS(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories-for-navbar"],
    queryFn: async () => await GET_CATEGORIES(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetPublications = () => {
  return useQuery({
    queryKey: ["publications-for-navbar"],
    queryFn: async () => await GET_PUBLICATIONS(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetSubCategories = (categoryId: string) => {
  return useQuery({
    queryKey: ["sub-categories-for-navbar"],
    queryFn: async () => await GET_SUB_CATEGORIES(categoryId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetCategoriesHome = () => {
  return useQuery({
    queryKey: ["categories-for-home"],
    queryFn: async () => await GET_CATEGORIES_HOME(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetRelatedBooks = (
  categoryId: string,
  subCategoryId: string | null,
) => {
  return useQuery({
    queryKey: ["related-books"],
    queryFn: async () => await GET_RELATED_BOOKS(categoryId, subCategoryId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetTrendingBooks = () => {
  return useQuery({
    queryKey: ["trending-books"],
    queryFn: async () => await GET_TRENDING_BOOKS(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetForYou = () => {
  return useQuery({
    queryKey: ["for-you"],
    queryFn: async () => await GET_FOR_YOU(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetDiscountBooks = () => {
  return useQuery({
    queryKey: ["discount-books"],
    queryFn: async () => await GET_DISCOUNT_BOOKS(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetRecentlyAdded = () => {
  return useQuery({
    queryKey: ["recently-added"],
    queryFn: async () => await GET_RECENTLY_ADDED(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetFeatureCategory = () => {
  return useQuery({
    queryKey: ["feature-category"],
    queryFn: async () => await GET_FEATURE_CATEGORY(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => await GET_BANNERS(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
