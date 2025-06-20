let lastBillNumber = 0;

export function generateBillId() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding leading zeros 

  lastBillNumber++;

  // Generating the bill ID
  const billId = `Bill-${year}${month}-${String(lastBillNumber).padStart(
    5,
    "0"
  )}`;

  return billId;
}
