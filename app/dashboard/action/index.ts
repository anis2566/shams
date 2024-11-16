"use server";

import { db } from "@/lib/prisma";
import { Month, OrderStatus } from "@prisma/client";

const createDateFilter = (start: Date, end: Date) => ({
  createdAt: {
    gte: start,
    lt: end,
  },
});

// Helper to format the week dates
const getWeekBounds = (date: Date) => {
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  return { weekStart, weekEnd };
};

export const GET_DASHBOARD_DATA = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { weekStart, weekEnd } = getWeekBounds(today);

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  monthEnd.setHours(23, 59, 59, 999);

  const todayFilter = createDateFilter(today, tomorrow);
  const weekFilter = createDateFilter(weekStart, weekEnd);
  const monthFilter = createDateFilter(monthStart, monthEnd);

  const [
    todayOrder,
    weekOrder,
    monthOrder,
    pendingOrder,
    returnedOrder,
    deliveredOrder,
    recentOrders,
  ] = await Promise.all([
    db.order.aggregate({
      where: todayFilter,
      _sum: {
        totalPaidAmount: true,
      },
    }),
    db.order.aggregate({
      where: weekFilter,
      _sum: {
        totalPaidAmount: true,
      },
    }),
    db.order.aggregate({
      where: monthFilter,
      _sum: {
        totalPaidAmount: true,
      },
    }),
    db.order.count({ where: { status: OrderStatus.Pending, ...todayFilter } }),
    db.order.count({ where: { status: OrderStatus.Returned, ...todayFilter } }),
    db.order.count({
      where: { status: OrderStatus.Delivered, ...todayFilter },
    }),
    db.order.findMany({
      where: {},
      include: {
        user: true,
        orderItems: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    todayOrder: todayOrder._sum.totalPaidAmount || 0,
    weekOrder: weekOrder._sum.totalPaidAmount || 0,
    monthOrder: monthOrder._sum.totalPaidAmount || 0,
    pendingOrder,
    returnedOrder,
    deliveredOrder,
    recentOrders,
  };
};
