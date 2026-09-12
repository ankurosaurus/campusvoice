import React, { useState, useRef, useEffect, useContext } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCcw, ShieldCheck, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ComplaintsContext } from '../context/ComplaintsContext';

export const AIChatbotWidget = () => {
  const { user } = useContext(AuthContext);
  const { complaints } = useContext(ComplaintsContext);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name || 'there'}! 👋 I'm **CampusVoice AI**, your 24/7 campus operations assistant. Ask me anything about lodging complaints, checking SLA deadlines, mess menus, or warden escalation policies!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const quickPrompts = [
    "How do I reopen an unsatisfied fix?",
    "What is the SLA deadline policy?",
    "How do I rate Mess Alpha dishes?",
    "Who is the Chief Warden for BH-1?"
  ];

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('reopen') || q.includes('unsatisfied') || q.includes('fake')) {
      return "<b>Closed-Loop Ticket Reopening Policy:</b><br/>" +
             "When a warden marks your ticket as <i>Resolved</i>, go to your Student Dashboard. Click <b>Rate Resolution</b>. " +
             "If you select <b>Unsatisfied</b>, CampusVoice automatically reopens the ticket, increments `reopenedCount`, " +
             "and flags the Warden on the central SLA Breach Visualizer!";
    }

    if (q.includes('sla') || q.includes('deadline') || q.includes('hours') || q.includes('time')) {
      return "<b>SLA & Escalation Windows:</b><br/>" +
             "• <b>24 Hours:</b> Mandatory Warden Acknowledgment.<br/>" +
             "• <b>72 Hours:</b> Technical Resolution Window.<br/>" +
             "• <b>Critical/Emergency:</b> 12-Hour Priority Window.<br/>" +
             "If resolution time exceeds the SLA deadline, an automated red breach alert is dispatched to Chief Warden Dr. Rajesh Kumar.";
    }

    if (q.includes('mess') || q.includes('food') || q.includes('menu') || q.includes('dish') || q.includes('lunch') || q.includes('dinner')) {
      return "<b>Mess & Dining Operations (Mess Alpha):</b><br/>" +
             "You can view the complete <b>7-day weekly menu</b> across Breakfast, Lunch, Snacks, and Dinner in your Student Portal! " +
             "Submitting dish ratings directly updates vendor quality scorecards. Low meal ratings automatically generate Mess Operations tickets.";
    }

    if (q.includes('warden') || q.includes('bh-1') || q.includes('bh-2') || q.includes('gh-1') || q.includes('contact')) {
      return "<b>Hostel Warden Registry:</b><br/>" +
             "• <b>BH-1 Boys Hostel:</b> Col. Suresh Verma (Office 101)<br/>" +
             "• <b>BH-2 Boys Hostel:</b> Vikram Singh (Office 102)<br/>" +
             "• <b>GH-1 Girls Hostel:</b> Dr. Sunita Sharma (Office 201)<br/>" +
             "• <b>Mess Alpha Operations:</b> Chef Anil Kapoor";
    }

    if (q.includes('status') || q.includes('my complaint') || q.includes('ticket')) {
      const activeCount = complaints.filter(c => c.status !== 'Resolved').length;
      return `Currently, there are <b>${activeCount} active operational tickets</b> in the campus system. ` +
             `You can inspect live progress, staff action notes, and photo attachments inside your Student or Warden dashboard tabs.`;
    }

    return `Thank you for asking! CampusVoice ensures 100% closed-loop resolution accountability for all ${user?.hostelBlock || 'BH-1'} residents. ` +
           `You can submit new complaints, view mess menus, or test the 1-Click Role Switcher in the navigation bar!`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAIResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="liquid-glass group relative flex items-center gap-2.5 px-5 py-3 rounded-full text-white font-medium text-sm shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20 bg-sky-950/80"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span>CampusVoice AI Assistant</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] rounded-3xl border border-white/15 bg-slate-950/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-rise">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-900/60 border border-sky-400/40 flex items-center justify-center">
                <Bot className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  CampusVoice AI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live Operational Knowledge Base
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-md'
                      : 'bg-neutral-900/90 text-neutral-200 border border-white/10 rounded-bl-none shadow-md'
                  }`}
                >
                  <div
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: m.text }}
                  />
                  <div className="text-[9px] opacity-60 mt-1 text-right font-mono">{m.time}</div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-300 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs pl-2">
                <Bot className="w-4 h-4 text-sky-400 animate-spin" />
                <span>AI is analyzing operational rules...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-neutral-900/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-[10px] text-neutral-300 border border-neutral-700 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-black/90 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask CampusVoice AI (e.g. SLA rules, mess menu)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbotWidget;
