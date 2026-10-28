export const createOrder = (req, res) => {
  try {
    const { items, customerName, phone, deliveryAddress, city } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, error: "NO_ITEMS_IN_ORDER" });
    }

    const orderId = "CRUNCH-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 5).toUpperCase();
    const totalPacks = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalAmount = items.reduce((sum, item) => sum + ((item.price || 50) * (item.quantity || 1)), 0);

    const dispatchPod = city === "Bengaluru" 
      ? "Indiranagar Express Pod (Blinkit)"
      : city === "Delhi"
      ? "Cyber Hub Dark Pod (Instamart)"
      : "Bandra West Pod 04 (Zepto)";

    const orderRecord = {
      orderId,
      customerName: customerName || "Reserve Collector",
      phone: phone || "9876543210",
      totalPacks,
      totalAmount,
      currency: "INR",
      dispatchPod,
      etaMinutes: 10,
      timestamp: new Date().toISOString(),
      acousticCertificate: {
        batchReference: "76.4 dBA Anechoic Tested",
        fractureGrade: "Pass",
        guaranteedZeroPalmOil: true
      }
    };

    res.json({
      success: true,
      data: orderRecord
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

