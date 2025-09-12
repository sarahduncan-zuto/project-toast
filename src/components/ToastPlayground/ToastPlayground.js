import React from "react";
import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [messages, setMessages] = React.useState([]);

  const handleVariantChange = (e) => {
    setVariant(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const existingMessages = [...messages];
    const newMessage = {
      id: crypto.randomUUID(),
      message: message,
      variant: variant,
    };
    existingMessages.push(newMessage);
    setMessages(existingMessages);
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  };

  const closeToast = (id) => {
    const existingMessages = [...messages];
    const filteredMessages = existingMessages.filter(
      (message) => message.id !== id
    );
    setMessages(filteredMessages);
  };

  const messagesWithCloseModal = messages.map((message) => {
    return { ...message, closeModal: () => closeToast(message.id) };
  });

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <form
        onSubmit={(e) => handleSubmitMessage(e)}
        className={styles.controlsWrapper}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => handleMessageChange(e)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={variant === option}
                  onChange={(e) => handleVariantChange(e)}
                  key={option}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
      <ToastShelf messages={messagesWithCloseModal} />
    </div>
  );
}

export default ToastPlayground;
