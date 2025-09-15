import React from "react";
import useEscapeKey from "../../hooks/UseKey";

const ToastContext = React.createContext({
  messages: [],
  setMessages: () => {},
  addMessage: () => {},
  closeToast: () => {},
});

export function ToastProvider({ children }) {
  const [messages, setMessages] = React.useState([]);

  const callback = React.useCallback(() => {
    setMessages([]);
  }, []);

  useEscapeKey(callback);

  const closeToast = (id) => {
    const existingMessages = [...messages];
    const filteredMessages = existingMessages.filter(
      (message) => message.id !== id
    );
    setMessages(filteredMessages);
  };

  const addMessage = (message) => {
    const existingMessages = [...messages];
    existingMessages.push(message);
    setMessages(existingMessages);
  };

  const messagesWithCloseModal = messages.map((message) => {
    return { ...message, closeModal: () => closeToast(message.id) };
  });

  const contextValue = {
    messages: messagesWithCloseModal,
    setMessages,
    addMessage,
    closeToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastContext;
