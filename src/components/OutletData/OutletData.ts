import QRCode from "qrcode";
import { IOutlet } from "../../types/types";

export const printQr = async (selectedData: IOutlet | undefined) => {
  if (!selectedData || !selectedData.qrcode) {
    console.error("No QR code available for the selected outlet.");
    return;
  }
  try {
    const qrCodeImage = await QRCode.toDataURL(selectedData.qrcode);

    // Create a new window
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      // Prepare the content for the print window
      const htmlContent = `
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              .qr-code-container {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .qr-code-container img {
                width: 200px;
                height: 200px;
              }
              .qr-code-container h3 {
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="qr-code-container">
              <img src="${qrCodeImage}" alt="QR Code" />
              <h3>${selectedData.outletName}</h3>
            </div>
            <script>
              window.onload = function () {
                window.print();
                window.onafterprint = function () {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } else {
      console.error("Failed to open print window.");
    }
  } catch (error) {
    console.log("Failed to get print window");
  }
};
