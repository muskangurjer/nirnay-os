import React, { useState, useRef, useEffect } from 'react';
import { useHealthGrid, ChatMessage } from '../../context/HealthGridContext';
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  HeartPulse,
  Calendar,
  FileText,
  Clock,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export const NirnayAIChatbot: React.FC = () => {
  const {
    chatbotOpen,
    setChatbotOpen,
    chatMessages,
    sendChatMessage,
    isAiTyping,
    setEmergencySosModalOpen,
    patient
  } = useHealthGrid();

  const [inputVal, setInputVal] = useState('');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chatbotOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isAiTyping, chatbotOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal);
    setInputVal('');
  };

  const handleVoiceToggle = () => {
    if (!isListeningVoice) {
      setIsListeningVoice(true);
      // Simulated voice recognition transcription
      const demoVoicePrompts = [
        'Book a cardiologist appointment for tomorrow',
        'I have severe chest pain and need urgent help',
        'What is my OPD token wait time?',
        'Show my weekly diet plan',
        'Where are my latest lab test results?'
      ];
      const randomPrompt = demoVoicePrompts[Math.floor(Math.random() * demoVoicePrompts.length)];

      setTimeout(() => {
        setInputVal(randomPrompt);
        setIsListeningVoice(false);
      }, 1800);
    } else {
      setIsListeningVoice(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      {!chatbotOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          {/* Subtle Attention Bubble */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 text-xs text-slate-200 shadow-xl shadow-slate-950/80">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Ask Nirnay AI to book, track & dispatch...</span>
          </div>

          <button
            id="floating-chatbot-trigger-btn"
            onClick={() => setChatbotOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-400 text-white shadow-xl shadow-teal-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-teal-300/40"
            aria-label="Open Nirnay AI Chatbot"
          >
            <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950"></span>
            </span>
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      {chatbotOpen && (
        <div
          id="nirnay-ai-chatbot-window"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Chat Header */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-teal-950">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Nirnay AI Assistant</h3>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded">
                    24/7 National Grid
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  ABDM Verified • Connected to {patient.name.split(' ')[0]} ({patient.abhaId})
                </p>
              </div>
            </div>

            <button
              id="close-chatbot-btn"
              onClick={() => setChatbotOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {chatMessages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-end gap-1.5 max-w-[88%]">
                    {isBot && (
                      <div className="w-6 h-6 rounded-lg bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0 mb-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl whitespace-pre-line leading-relaxed shadow-sm ${
                        isBot
                          ? 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-sm'
                          : 'bg-teal-600 text-white rounded-br-sm font-medium'
                      }`}
                    >
                      {msg.text}

                      {/* Action Payload Renderers */}
                      {msg.actionPayload?.type === 'ambulance_dispatched' && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-100 flex flex-col gap-2">
                          <div className="flex items-center gap-1.5 text-rose-300 font-bold text-[11px]">
                            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
                            Live ALS Ambulance Active
                          </div>
                          <div className="text-[10px] text-slate-300">
                            Driver: {msg.actionPayload.data.driverName}
                          </div>
                          <button
                            onClick={() => setEmergencySosModalOpen(true)}
                            className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-colors"
                          >
                            Open Live Map Tracker
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {msg.actionPayload?.type === 'appointment_booked' && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-100 flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px]">
                            <Calendar className="w-4 h-4 text-emerald-400" />
                            Digital Token #{msg.actionPayload.data.tokenNumber} Generated
                          </div>
                          <div className="text-[10px] text-slate-300">
                            {msg.actionPayload.data.doctorName} • {msg.actionPayload.data.hospitalName}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>

                  {/* Bot Quick Suggestion Replies */}
                  {isBot && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-7">
                      {msg.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendChatMessage(reply)}
                          className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-teal-950 hover:border-teal-500/50 border border-slate-700/80 text-[11px] text-teal-300 transition-all cursor-pointer"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isAiTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs ml-2">
                <div className="w-6 h-6 rounded-lg bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1 py-2 px-3 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] text-slate-400 ml-1">Nirnay AI is processing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Bar (if active) */}
          {isListeningVoice && (
            <div className="p-2.5 bg-teal-950/80 border-t border-teal-500/40 flex items-center justify-between text-xs text-teal-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="font-semibold">Listening to speech...</span>
              </div>
              <span className="text-[10px] text-slate-400">Speak your medical query</span>
            </div>
          )}

          {/* Input & Voice Controls */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isListeningVoice
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title="Voice Query Simulation"
              >
                {isListeningVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-teal-400" />}
              </button>

              <input
                type="text"
                id="chatbot-text-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Nirnay AI (e.g. 'Book cardiologist', 'Emergency SOS')..."
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />

              <button
                type="submit"
                id="chatbot-send-btn"
                disabled={!inputVal.trim()}
                className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
