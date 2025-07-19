'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/styles/components/navbar.module.scss';

export function Navbar() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setUserId(parsedUser.id);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserId(null);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbar__brand}>
        NostalgiaMap
      </Link>

      <ul className={styles.navbar__list}>
        <li className={styles.navbar__item}>
          <Link href="/" className={styles.navbar__link}>
            Home
          </Link>
        </li>
        {userId ? (
          <>
            <li className={styles.navbar__item}>
              <Link href={`/profile/${userId}`} className={styles.navbar__link}>
                Profile
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <button onClick={handleLogout} className={styles.navbar__link}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className={styles.navbar__item}>
            <Link href="/login" className={styles.navbar__link}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
