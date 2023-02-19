import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layouts";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--inter-font",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const fonts = {
  heading: "var(--inter-font)",
  body: "var(--inter-font)",
};

const theme = extendTheme({ fonts });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </ChakraProvider>
    </div>
  );
}
