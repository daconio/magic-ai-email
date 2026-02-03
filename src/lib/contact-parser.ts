import * as XLSX from 'xlsx';

export interface Contact {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    role?: string;
    [key: string]: any;
}

export const parseContactFile = (file: File): Promise<Contact[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert to JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet) as any[];

                // Normalize keys (simple heuristic)
                const contacts: Contact[] = jsonData.map((row) => ({
                    name: row['Name'] || row['name'] || row['이름'] || 'Unknown',
                    email: row['Email'] || row['email'] || row['이메일'] || '',
                    phone: row['Phone'] || row['phone'] || row['전화번호'] || row['cell'] || '',
                    company: row['Company'] || row['company'] || row['회사'] || '',
                    role: row['Role'] || row['role'] || row['직책'] || '',
                    ...row
                })).filter(c => c.email); // Filter out invalid rows

                resolve(contacts);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);

        reader.readAsBinaryString(file);
    });
};
