import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import react from "react";

function ToastShelf({ messages = [] }) {
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
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
