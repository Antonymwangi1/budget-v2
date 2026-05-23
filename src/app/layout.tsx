import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Budget V2",
  description: "Personal budget tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#d79921",
          colorBackground: "#282828",
          colorInputBackground: "#3c3836",
          colorInputText: "#ebdbb2",
          colorText: "#ebdbb2",
          colorTextSecondary: "#a89984",
          colorNeutral: "#665c54",
          colorDanger: "#fb4934",
          colorSuccess: "#b8bb26",
          borderRadius: "0.5rem",
          fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
          fontWeight: {
            normal: 400,
            medium: 500,
            bold: 500,
          },
        },
        elements: {
          card: {
            background: "#282828",
            border: "0.5px solid rgba(168,153,132,0.15)",
            boxShadow: "none",
          },
          headerTitle: {
            color: "#ebdbb2",
            fontSize: "18px",
            fontWeight: "500",
          },
          headerSubtitle: {
            color: "#a89984",
          },
          socialButtonsBlockButton: {
            background: "#3c3836",
            border: "0.5px solid rgba(168,153,132,0.15)",
            color: "#ebdbb2",
            "&:hover": {
              background: "#504945",
            },
          },
          socialButtonsBlockButtonText: {
            color: "#ebdbb2",
            fontWeight: "500",
          },
          dividerLine: {
            background: "rgba(168,153,132,0.15)",
          },
          dividerText: {
            color: "#665c54",
          },
          formFieldLabel: {
            color: "#a89984",
            fontSize: "12px",
            fontWeight: "500",
          },
          formFieldInput: {
            background: "#3c3836",
            border: "0.5px solid rgba(168,153,132,0.2)",
            color: "#ebdbb2",
            fontSize: "14px",
            "&:focus": {
              border: "0.5px solid #d79921",
              boxShadow: "none",
            },
            "&::placeholder": {
              color: "#665c54",
            },
          },
          formButtonPrimary: {
            background: "#d79921",
            color: "#1d2021",
            fontWeight: "500",
            fontSize: "14px",
            boxShadow: "none",
            "&:hover": {
              background: "#fabd2f",
            },
          },
          footerActionLink: {
            color: "#d79921",
            "&:hover": {
              color: "#fabd2f",
            },
          },
          footerActionText: {
            color: "#a89984",
          },
          identityPreviewText: {
            color: "#ebdbb2",
          },
          identityPreviewEditButton: {
            color: "#d79921",
          },
          formFieldInputShowPasswordButton: {
            color: "#a89984",
          },
          alertText: {
            color: "#ebdbb2",
          },
          formResendCodeLink: {
            color: "#d79921",
          },
          otpCodeFieldInput: {
            background: "#3c3836",
            border: "0.5px solid rgba(168,153,132,0.2)",
            color: "#ebdbb2",
          },
        },
      }}
    >
      <html lang="en" data-theme="light" suppressHydrationWarning>
        <body
          className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
