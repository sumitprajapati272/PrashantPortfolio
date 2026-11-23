import { useEffect, useRef, useState } from "react";
import { Bot, Check, ChevronDown, MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";
import { answerPortfolioQuestion, SUGGESTED_QUESTIONS } from "../utils/assistantKnowledge.js";

const welcome = "Hey! I’m Prashant’s portfolio assistant. How can I help you today?";

function renderMessage(content, profile) {
  return content.split(/(https?:\/\/[^\s]+)/g).flatMap((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return <a key={index} href={part} target="_blank" rel="noreferrer">{part}</a>;
    }
    if (!profile?.phone || !profile.phoneHref || !part.includes(profile.phone)) return part;
    const phoneParts = part.split(profile.phone);
    return phoneParts.flatMap((phonePart, phoneIndex) => phoneIndex === phoneParts.length - 1
      ? [phonePart]
      : [phonePart, <a key={`${index}-${phoneIndex}`} href={profile.phoneHref}>{profile.phone}</a>]);
  });
}

export default function AIAssistant({ profile, projects, skillGroups, journey }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const portfolio = { profile, projects, skillGroups, journey };
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const closeTimer = useRef(null);
  const conversation = messages.length ? messages : [{ role: "assistant", content: welcome }];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  function openChat() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsClosing(false);
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 80);
  }

  function closeChat() {
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 180);
  }

  function sendMessage(value = input) {
    const content = value.trim();
    if (!content) return;
    const reply = answerPortfolioQuestion(content, portfolio);
    setMessages((current) => [
      ...current,
      { role: "user", content },
      { role: "assistant", content: reply },
    ]);
    setInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.nativeEvent.isComposing && event.keyCode !== 229) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="assistant-widget">
      <button
        className={`assistant-launcher${isOpen ? " assistant-launcher-open" : ""}`}
        type="button"
        aria-label={isOpen ? "Close Prashant’s portfolio assistant" : "Open Prashant’s portfolio assistant"}
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant-panel"
        onClick={isOpen ? closeChat : openChat}
      >
        {isOpen ? <X aria-hidden="true" /> : <><MessageCircle aria-hidden="true" /><Sparkles className="assistant-launcher-sparkle" aria-hidden="true" /></>}
      </button>

      {isOpen && (
        <section
          id="portfolio-assistant-panel"
          className={`assistant-panel${isClosing ? " assistant-panel-closing" : ""}`}
          aria-label="Prashant’s Portfolio Assistant"
          aria-hidden={isClosing}
        >
          <header className="assistant-header">
            <div className="assistant-avatar"><Bot aria-hidden="true" /></div>
            <div className="assistant-heading"><h2>Prashant&apos;s Portfolio Assistant</h2><p><span className="assistant-status-dot" /> Ask about Prashant&apos;s portfolio</p></div>
            <div className="assistant-header-actions">
              <button type="button" aria-label="Clear chat" title="Clear chat" disabled={messages.length === 0} onClick={() => setMessages([])}><Trash2 aria-hidden="true" /></button>
              <button type="button" aria-label="Minimize chat" title="Minimize" onClick={closeChat}><ChevronDown aria-hidden="true" /></button>
            </div>
          </header>

          <div className="assistant-messages" ref={scrollRef} role="log" aria-live="polite" aria-relevant="additions text">
            {conversation.map((message, index) => (
              <div className={`assistant-message-row assistant-message-${message.role}`} key={`${message.role}-${index}`}>
                {message.role === "assistant" && <span className="assistant-message-avatar"><Sparkles aria-hidden="true" /></span>}
                <p className="assistant-bubble">{message.role === "assistant" ? renderMessage(message.content, profile) : message.content}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="assistant-suggestions"><p>Here are a few things you can ask:</p>{SUGGESTED_QUESTIONS.map((suggestion) => <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}<span aria-hidden="true">↗</span></button>)}</div>
            )}
          </div>

          <form className="assistant-composer" onSubmit={(event) => { event.preventDefault(); void sendMessage(); }}>
            <label className="sr-only" htmlFor="assistant-message-input">Ask Prashant&apos;s assistant a question</label>
            <input ref={inputRef} id="assistant-message-input" value={input} maxLength={1500} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything…" autoComplete="off" />
            <button type="submit" aria-label="Send message" disabled={!input.trim()}><Send aria-hidden="true" /></button>
          </form>
          <p className="assistant-disclaimer"><span>Answers are based on Prashant&apos;s portfolio.</span><span><Check aria-hidden="true" /> Private &amp; secure</span></p>
        </section>
      )}
    </div>
  );
}
