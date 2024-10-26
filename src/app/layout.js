import AppProvider from "./Provider";
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
