import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return initialProps
    }

    render() {
        return (
            <Html>
                <Head />

                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Overpass:wght@300;400&family=Poppins&family=Rubik+Dirt&family=Secular+One&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest"></link>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
