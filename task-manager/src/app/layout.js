import AppProvider from "./Provider";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
