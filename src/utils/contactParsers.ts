import Papa from 'papaparse';
import readXlsxFile from 'read-excel-file';

export interface ParsedContact {
  phone_number: string;
  name?: string;
  email?: string;
  tags?: string[];
  notes?: string;
}

export interface ParseResult {
  contacts: ParsedContact[];
  errors: Array<{ row: number; message: string }>;
  totalRows: number;
}

// Normalize phone number - remove spaces, dashes, parentheses
const normalizePhoneNumber = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/[\s\-\(\)\.]/g, '').trim();
};

// Validate phone number format (basic validation)
const isValidPhoneNumber = (phone: string): boolean => {
  const normalized = normalizePhoneNumber(phone);
  // Must have at least 7 digits, can start with +
  return /^\+?[0-9]{7,15}$/.test(normalized);
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  if (!email) return true; // Email is optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Try to detect which column is which based on content
const detectColumnType = (values: string[]): 'phone' | 'email' | 'name' | 'tags' | 'notes' | 'unknown' => {
  const sample = values.filter(v => v).slice(0, 10);
  
  // Check if most values look like phone numbers
  const phoneMatches = sample.filter(v => /^\+?[\d\s\-\(\)\.]{7,}$/.test(v));
  if (phoneMatches.length >= sample.length * 0.6) return 'phone';
  
  // Check if most values look like emails
  const emailMatches = sample.filter(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  if (emailMatches.length >= sample.length * 0.6) return 'email';
  
  return 'unknown';
};

// Parse CSV file
export const parseCSV = (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const contacts: ParsedContact[] = [];
        const errors: Array<{ row: number; message: string }> = [];
        
        results.data.forEach((row: Record<string, string>, index) => {
          // Try to find phone number column (case insensitive)
          const phoneKey = Object.keys(row).find(k => 
            /phone|mobile|cell|tel|number|whatsapp/i.test(k)
          );
          const nameKey = Object.keys(row).find(k => 
            /name|full.?name|contact/i.test(k)
          );
          const emailKey = Object.keys(row).find(k => 
            /email|e-mail|mail/i.test(k)
          );
          const tagsKey = Object.keys(row).find(k => 
            /tags?|label|group|category/i.test(k)
          );
          const notesKey = Object.keys(row).find(k => 
            /notes?|comment|description/i.test(k)
          );
          
          const phone = phoneKey ? normalizePhoneNumber(row[phoneKey]) : '';
          const name = nameKey ? row[nameKey]?.trim() : '';
          const email = emailKey ? row[emailKey]?.trim() : '';
          const tagsRaw = tagsKey ? row[tagsKey]?.trim() : '';
          const notes = notesKey ? row[notesKey]?.trim() : '';
          
          if (!phone) {
            errors.push({ row: index + 2, message: 'Missing phone number' });
            return;
          }
          
          if (!isValidPhoneNumber(phone)) {
            errors.push({ row: index + 2, message: `Invalid phone number: ${phone}` });
            return;
          }
          
          if (email && !isValidEmail(email)) {
            errors.push({ row: index + 2, message: `Invalid email: ${email}` });
            return;
          }
          
          const tags = tagsRaw ? tagsRaw.split(/[,;|]/).map(t => t.trim()).filter(Boolean) : [];
          
          contacts.push({
            phone_number: phone.startsWith('+') ? phone : `+${phone}`,
            name: name || undefined,
            email: email || undefined,
            tags: tags.length > 0 ? tags : undefined,
            notes: notes || undefined,
          });
        });
        
        resolve({ contacts, errors, totalRows: results.data.length });
      },
      error: (error) => {
        resolve({ 
          contacts: [], 
          errors: [{ row: 0, message: error.message }], 
          totalRows: 0 
        });
      }
    });
  });
};

// Parse Excel file
// Parse Excel file
export const parseExcel = async (file: File): Promise<ParseResult> => {
  try {
    const rows = await readXlsxFile(file);
    
    if (!rows || rows.length < 2) {
      return { 
        contacts: [], 
        errors: [{ row: 0, message: 'File is empty or missing headers' }], 
        totalRows: 0 
      };
    }

    // First row is headers
    const headers = rows[0].map(h => String(h || ''));
    const dataRows = rows.slice(1);
    
    const contacts: ParsedContact[] = [];
    const errors: Array<{ row: number; message: string }> = [];
    
    dataRows.forEach((row, index) => {
      // Create a map of column name -> value
      const rowData: Record<string, string> = {};
      headers.forEach((header, i) => {
        rowData[header] = String(row[i] || '');
      });

      const phoneKey = Object.keys(rowData).find(k => 
        /phone|mobile|cell|tel|number|whatsapp/i.test(k)
      );
      const nameKey = Object.keys(rowData).find(k => 
        /name|full.?name|contact/i.test(k)
      );
      const emailKey = Object.keys(rowData).find(k => 
        /email|e-mail|mail/i.test(k)
      );
      const tagsKey = Object.keys(rowData).find(k => 
        /tags?|label|group|category/i.test(k)
      );
      const notesKey = Object.keys(rowData).find(k => 
        /notes?|comment|description/i.test(k)
      );
      
      const phone = phoneKey ? normalizePhoneNumber(rowData[phoneKey]) : '';
      const name = nameKey ? rowData[nameKey]?.trim() : '';
      const email = emailKey ? rowData[emailKey]?.trim() : '';
      const tagsRaw = tagsKey ? rowData[tagsKey]?.trim() : '';
      const notes = notesKey ? rowData[notesKey]?.trim() : '';
      
      if (!phone) {
        errors.push({ row: index + 2, message: 'Missing phone number' });
        return;
      }
      
      if (!isValidPhoneNumber(phone)) {
        errors.push({ row: index + 2, message: `Invalid phone number: ${phone}` });
        return;
      }
      
      if (email && !isValidEmail(email)) {
        errors.push({ row: index + 2, message: `Invalid email: ${email}` });
        return;
      }
      
      const tags = tagsRaw ? tagsRaw.split(/[,;|]/).map(t => t.trim()).filter(Boolean) : [];
      
      contacts.push({
        phone_number: phone.startsWith('+') ? phone : `+${phone}`,
        name: name || undefined,
        email: email || undefined,
        tags: tags.length > 0 ? tags : undefined,
        notes: notes || undefined,
      });
    });
    
    return { contacts, errors, totalRows: dataRows.length };
  } catch (error) {
    return { 
      contacts: [], 
      errors: [{ row: 0, message: 'Failed to parse Excel file' }], 
      totalRows: 0 
    };
  }
};

// Parse vCard file
export const parseVCard = (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const vcards = content.split(/(?=BEGIN:VCARD)/i).filter(v => v.trim());
        
        const contacts: ParsedContact[] = [];
        const errors: Array<{ row: number; message: string }> = [];
        
        vcards.forEach((vcard, index) => {
          // Extract phone number
          const telMatch = vcard.match(/TEL[^:]*:([^\r\n]+)/i);
          const phone = telMatch ? normalizePhoneNumber(telMatch[1]) : '';
          
          // Extract name
          const fnMatch = vcard.match(/FN:([^\r\n]+)/i);
          const nMatch = vcard.match(/N:([^\r\n]+)/i);
          let name = fnMatch ? fnMatch[1].trim() : '';
          if (!name && nMatch) {
            // N format is: Last;First;Middle;Prefix;Suffix
            const parts = nMatch[1].split(';').filter(Boolean);
            name = parts.reverse().join(' ').trim();
          }
          
          // Extract email
          const emailMatch = vcard.match(/EMAIL[^:]*:([^\r\n]+)/i);
          const email = emailMatch ? emailMatch[1].trim() : '';
          
          // Extract notes
          const noteMatch = vcard.match(/NOTE:([^\r\n]+)/i);
          const notes = noteMatch ? noteMatch[1].trim() : '';
          
          if (!phone) {
            errors.push({ row: index + 1, message: `Contact ${name || index + 1}: Missing phone number` });
            return;
          }
          
          if (!isValidPhoneNumber(phone)) {
            errors.push({ row: index + 1, message: `Contact ${name || index + 1}: Invalid phone number` });
            return;
          }
          
          if (email && !isValidEmail(email)) {
            errors.push({ row: index + 1, message: `Contact ${name || index + 1}: Invalid email` });
            return;
          }
          
          contacts.push({
            phone_number: phone.startsWith('+') ? phone : `+${phone}`,
            name: name || undefined,
            email: email || undefined,
            notes: notes || undefined,
          });
        });
        
        resolve({ contacts, errors, totalRows: vcards.length });
      } catch (error) {
        resolve({ 
          contacts: [], 
          errors: [{ row: 0, message: 'Failed to parse vCard file' }], 
          totalRows: 0 
        });
      }
    };
    
    reader.onerror = () => {
      resolve({ 
        contacts: [], 
        errors: [{ row: 0, message: 'Failed to read file' }], 
        totalRows: 0 
      });
    };
    
    reader.readAsText(file);
  });
};

// Parse plain text file (one phone per line, optionally with name)
export const parseText = (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split(/[\r\n]+/).filter(l => l.trim());
        
        const contacts: ParsedContact[] = [];
        const errors: Array<{ row: number; message: string }> = [];
        
        lines.forEach((line, index) => {
          const trimmed = line.trim();
          
          // Try to parse as "Name, Phone" or "Phone, Name" or just "Phone"
          const parts = trimmed.split(/[,\t]/).map(p => p.trim());
          
          let phone = '';
          let name = '';
          
          if (parts.length >= 2) {
            // Check which part is the phone number
            if (/^\+?[\d\s\-\(\)\.]{7,}$/.test(parts[0])) {
              phone = normalizePhoneNumber(parts[0]);
              name = parts.slice(1).join(' ');
            } else if (/^\+?[\d\s\-\(\)\.]{7,}$/.test(parts[1])) {
              name = parts[0];
              phone = normalizePhoneNumber(parts[1]);
            } else {
              phone = normalizePhoneNumber(parts[0]);
            }
          } else {
            phone = normalizePhoneNumber(parts[0]);
          }
          
          if (!phone) {
            errors.push({ row: index + 1, message: 'Missing phone number' });
            return;
          }
          
          if (!isValidPhoneNumber(phone)) {
            errors.push({ row: index + 1, message: `Invalid phone number: ${phone}` });
            return;
          }
          
          contacts.push({
            phone_number: phone.startsWith('+') ? phone : `+${phone}`,
            name: name || undefined,
          });
        });
        
        resolve({ contacts, errors, totalRows: lines.length });
      } catch (error) {
        resolve({ 
          contacts: [], 
          errors: [{ row: 0, message: 'Failed to parse text file' }], 
          totalRows: 0 
        });
      }
    };
    
    reader.onerror = () => {
      resolve({ 
        contacts: [], 
        errors: [{ row: 0, message: 'Failed to read file' }], 
        totalRows: 0 
      });
    };
    
    reader.readAsText(file);
  });
};

// Parse pasted text content
export const parsePastedText = (text: string): ParseResult => {
  const lines = text.split(/[\r\n]+/).filter(l => l.trim());
  
  const contacts: ParsedContact[] = [];
  const errors: Array<{ row: number; message: string }> = [];
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const parts = trimmed.split(/[,\t]/).map(p => p.trim());
    
    let phone = '';
    let name = '';
    let email = '';
    
    // Try to identify each part
    parts.forEach(part => {
      if (!part) return;
      
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part)) {
        email = part;
      } else if (/^\+?[\d\s\-\(\)\.]{7,}$/.test(part)) {
        phone = normalizePhoneNumber(part);
      } else if (!name) {
        name = part;
      }
    });
    
    if (!phone) {
      errors.push({ row: index + 1, message: 'Missing phone number' });
      return;
    }
    
    if (!isValidPhoneNumber(phone)) {
      errors.push({ row: index + 1, message: `Invalid phone number: ${phone}` });
      return;
    }
    
    if (email && !isValidEmail(email)) {
      errors.push({ row: index + 1, message: `Invalid email: ${email}` });
      return;
    }
    
    contacts.push({
      phone_number: phone.startsWith('+') ? phone : `+${phone}`,
      name: name || undefined,
      email: email || undefined,
    });
  });
  
  return { contacts, errors, totalRows: lines.length };
};

// Detect file type and parse accordingly
export const parseContactFile = async (file: File): Promise<ParseResult> => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type.toLowerCase();
  
  if (extension === 'csv' || mimeType === 'text/csv') {
    return parseCSV(file);
  }
  
  if (extension === 'xlsx' || mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
    return parseExcel(file);
  }
  
  if (extension === 'vcf' || mimeType === 'text/vcard' || mimeType === 'text/x-vcard') {
    return parseVCard(file);
  }
  
  if (extension === 'txt' || mimeType === 'text/plain') {
    return parseText(file);
  }
  
  // Try to parse as text
  return parseText(file);
};

// Get supported file types info
export const getSupportedFormats = () => [
  { extension: '.csv', name: 'CSV', description: 'Comma-separated values' },
  { extension: '.xlsx', name: 'Excel', description: 'Microsoft Excel spreadsheet' },
  { extension: '.vcf', name: 'vCard', description: 'Contact card format' },
  { extension: '.txt', name: 'Text', description: 'Plain text, one per line' },
];
