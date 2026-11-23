export default function ProjectArtwork({ art, number, label }) {
  return (
    <div className={`project-art art-${art}`} aria-hidden="true">
      <span className="project-art-label">{label}</span>
      {art === "chat" && <div className="chat-art-window"><i /><i /><i /><span className="chat-bubble bubble-a" /><span className="chat-bubble bubble-b" /><span className="chat-bubble bubble-c" /></div>}
      {art === "weather" && <div className="weather-art"><span className="weather-sun" /><span className="weather-cloud" /><span className="weather-lines"><i /><i /><i /></span></div>}
      {art === "stream" && <div className="stream-art"><span className="stream-hero-art" /><span className="stream-row-art"><i /><i /><i /></span></div>}
      <span className="project-art-number">{number}</span>
    </div>
  );
}
