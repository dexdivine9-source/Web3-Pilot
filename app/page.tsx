'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  MessageSquare, 
  Share2, 
  FileText, 
  Send, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Twitter,
  MessageCircle
} from 'lucide-react';
import ModuleCard from '@/components/ModuleCard';
import RiskGauge from '@/components/RiskGauge';
import { 
  auditTokenomics, 
  generateWeb3Content, 
  groundedChat, 
  summarizeValueProp 
} from '@/app/actions/ai-actions';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  // Module 1: Audit
  const [auditInput, setAuditInput] = useState('');
  const [auditResult, setAuditResult] = useState<any>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // Module 2: Chat
  const [chatQuery, setChatQuery] = useState('');
  const [chatContext, setChatContext] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  // Module 3: Social
  const [socialTopic, setSocialTopic] = useState('');
  const [socialContext, setSocialContext] = useState('');
  const [socialResult, setSocialResult] = useState<any>(null);
  const [isGeneratingSocial, setIsGeneratingSocial] = useState(false);

  // Module 4: Summary
  const [summaryInput, setSummaryInput] = useState('');
  const [summaryResult, setSummaryResult] = useState<any>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleAudit = async () => {
    if (!auditInput) return;
    setIsAuditing(true);
    try {
      const res = await auditTokenomics(auditInput);
      setAuditResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleChat = async () => {
    if (!chatQuery || !chatContext) return;
    setIsChatting(true);
    try {
      const res = await groundedChat(chatQuery, chatContext);
      setChatResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsChatting(false);
    }
  };

  const handleSocial = async () => {
    if (!socialTopic || !socialContext) return;
    setIsGeneratingSocial(true);
    try {
      const res = await generateWeb3Content(socialTopic, socialContext);
      setSocialResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingSocial(false);
    }
  };

  const handleSummary = async () => {
    if (!summaryInput) return;
    setIsSummarizing(true);
    try {
      const res = await summarizeValueProp(summaryInput);
      setSummaryResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <header className="text-center space-y-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase"
        >
          Web3-Pilot v1.0
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight"
        >
          Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Growth & Security</span> Lead
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto text-lg"
        >
          High-performance audits, social engine, and grounded intelligence for the next generation of creators.
        </motion.p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module 1: Risk Auditor */}
        <ModuleCard 
          id="audit"
          title="Tokenomics Risk Auditor" 
          description="Analyze vesting, supply, and utility for red flags."
        >
          <div className="space-y-4">
            <textarea 
              placeholder="Paste tokenomics data or whitepaper snippets..."
              className="w-full h-32 bg-zinc-950/50 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={auditInput}
              onChange={(e) => setAuditInput(e.target.value)}
            />
            <button 
              onClick={handleAudit}
              disabled={isAuditing}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
              {isAuditing ? <Loader2 className="animate-spin" size={18} /> : <ShieldAlert size={18} />}
              {isAuditing ? 'Analyzing...' : 'Run Security Audit'}
            </button>

            <AnimatePresence>
              {auditResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-6 border-t border-white/5 space-y-6"
                >
                  <div className="flex justify-center">
                    <RiskGauge score={auditResult.score} />
                  </div>
                  <div className="grid gap-3">
                    {auditResult.flags.map((flag: any, i: number) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-zinc-950/30 border border-white/5">
                        {flag.status === 'red' ? <AlertCircle className="text-red-500 shrink-0" size={18} /> : <CheckCircle2 className="text-green-500 shrink-0" size={18} />}
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">{flag.type}</p>
                          <p className="text-sm text-zinc-400">{flag.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Executive Summary</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{auditResult.summary}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ModuleCard>

        {/* Module 2: Grounded Chat */}
        <ModuleCard 
          id="chat"
          title="Project-Grounded Chat" 
          description="Technical support limited to your project data."
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Project Context</label>
              <textarea 
                placeholder="Paste project documentation here..."
                className="w-full h-24 bg-zinc-950/50 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={chatContext}
                onChange={(e) => setChatContext(e.target.value)}
              />
            </div>
            <div className="relative">
              <input 
                type="text"
                placeholder="Ask a technical question..."
                className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              />
              <button 
                onClick={handleChat}
                disabled={isChatting}
                className="absolute right-2 top-2 p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-all disabled:bg-zinc-800"
              >
                {isChatting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </div>

            <AnimatePresence>
              {chatResponse && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-zinc-950/50 border border-white/5 text-sm text-zinc-300 leading-relaxed"
                >
                  {chatResponse}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ModuleCard>

        {/* Module 3: Social Engine */}
        <ModuleCard 
          id="social"
          title="Web3 Social Engine" 
          description="Convert milestones into viral threads and posts."
        >
          <div className="space-y-4">
            <input 
              type="text"
              placeholder="What is the milestone? (e.g. Mainnet Launch)"
              className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={socialTopic}
              onChange={(e) => setSocialTopic(e.target.value)}
            />
            <textarea 
              placeholder="Additional context/details..."
              className="w-full h-24 bg-zinc-950/50 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={socialContext}
              onChange={(e) => setSocialContext(e.target.value)}
            />
            <button 
              onClick={handleSocial}
              disabled={isGeneratingSocial}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
              {isGeneratingSocial ? <Loader2 className="animate-spin" size={18} /> : <Share2 size={18} />}
              {isGeneratingSocial ? 'Generating...' : 'Generate Social Assets'}
            </button>

            <AnimatePresence>
              {socialResult && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 pt-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Twitter size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">X Thread</span>
                    </div>
                    <div className="space-y-2">
                      {socialResult.xThread.map((tweet: string, i: number) => (
                        <div key={i} className="p-3 rounded-xl bg-zinc-950/30 border border-white/5 text-sm text-zinc-400">
                          {tweet}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <MessageCircle size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">Discord Announcement</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950/30 border border-white/5 text-sm text-zinc-400 whitespace-pre-wrap">
                      {socialResult.discordPost}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ModuleCard>

        {/* Module 4: Value-Prop Summarizer */}
        <ModuleCard 
          id="summary"
          title="Value-Prop Summarizer" 
          description="Condense technical docs into high-impact points."
        >
          <div className="space-y-4">
            <textarea 
              placeholder="Paste technical documentation or long-form content..."
              className="w-full h-32 bg-zinc-950/50 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={summaryInput}
              onChange={(e) => setSummaryInput(e.target.value)}
            />
            <button 
              onClick={handleSummary}
              disabled={isSummarizing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
              {isSummarizing ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
              {isSummarizing ? 'Summarizing...' : 'Generate Value Props'}
            </button>

            <AnimatePresence>
              {summaryResult && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-3 pt-4"
                >
                  {summaryResult.valueProps.map((prop: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-zinc-300">{prop}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ModuleCard>

      </div>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-white/5">
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em]">
          Powered by Gemini 3 Flash & Web3-Pilot Architecture
        </p>
      </footer>
    </div>
  );
}
