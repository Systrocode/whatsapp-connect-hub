import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  ClipboardPaste,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Users,
  ArrowRight,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContactImport, DuplicateHandling } from '@/hooks/useContactImport';
import { getSupportedFormats, ParsedContact } from '@/utils/contactParsers';
import ImportPreview from './ImportPreview';
import GoogleSheetsImport from './GoogleSheetsImport';

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ImportStep = 'select' | 'google-sheets' | 'preview' | 'importing' | 'complete';

const ImportContactsDialog = ({ open, onOpenChange }: ImportContactsDialogProps) => {
  const [step, setStep] = useState<ImportStep>('select');
  const [pastedText, setPastedText] = useState('');
  const [duplicateHandling, setDuplicateHandling] = useState<DuplicateHandling>('skip');
  const [dragActive, setDragActive] = useState(false);

  const {
    parseResult,
    isProcessing,
    progress,
    getImportLimits,
    parseFile,
    parseText,
    clearParseResult,
    importContacts,
  } = useContactImport();

  const limits = getImportLimits();
  const formats = getSupportedFormats();

  const handleClose = useCallback(() => {
    setStep('select');
    setPastedText('');
    clearParseResult();
    onOpenChange(false);
  }, [clearParseResult, onOpenChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await parseFile(files[0]);
      setStep('preview');
    }
  }, [parseFile]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await parseFile(files[0]);
      setStep('preview');
    }
  }, [parseFile]);

  const handlePasteSubmit = useCallback(() => {
    if (!pastedText.trim()) return;
    parseText(pastedText);
    setStep('preview');
  }, [pastedText, parseText]);

  const handleGoogleSheetsContacts = useCallback((contacts: ParsedContact[]) => {
    // Create a parse result from Google Sheets contacts
    const result = {
      contacts,
      errors: [],
      warnings: [],
    };
    // Manually set the parse result through the hook's state
    parseText(''); // Clear any existing
    // We need to trigger preview with these contacts
    setStep('preview');
    // Use a workaround - parse as text format
    const textFormat = contacts.map(c => 
      `${c.name || ''},${c.phone_number},${c.email || ''}`
    ).join('\n');
    parseText(textFormat);
  }, [parseText]);

  const handleImport = useCallback(async () => {
    if (!parseResult || parseResult.contacts.length === 0) return;

    setStep('importing');
    await importContacts.mutateAsync({
      contacts: parseResult.contacts,
      duplicateHandling,
    });
    setStep('complete');
  }, [parseResult, duplicateHandling, importContacts]);

  const handleBack = useCallback(() => {
    setStep('select');
    clearParseResult();
    setPastedText('');
  }, [clearParseResult]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Import Contacts
          </DialogTitle>
          <DialogDescription>
            Import contacts from a file or paste them directly. Supported formats: CSV, Excel, vCard, and plain text.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Limits Info */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm">
                <span className="text-muted-foreground">
                  You can import up to <strong className="text-foreground">{limits.batchLimit.toLocaleString()}</strong> contacts at once
                </span>
                <span className="text-muted-foreground">
                  {limits.remaining.toLocaleString()} remaining
                </span>
              </div>

              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="file" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    File
                  </TabsTrigger>
                  <TabsTrigger value="paste" className="flex items-center gap-2">
                    <ClipboardPaste className="w-4 h-4" />
                    Paste
                  </TabsTrigger>
                  <TabsTrigger value="sheets" className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    Google Sheets
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="file" className="mt-4">
                  {/* Drop Zone */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`
                      relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                      ${dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }
                    `}
                  >
                    <input
                      type="file"
                      accept=".csv,.xlsx,.vcf,.txt"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isProcessing}
                    />

                    <div className="space-y-3">
                      {isProcessing ? (
                        <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin" />
                      ) : (
                        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                          <FileSpreadsheet className="w-7 h-7 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {isProcessing ? 'Processing file...' : 'Drop your file here or click to browse'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formats.map(f => f.extension).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Format Info */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {formats.map((format) => (
                      <div key={format.name} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{format.name}</span>
                        <span className="text-muted-foreground text-xs">{format.extension}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="paste" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Paste contacts (one per line)</Label>
                    <Textarea
                      placeholder={`Format: Name, Phone Number, Email (optional)\n\nExamples:\nJohn Doe, +1234567890, john@example.com\n+9876543210\nJane Smith, +1122334455`}
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate name, phone, and email with commas or tabs. Phone number is required.
                    </p>
                  </div>
                  <Button
                    onClick={handlePasteSubmit}
                    disabled={!pastedText.trim()}
                    className="w-full"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </TabsContent>

                <TabsContent value="sheets" className="mt-4">
                  <GoogleSheetsImport
                    onContactsParsed={handleGoogleSheetsContacts}
                    onBack={() => {}}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {step === 'preview' && parseResult && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <ImportPreview result={parseResult} />

              {/* Duplicate Handling */}
              <div className="space-y-2">
                <Label>How to handle duplicate phone numbers?</Label>
                <Select
                  value={duplicateHandling}
                  onValueChange={(v) => setDuplicateHandling(v as DuplicateHandling)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skip">Skip duplicates</SelectItem>
                    <SelectItem value="update">Update existing contacts</SelectItem>
                    <SelectItem value="create">Create new anyway</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Limit Warning */}
              {parseResult.contacts.length > limits.remaining && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p className="text-sm">
                    Only {limits.remaining} of {parseResult.contacts.length} contacts will be imported due to your plan limit.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={parseResult.contacts.length === 0}
                  className="flex-1"
                >
                  Import {Math.min(parseResult.contacts.length, limits.remaining)} Contacts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'importing' && (
            <motion.div
              key="importing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 py-4"
            >
              <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin mb-4" />
                <h3 className="font-semibold text-lg">Importing Contacts...</h3>
                <p className="text-muted-foreground">
                  Please don't close this dialog
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{progress.processed} / {progress.total}</span>
                </div>
                <Progress value={(progress.processed / progress.total) * 100} />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-2xl font-bold text-primary">{progress.successful}</p>
                  <p className="text-xs text-muted-foreground">Imported</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{progress.duplicates}</p>
                  <p className="text-xs text-muted-foreground">Duplicates</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10">
                  <p className="text-2xl font-bold text-destructive">{progress.failed}</p>
                  <p className="text-xs text-muted-foreground">Failed</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 py-4 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Import Complete!</h3>
                <p className="text-muted-foreground mt-1">
                  Successfully imported {progress.successful} contacts
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-2xl font-bold text-primary">{progress.successful}</p>
                  <p className="text-xs text-muted-foreground">Imported</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{progress.duplicates}</p>
                  <p className="text-xs text-muted-foreground">Duplicates</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10">
                  <p className="text-2xl font-bold text-destructive">{progress.failed}</p>
                  <p className="text-xs text-muted-foreground">Failed</p>
                </div>
              </div>

              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ImportContactsDialog;
