import { FLAVORS, QUAD_PRESETS } from "../data/snackCatalog.js";

export const getFlavors = (req, res) => {
  res.json({
    success: true,
    data: FLAVORS,
    metadata: {
      totalReserveBatches: 4,
      targetDecibels: 76.4,
      oilProtocol: "100% Cold-Pressed Zero Palm Oil"
    }
  });
};

export const getFlavorById = (req, res) => {
  const { id } = req.params;
  const flavor = FLAVORS.find(f => f.id === id);
  if (!flavor) {
    return res.status(404).json({ success: false, error: "FLAVOR_NOT_FOUND" });
  }
  res.json({ success: true, data: flavor });
};

export const getQuadPresets = (req, res) => {
  res.json({ success: true, data: QUAD_PRESETS });
};

export const getDispatchStatus = (req, res) => {
  res.json({
    success: true,
    data: {
      mumbai: { pod: "Bandra Dark Pod", etaMinutes: 9, partner: "Zepto" },
      bengaluru: { pod: "Indiranagar Dark Pod", etaMinutes: 11, partner: "Blinkit" },
      delhiNcr: { pod: "Cyber Hub Pod", etaMinutes: 10, partner: "Instamart" },
      status: "LIVE_DISPATCH_ACTIVE"
    }
  });
};

