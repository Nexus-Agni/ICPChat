import { Navbar } from '@/Components';
import { ChatAppProvider } from '@/Context/ChatContext';
import '@/styles/globals.css'

const App = ({ Component, pageProps }) => (
  <>
    <ChatAppProvider>
      <Navbar />
      <Component {...pageProps} />
    </ChatAppProvider>
  </>
)

export default App;