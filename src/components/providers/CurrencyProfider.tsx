"use client";

import { createContext, useContext } from "react";

const CurrencyContext = createContext<string>("KSh");

export function CurrencyProvider({
  children,
  currency,
}: {
  children: React.ReactNode;
  currency: string;
}) {
  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): string {
  return useContext(CurrencyContext);
}
