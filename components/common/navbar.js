import { FaCocktail } from 'react-icons/fa'
import styles from '../styles/Layout.module.css'

export default function Navbar() {
  return (
    <navbar className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <span className={styles.logo}>
          <FaCocktail size={32} />
        </span>
        <span>Whispering Corner</span>
      </div>
      <div className={styles.navbarRight}>
        <span>我的酒吧</span>
        <span>登入</span>
        <span>註冊</span>
      </div>
    </navbar>
  )
}
