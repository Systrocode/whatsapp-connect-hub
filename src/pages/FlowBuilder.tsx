import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,
    Connection,
    Edge,
    Node,
    Panel,
    Position,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import PropertiesPanel from '@/components/flow/PropertiesPanel';
import MessageNode from '@/components/flow/nodes/MessageNode';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Sidebar from '@/components/flow/Sidebar';
import { Button } from '@/components/ui/button';
import { Save, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const nodeTypes = {
    message: MessageNode,
    // Add other types here later
};

// Initial Nodes
const initialNodes: Node[] = [
    {
        id: 'start-1',
        type: 'input',
        data: { label: 'Start Flow' },
        position: { x: 250, y: 5 },
        sourcePosition: Position.Right,
        style: {
            background: '#dcfce7',
            border: '1px solid #22c55e',
            color: '#15803d',
            fontWeight: 'bold',
            borderRadius: '8px',
        }
    },
];

let id = 0;
const getId = () => `node_${id++}`;

function FlowBuilderContent() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null); // Track selection
    const { toast } = useToast();

    const onConnect = useCallback((params: Edge | Connection) => {
        setEdges((eds) => addEdge({
            ...params,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed }
        }, eds));
    }, []);

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: getId(),
                type: type === 'message' ? 'message' : 'default', // USE CUSTOM TYPE
                position,
                data: { label: `${type} node` },
            };

            // Initial Data for custom nodes
            if (type === 'message') {
                newNode.data = { content: 'Hello! How can I help you today?' };
            }

            setNodes((nds) => nds.concat(newNode));
            setSelectedNode(newNode); // Auto-select new node
        },
        [reactFlowInstance, setNodes],
    );

    const [flowName, setFlowName] = useState("Sales Bot Flow #1");
    const [triggerKeywords, setTriggerKeywords] = useState("hello, hi");

    const onSave = async () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();

            try {
                // Actually easier to just use the global supabase client at top
                const { supabase } = await import("@/integrations/supabase/client");
                const { data: { session } } = await supabase.auth.getSession();

                if (!session?.user) {
                    toast({ title: "Error", description: "You must be logged in to save.", variant: "destructive" });
                    return;
                }

                // Parse keywords
                const keywordsArray = triggerKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0);

                const { error } = await supabase.from('flows').upsert({
                    user_id: session.user.id,
                    name: flowName,
                    data: flow,
                    is_active: true,
                    trigger_keywords: keywordsArray
                }, { onConflict: 'name, user_id' as any });

                if (error) {
                    // Fallback insert if upsert fails on constraint
                    const { error: insertError } = await supabase.from('flows').insert({
                        user_id: session.user.id,
                        name: flowName + " " + new Date().toLocaleTimeString(),
                        data: flow,
                        is_active: true,
                        trigger_keywords: keywordsArray
                    });
                    if (insertError) throw insertError;
                }

                toast({
                    title: "Flow Saved",
                    description: `Saved! valid triggers: ${keywordsArray.join(', ')}`,
                });
            } catch (err: any) {
                console.error(err);
                toast({
                    title: "Error saving flow",
                    description: err.message,
                    variant: "destructive"
                });
            }
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-65px)]">
            {/* Toolbar */}
            <div className="bg-white dark:bg-slate-900 border-b p-3 flex justify-between items-center px-6 gap-4">
                <div className="flex-1">
                    <input
                        value={flowName}
                        onChange={(e) => setFlowName(e.target.value)}
                        className="font-bold text-lg bg-transparent border-none focus:ring-0 p-0 w-full"
                    />
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">Triggers:</span>
                        <input
                            value={triggerKeywords}
                            onChange={(e) => setTriggerKeywords(e.target.value)}
                            placeholder="e.g. hello, sales (comma separated)"
                            className="text-xs bg-slate-100 dark:bg-slate-800 border-none rounded px-2 py-0.5 w-full max-w-[300px]"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onSave} className="gap-2">
                        <Save className="w-4 h-4" /> Save
                    </Button>
                    <Button size="sm" className="gap-2 bg-whatsapp hover:bg-whatsapp/90">
                        <Play className="w-4 h-4" /> Publish
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />

                <div className="flex-1 h-full bg-slate-100 dark:bg-slate-950/50 relative" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        nodeTypes={nodeTypes} // REGISTER TYPES
                        fitView
                        className="bg-slate-50 dark:bg-slate-900"
                    >
                        <Controls />
                        <MiniMap />
                        <Background gap={12} size={1} />
                        <Panel position="top-right" className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-lg backdrop-blur-sm border shadow-sm text-xs">
                            Drag nodes from sidebar
                        </Panel>
                    </ReactFlow>

                    {/* Properties Panel Overlay */}
                    {selectedNode && (
                        <PropertiesPanel
                            selectedNode={selectedNode}
                            setNodes={setNodes}
                            onClose={() => setSelectedNode(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function FlowBuilder() {
    return (
        <DashboardLayout>
            <ReactFlowProvider>
                <FlowBuilderContent />
            </ReactFlowProvider>
        </DashboardLayout>
    );
}
