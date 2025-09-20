import {useMemo} from "react";
import {Bus, DashboardStats} from "@/types";

export const useDashboardStats = (buses: Bus[]): DashboardStats => {
    return useMemo(() => ({
        totalBuses: buses.length,
        activeBuses: buses.filter(bus => bus.active).length,
        inactiveBuses: buses.filter(bus => !bus.active).length,
        brands: new Set(buses.map(bus => bus.busBrand.name)).size,
    }), [buses]);
};