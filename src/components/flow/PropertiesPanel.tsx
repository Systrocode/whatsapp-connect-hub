import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Plus, Image, Trash2 } from "lucide-react";
import { Node } from 'reactflow';

interface PropertiesPanelProps {
    selectedNode: Node | null;
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    onClose: () => void;
}

export default function PropertiesPanel({ selectedNode, setNodes, onClose }: PropertiesPanelProps) {
    const [content, setContent] = useState("");

    // Sync state with selected node
    useEffect(() => {
        if (selectedNode) {
            setContent(selectedNode.data.content || "");
        }
    }, [selectedNode]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);

        // Update the actual node data instantly
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode?.id) {
                    node.data = {
                        ...node.data,
                        content: newContent,
                    };
                }
                return node;
            })
        );
    };

    const handleDeleteNode = () => {
        setNodes((nds) => nds.filter((node) => node.id !== selectedNode?.id));
        onClose();
    };

    if (!selectedNode) return null;

    return (
        <aside className="w-80 h-full bg-white dark:bg-slate-900 border-l border-border p-4 overflow-y-auto animate-in slide-in-from-right duration-300 shadow-xl z-10 absolute right-0 top-0 bottom-0">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Edit Node</h3>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {selectedNode.type === 'message' && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Message Content</Label>
                        <Textarea
                            value={content}
                            onChange={handleContentChange}
                            placeholder="Type your WhatsApp message..."
                            className="min-h-[120px] resize-none"
                        />
                        <p className="text-xs text-muted-foreground text-right">
                            {content.length} characters
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Media</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">Click to upload image/video</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Quick Replies / Buttons</Label>
                        <Button variant="outline" className="w-full border-dashed" size="sm">
                            <Plus className="w-3 h-3 mr-2" /> Add Button
                        </Button>
                    </div>
                </div>
            )}

            {selectedNode.type === 'default' && (
                <div className="text-center py-10 text-muted-foreground">
                    <p>Select a message node to edit configuration.</p>
                </div>
            )}

            <div className="mt-8 pt-6 border-t">
                <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-200" onClick={handleDeleteNode}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Node
                </Button>
            </div>
        </aside>
    );
}
