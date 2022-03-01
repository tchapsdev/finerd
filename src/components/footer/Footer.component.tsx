import React from 'react';
import styles from './Footer.module.scss';

const {
  footer
} = styles;

export default function Footer(): JSX.Element {
  return (
    <footer className={ footer }>
      <p>© Finerd</p>
      <p>
        View source code on{ ' ' }
        <a
          href="https://github.com/tchapsdev/finerd"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
