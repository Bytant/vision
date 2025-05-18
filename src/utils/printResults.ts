
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type TestResultData = {
  testType: string;
  score: number;
  totalQuestions: number;
  testDate?: string;
  result?: string;
  recommendations?: string;
  nextSteps?: string[];
  patientName?: string;
};

export const printTestResults = async (elementId: string, data: TestResultData) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }
    
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Set metadata
    pdf.setProperties({
      title: `EyeVision Care - ${data.testType} Results`,
      subject: 'Vision Test Results',
      author: 'EyeVision Care',
      keywords: 'vision test, eye care, medical report'
    });
    
    // Add header with logo and date
    const today = data.testDate || new Date().toLocaleDateString();
    pdf.setFontSize(22);
    pdf.setTextColor(100, 100, 100);
    pdf.text('EyeVision Care', 105, 15, { align: 'center' });
    pdf.setFontSize(12);
    pdf.text(`Test Results - ${today}`, 105, 22, { align: 'center' });
    pdf.setFontSize(14);
    
    if (data.patientName) {
      pdf.text(`Patient: ${data.patientName}`, 20, 35);
    }
    
    pdf.text(`Test: ${data.testType}`, 20, 45);
    pdf.text(`Score: ${data.score}/${data.totalQuestions} (${Math.round((data.score/data.totalQuestions)*100)}%)`, 20, 55);
    
    // Add the screenshot
    pdf.addImage(imgData, 'PNG', 0, 65, imgWidth, imgHeight);
    
    // Save the PDF
    pdf.save(`EyeVision-${data.testType.replace(/\s+/g, '-')}-Results.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
