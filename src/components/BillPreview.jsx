import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, X, Save } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import { useReactToPrint } from 'react-to-print';
import toast from 'react-hot-toast';

const BillPreview = ({ bill, user, onClose, onSave }) => {
  const billRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: `tax-invoice-${bill.billNo}`,
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 0.5in;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }
        .no-print {
          display: none !important;
        }
        .print-section {
          width: 100%;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
      }
    `,
    onAfterPrint: () => toast.success('Tax invoice printed successfully'),
  });

  const handleDownload = () => {
    try {
      // Create a blob with the bill data
      const billData = {
        ...bill,
        generatedAt: new Date().toISOString(),
        storeInfo: {
          storeName: user.storeName,
          storeAddress: user.storeAddress,
          phone: user.phone,
          gstNumber: user.gstNumber
        }
      };

      const blob = new Blob([JSON.stringify(billData, null, 2)], {
        type: 'application/json'
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${bill.billNo}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
    }
  };

  const handleSaveToLocal = () => {
    try {
      // Get existing bills from localStorage
      const existingBills = JSON.parse(localStorage.getItem('medicalBills') || '[]');
      
      // Create bill data with timestamp
      const billData = {
        ...bill,
        id: Date.now().toString(),
        savedAt: new Date().toISOString(),
        storeInfo: {
          storeName: user.storeName,
          storeAddress: user.storeAddress,
          phone: user.phone,
          gstNumber: user.gstNumber
        }
      };

      // Add new bill to the beginning of the array
      const updatedBills = [billData, ...existingBills];
      
      // Save to localStorage
      localStorage.setItem('medicalBills', JSON.stringify(updatedBills));
      
      toast.success('Invoice saved to local storage');
      
      // Call the onSave prop if provided
      if (onSave) {
        onSave(billData);
      }
    } catch (error) {
      toast.error('Failed to save invoice to local storage');
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = bill.items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const discountAmount = itemTotal * ((item.discount || 0) / 100);
      return sum + (itemTotal - discountAmount);
    }, 0);

    const totalDiscount = bill.items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      return sum + (itemTotal * ((item.discount || 0) / 100));
    }, 0);

    const taxAmount = subtotal * ((bill.taxRate || 0) / 100);
    const total = subtotal + taxAmount;

    return { 
      subtotal: Math.round(subtotal * 100) / 100, 
      totalDiscount: Math.round(totalDiscount * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100, 
      total: Math.round(total * 100) / 100 
    };
  };

  const { subtotal, totalDiscount, taxAmount, total } = calculateTotals();

  // Convert amount to words
  const convertToWords = (amount) => {
    if (amount === 0) return 'Zero Rupees Only';
    
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    const convertLessThanThousand = (num) => {
      if (num === 0) return '';
      if (num < 10) return units[num];
      if (num < 20) return teens[num - 10];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
      return units[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + convertLessThanThousand(num % 100) : '');
    };

    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);
    
    let words = '';
    
    if (rupees >= 10000000) {
      words += convertLessThanThousand(Math.floor(rupees / 10000000)) + ' Crore ';
      rupees %= 10000000;
    }
    
    if (rupees >= 100000) {
      words += convertLessThanThousand(Math.floor(rupees / 100000)) + ' Lakh ';
      rupees %= 100000;
    }
    
    if (rupees >= 1000) {
      words += convertLessThanThousand(Math.floor(rupees / 1000)) + ' Thousand ';
      rupees %= 1000;
    }
    
    if (rupees > 0) {
      words += convertLessThanThousand(rupees);
    }
    
    words = words.trim() + ' Rupees';
    
    if (paise > 0) {
      words += ' and ' + convertLessThanThousand(paise) + ' Paise';
    }
    
    return words + ' Only';
  };

  // Ensure bill has all required fields
  const currentBill = {
    billNo: bill.billNo,
    customerName: bill.customerName || '',
    customerAddress: bill.customerAddress || '',
    customerGSTIN: bill.customerGSTIN || '',
    customerMobile: bill.customerMobile || '',
    paymentMethod: bill.paymentMethod || 'Cash',
    taxRate: bill.taxRate || 0,
    items: bill.items || []
  };

  const currentUser = {
    storeName: user?.storeName || 'MEDICAL STORE',
    storeAddress: user?.storeAddress || 'Church Street Bengaluru',
    phone: user?.phone || '+91-1075314648',
    altPhone: user?.altPhone || '+91-8029924749',
    gstNumber: user?.gstNumber || '',
    name: user?.name || 'Store Manager'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-6xl  overflow-hidden"
      >
        {/* Header */}
        <div className="no-print flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            TAX INVOICE PREVIEW
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Download size={18} />
              <span>Download JSON</span>
            </button>
            <button
              onClick={handleSaveToLocal}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save size={18} />
              <span>Save Invoice</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Printer size={18} />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Bill Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-140px)] p-6">
          <div ref={billRef} className="print-section bg-white mx-auto border border-gray-300 p-8">
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold uppercase mb-2 border-b-2 border-black pb-2">
                TAX INVOICE
              </h1>
              
              <div className="mb-4">
                <h2 className="text-xl font-semibold uppercase mb-1">MEDICAL INVOICE</h2>
                <p className="text-sm">Address: {currentUser.storeAddress}</p>
                <p className="text-sm">
                  Phone no: {currentUser.phone} {currentUser.altPhone && ` ${currentUser.altPhone}`}
                </p>
              </div>
            </div>

            {/* Party Details Section */}
            <div className="mb-6 grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-2 border-b border-gray-300 pb-1">Party's Name</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {currentBill.customerName || '____________________'}</p>
                  <p><strong>Address:</strong> {currentBill.customerAddress || '____________________'}</p>
                  <p><strong>GSTIN NO:</strong> {currentBill.customerGSTIN || '____________________'}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="space-y-1 text-sm">
                  <p><strong>Invoice No:</strong> {currentBill.billNo}</p>
                  <p><strong>Date:</strong> {formatDate(new Date())}</p>
                  {currentUser.gstNumber && <p><strong>Store GSTIN:</strong> {currentUser.gstNumber}</p>}
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <table className="w-full border-collapse border border-gray-800 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-800 px-3 py-2 text-left font-semibold w-12">S.No</th>
                    <th className="border border-gray-800 px-3 py-2 text-left font-semibold">Items</th>
                    <th className="border border-gray-800 px-3 py-2 text-left font-semibold w-20">HSN</th>
                    <th className="border border-gray-800 px-3 py-2 text-left font-semibold w-20">RATE</th>
                    <th className="border border-gray-800 px-3 py-2 text-left font-semibold w-20">MRP</th>
                    <th className="border border-gray-800 px-3 py-2 text-left font-semibold w-20">TAX</th>
                    <th className="border border-gray-800 px-3 py-2 text-left font-semibold w-24">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBill.items.map((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    const discountAmount = itemTotal * ((item.discount || 0) / 100);
                    const finalAmount = itemTotal - discountAmount;
                    const itemTax = finalAmount * (currentBill.taxRate / 100);
                    const totalAmount = finalAmount + itemTax;

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td className="border border-gray-800 px-3 py-2 align-top">{index + 1}.</td>
                          <td className="border border-gray-800 px-3 py-2 align-top">
                            <div className="font-medium">{item.medicineName}</div>
                            <div className="text-xs text-gray-600">{item.batchNo}</div>
                          </td>
                          <td className="border border-gray-800 px-3 py-2 align-top">{item.hsnCode || '3004'}</td>
                          <td className="border border-gray-800 px-3 py-2 align-top">{formatCurrency(item.price)}</td>
                          <td className="border border-gray-800 px-3 py-2 align-top">{formatCurrency(item.mrp || item.price * 1.2)}</td>
                          <td className="border border-gray-800 px-3 py-2 align-top">
                            {currentBill.taxRate || 0}% ({formatCurrency(itemTax)})
                          </td>
                          <td className="border border-gray-800 px-3 py-2 align-top font-semibold">
                            {formatCurrency(totalAmount)}
                          </td>
                        </tr>
                        {/* Additional description row */}
                        <tr>
                          <td className="border border-gray-800 px-3 py-1"></td>
                          <td colSpan="6" className="border border-gray-800 px-3 py-1 text-sm text-gray-600">
                            {item.description || `${item.category} Medicine`}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                  
                  {/* Empty rows for additional items */}
                  {Array.from({ length: Math.max(0, 5 - currentBill.items.length) }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-gray-800 px-3 py-3">{currentBill.items.length + index + 1}.</td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Horizontal Line */}
            <div className="border-t border-gray-800 my-4"></div>

            {/* Totals Section */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div className="w-1/2">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Sub Total</h3>
                    <div className="text-2xl font-bold">{formatCurrency(total)}</div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Amount in words</h3>
                    <div className="border border-gray-400 p-2 min-h-12 text-sm italic">
                      {convertToWords(total)}
                    </div>
                  </div>
                </div>
                
                <div className="w-1/2">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-4 text-right font-semibold">Subtotal:</td>
                        <td className="py-1 text-right border-b border-gray-300">{formatCurrency(subtotal)}</td>
                      </tr>
                      {totalDiscount > 0 && (
                        <tr>
                          <td className="py-1 pr-4 text-right font-semibold">Discount:</td>
                          <td className="py-1 text-right border-b border-gray-300 text-red-600">-{formatCurrency(totalDiscount)}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="py-1 pr-4 text-right font-semibold">Tax ({(currentBill.taxRate || 0)}%):</td>
                        <td className="py-1 text-right border-b border-gray-300">{formatCurrency(taxAmount)}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-4 text-right font-semibold text-lg">Total:</td>
                        <td className="py-1 text-right border-b-2 border-gray-800 text-lg font-bold">
                          {formatCurrency(total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="grid grid-cols-2 gap-8 mt-8 pt-4 border-t border-gray-800">
              <div>
                <h3 className="font-semibold text-lg mb-2">Terms and Conditions</h3>
                <div className="text-sm space-y-1 border border-gray-400 p-2 min-h-20">
                  <p>• Goods once sold will not be taken back</p>
                  <p>• Subject to Bengaluru jurisdiction</p>
                  <p>• E. &. O.E.</p>
                  <p>• Please check medicines at the time of purchase</p>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Seal & Signature</h3>
                <div className="border border-gray-400 p-4 min-h-20 flex items-center justify-center">
                  <div className="text-sm text-gray-600">
                    <p>For {currentUser.storeName}</p>
                    <p className="mt-4">____________________</p>
                    <p>Authorized Signatory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-6 pt-4 border-t border-gray-300 text-xs text-gray-600">
              <p>This is a computer generated invoice</p>
              <p>Generated on: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BillPreview;