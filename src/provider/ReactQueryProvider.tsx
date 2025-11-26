import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// React Native में भी React.ReactNode मान्य है

type Prop = {
    children: React.ReactNode;
}

// 1. QueryClient का इंस्टेंस एक ही तरह से बनाया जाता है
const client = new QueryClient({
    // Optional: Native में ज़्यादा aggressive garbage collection के लिए
    // defaultOptions को सेट कर सकते हैं, हालांकि डिफ़ॉल्ट सेटिंग्स अक्सर काम करती हैं।
    defaultOptions: {
        queries: {
            // उदाहरण: अगर विंडो focus में न हो, तो fetch न करें (Web-specific, but useful for app switching)
            // React Native में 'refetchOnWindowFocus' का व्यवहार अलग होता है, 
            // आमतौर पर app state changes के लिए इस्तेमाल होता है।
            refetchOnWindowFocus: true, 
        },
    },
});

function ReactQueryProvider({ children }: Prop) {
    return (
        // 2. QueryClientProvider का उपयोग भी समान है
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;