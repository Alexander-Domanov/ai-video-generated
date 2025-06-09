import type {Metadata} from "next";
import {Audiowide} from 'next/font/google'
import "./globals.css";
import TopNav from "@/app/components/nav/top-nav";
import {ThemeProvider} from "@/app/components/theme/theme-provider";
import {ClerkProvider} from "@clerk/nextjs";



const audiowide = Audiowide({
    variable: "--font-audiowide",
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ai Based Short Video Generated",
    description: "AI-powered short video generator based on text prompts.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className={audiowide.className} suppressHydrationWarning>
            <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <TopNav/>
                {children}
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>

    );
}
