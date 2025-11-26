import { z } from "zod";
// सुनिश्चित करें कि formSchema का पथ (path) React Native प्रोजेक्ट में सही हो
import { formSchema } from "./validation"; 

// 1. FormData: Zod schema से पूरे फॉर्म डेटा का टाइप derive करना।
// यह React Native में पूरी तरह से काम करता है।
export type FormData = z.infer<typeof formSchema>

// 2. FormField: FormData ऑब्जेक्ट की keys (फ़ील्ड नामों) का टाइप derive करना।
// यह भी React Native में पूरी तरह से काम करता है।
export type FormField = keyof FormData