import Navbar from './navbar'
import Footer from './footer'
import ScrollToTopButton from './scrollToTopButton'
import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
