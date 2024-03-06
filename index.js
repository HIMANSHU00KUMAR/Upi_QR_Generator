import inquirer from "inquirer";
import qr from "qrcode";
import fs from "fs";

const paymentQuestions = [

    {
        type: 'input',
        name: 'upi_id',
        message: 'Enter the UpiId:', 
    },
    {
      type: 'input',
      name: 'amount',
      message: 'Enter the payment amount:',
      validate: function (value) {
        return !isNaN(value) && parseFloat(value) > 0 ? true : 'Please enter a valid amount.';
      },
    }
];

function generateinfo(info){

    fs.writeFile('information.txt', info, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function generateQRCode(paymentData) {
    // Convert payment data to a string
    const upiData = paymentData;
    const Upiurl= `upi://pay?pa=${upiData.upi_id}&pn&mc=0000&mode=02&purpose=00&am=${upiData.amount}`;

    // console.log("hello")
    // console.log(Upiurl);
    generateinfo(Upiurl);
  
    // Generate QR code
    qr.toFile(
      'UPI_paymentQR.png', // Output file name
      Upiurl, // Data to encode in QR code
      {
        errorCorrectionLevel: 'H', // Error correction level
        type: 'png', // Output file type
        width: 500, // Width of QR code
      },
      (err) => {
        if (err) throw err;
        console.log('QR code generated successfully!');
      }
    );
  }

inquirer.prompt(paymentQuestions).then((answers) => {
    // Generate QR code after collecting payment information
    generateQRCode(answers);
});