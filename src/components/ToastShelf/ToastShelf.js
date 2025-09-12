import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ messages = [] }) {
  return (
    <ol className={styles.wrapper}>
      {messages.map((message) => (
        <li className={styles.toastWrapper} key={message.id}>
          <Toast variant={message.variant} closeModal={message.closeModal}>
            {message.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
