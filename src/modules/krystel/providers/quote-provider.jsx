import { createContext, useContext } from 'react';

const QuoteContext = createContext(null);

export const useQuote = () => {
    return useContext(QuoteContext);
};

export default function QuoteProvider({ quote, children }) {
    return <QuoteContext.Provider value={quote}>{children}</QuoteContext.Provider>;
}
