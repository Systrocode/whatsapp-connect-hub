import React from 'react';
import { Card } from "@/components/ui/card";

export default function Sidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 border-r border-border h-full bg-slate-50 dark:bg-slate-900/50 p-4 flex flex-col gap-4">
            <div className="font-semibold text-sm text-muted-foreground mb-2">Available Nodes</div>

            <div className="space-y-3">
                <div
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-border cursor-grab hover:border-whatsapp transition-colors shadow-sm"
                    onDragStart={(event) => onDragStart(event, 'trigger')}
                    draggable
                >
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
                        <img src="https://img.icons8.com/color/48/play.png" alt="trigger" className="w-4 h-4 object-contain" />
                    </div>
                    <div className="text-sm font-medium">Trigger</div>
                </div>

                <div
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-border cursor-grab hover:border-whatsapp transition-colors shadow-sm"
                    onDragStart={(event) => onDragStart(event, 'message')}
                    draggable
                >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                        <img src="https://img.icons8.com/color/48/speech-bubble.png" alt="message" className="w-4 h-4 object-contain" />
                    </div>
                    <div className="text-sm font-medium">Send Message</div>
                </div>

                <div
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-border cursor-grab hover:border-whatsapp transition-colors shadow-sm"
                    onDragStart={(event) => onDragStart(event, 'question')}
                    draggable
                >
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                        <img src="https://img.icons8.com/color/48/faq.png" alt="question" className="w-4 h-4 object-contain" />
                    </div>
                    <div className="text-sm font-medium">Ask Question</div>
                </div>

                <div
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-border cursor-grab hover:border-whatsapp transition-colors shadow-sm"
                    onDragStart={(event) => onDragStart(event, 'condition')}
                    draggable
                >
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-md">
                        <img src="https://img.icons8.com/color/48/flow-chart.png" alt="condition" className="w-4 h-4 object-contain" />
                    </div>
                    <div className="text-sm font-medium">Condition</div>
                </div>

                <div
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-border cursor-grab hover:border-whatsapp transition-colors shadow-sm"
                    onDragStart={(event) => onDragStart(event, 'delay')}
                    draggable
                >
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
                        <img src="https://img.icons8.com/color/48/clock.png" alt="delay" className="w-4 h-4 object-contain" />
                    </div>
                    <div className="text-sm font-medium">Delay</div>
                </div>
            </div>

            <div className="mt-auto">
                <Card className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900">
                    <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        Drag nodes to the canvas to build your flow. Connect them to define the logic.
                    </p>
                </Card>
            </div>
        </aside>
    );
}
