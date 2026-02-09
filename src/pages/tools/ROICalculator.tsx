import { useState } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Clock, TrendingUp } from "lucide-react";

const ROICalculator = () => {
    const [conversations, setConversations] = useState(1000);
    const [agentCost, setAgentCost] = useState(15);
    const [handleTime, setHandleTime] = useState(10); // minutes

    // Calculations
    const traditionalCost = conversations * (handleTime / 60) * agentCost;
    const whatsappEfficiency = 0.4; // 40% more efficient
    const whatsappCost = traditionalCost * (1 - whatsappEfficiency);
    const savings = traditionalCost - whatsappCost;
    const timeSaved = conversations * (handleTime / 60) * whatsappEfficiency;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
            <LandingHeader />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Calculator className="w-8 h-8" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            WhatsApp ROI Calculator
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            See how much time and money you can save by switching your support to WhatsApp.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Inputs */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800"
                        >
                            <h2 className="text-2xl font-bold mb-6">Your Metrics</h2>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="font-semibold text-slate-700 dark:text-slate-300">Monthly Conversations</label>
                                        <span className="font-bold text-blue-600">{conversations}</span>
                                    </div>
                                    <Slider
                                        value={[conversations]}
                                        onValueChange={(v) => setConversations(v[0])}
                                        min={100} max={50000} step={100}
                                        className="py-4"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="font-semibold text-slate-700 dark:text-slate-300">Agent Hourly Cost ($)</label>
                                        <span className="font-bold text-blue-600">${agentCost}</span>
                                    </div>
                                    <Input
                                        type="number"
                                        value={agentCost}
                                        onChange={(e) => setAgentCost(Number(e.target.value))}
                                        className="h-12 text-lg"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="font-semibold text-slate-700 dark:text-slate-300">Avg. Handle Time (mins)</label>
                                        <span className="font-bold text-blue-600">{handleTime}m</span>
                                    </div>
                                    <Slider
                                        value={[handleTime]}
                                        onValueChange={(v) => setHandleTime(v[0])}
                                        min={1} max={60} step={1}
                                        className="py-4"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Results */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col justify-center"
                        >
                            <h2 className="text-2xl font-bold mb-8">Estimated Monthly Savings</h2>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500">
                                        <DollarSign className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400 mb-1">Cost Savings</div>
                                        <div className="text-4xl font-black text-green-400">
                                            ${Math.round(savings).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                                        <Clock className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400 mb-1">Time Saved</div>
                                        <div className="text-4xl font-black text-blue-400">
                                            {Math.round(timeSaved).toLocaleString()} hrs
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mt-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <TrendingUp className="w-5 h-5 text-yellow-400" />
                                        <span className="font-bold text-yellow-400">Efficiency Boost</span>
                                    </div>
                                    <p className="text-sm text-slate-300">
                                        WhatsApp allows agents to handle 3-5 conversations simultaneously depending on complexity, significantly reducing cost per ticket.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

export default ROICalculator;
