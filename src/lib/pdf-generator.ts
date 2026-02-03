import { jsPDF } from 'jspdf';
import { Contact } from './contact-parser';

export const generatePDF = (contact: Contact, content: string) => {
    const doc = new jsPDF();

    // Set font
    doc.setFont('helvetica', 'normal');

    // Header
    doc.setFontSize(24);
    doc.setTextColor(157, 78, 221); // Purple
    doc.text('Magic Message', 20, 20);

    // Line
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);

    // Content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const splitText = doc.splitTextToSize(content || `Hello ${contact.name},\n\nThis is a special document prepared just for you.`, 170);
    doc.text(splitText, 20, 40);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Prepared for ${contact.company || 'Private User'}`, 20, 280);
    doc.text(new Date().toLocaleDateString(), 180, 280, { align: 'right' });

    doc.save(`${contact.name.replace(/\s+/g, '_')}_Magic_Doc.pdf`);
};
