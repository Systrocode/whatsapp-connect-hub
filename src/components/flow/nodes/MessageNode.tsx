import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { MessageSquare } from 'lucide-react';

const MessageNode = memo(({ data, selected }: any) => {
  return (
    <div className={`shadow-md rounded-lg bg-white dark:bg-slate-900 border-2 w-[250px] transition-all hover:shadow-xl ${selected ? 'border-whatsapp ring-2 ring-whatsapp/20' : 'border-transparent'}`}>

      {/* Node Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-t-md border-b border-slate-100 dark:border-slate-700">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded text-blue-600 dark:text-blue-400">
          <MessageSquare className="w-3 h-3" />
        </div>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Send Message</span>
      </div>

      {/* Node Content Preview */}
      <div className="p-3 text-sm text-slate-600 dark:text-slate-300">
        {data.content ? (
          <div className="line-clamp-2">{data.content}</div>
        ) : (
          <div className="text-slate-400 italic">Click to edit message...</div>
        )}

        {/* Helper text for buttons if any */}
        {data.buttons && data.buttons.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {data.buttons.map((btn: any, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border text-[10px] text-slate-500">
                {btn.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-slate-400 !border-2 !border-white" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-whatsapp !border-2 !border-white" />
    </div>
  );
});

export default MessageNode;
