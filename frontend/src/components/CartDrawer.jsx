import React, { useState } from "react";
import { X, Minus, Plus, Trash2, ArrowRight, Zap, CheckCircle2, ShieldCheck } from "lucide-react";
import { audio } from "../utils/audioEngine";

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onClearCart
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");

  if (!isOpen) return null;

  const totalPacks = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeExpress = totalPacks >= 4;
  const deliveryFee = isFreeExpress || totalPacks === 0 ? 0 : 30;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    audio.playAcousticCrunch();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerName: customerName || "Reserve Collector",
          phone: phone || "9876543210",
          city
        })
      });

      const result = await res.json();
      if (result.success) {
        setCompletedOrder(result.data);
        onClearCart();
      }
    } catch (err) {
      console.error("Order dispatch failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161922] border-l border-[#282d3c] flex flex-col justify-between shadow-2xl relative">
          {/* Header */}
          <div className="p-6 border-b border-[#282d3c] flex items-center justify-between bg-[#111319]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb800] animate-pulse" />
              <h3 className="font-mono font-bold text-sm tracking-wider text-white uppercase">
                YOUR RESERVE BAG ({totalPacks} PACKS)
              </h3>
            </div>
            <button
              onClick={() => {
                audio.playTick();
                onClose();
              }}
              className="p-1.5 rounded text-[#9e8f78] hover:text-white hover:bg-[#1e1f26] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {completedOrder ? (
              /* Success & Live 10-Min Dispatch View */
              <div className="space-y-6 animate-fadeIn text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#ffb800]/10 border border-[#ffb800]/40 flex items-center justify-center text-[#ffb800] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white font-sans">
                    10-Min Dispatch Dispatched!
                  </h4>
                  <p className="font-mono text-xs text-[#d5c4ab]">
                    {completedOrder.orderId}
                  </p>
                </div>

                {/* Dispatch Details */}
                <div className="p-4 rounded-xl bg-[#1e1f26] border border-[#282d3c] text-left font-mono text-xs space-y-3">
                  <div className="flex justify-between border-b border-[#282d3c] pb-2">
                    <span className="text-[#9e8f78]">POD LOCATION:</span>
                    <span className="text-white font-bold">{completedOrder.dispatchPod}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#282d3c] pb-2">
                    <span className="text-[#9e8f78]">ESTIMATED ARRIVAL:</span>
                    <span className="text-[#ffb800] font-bold">~10 MINUTES</span>
                  </div>
                  <div className="flex justify-between border-b border-[#282d3c] pb-2">
                    <span className="text-[#9e8f78]">TOTAL CHARGED:</span>
                    <span className="text-white font-bold">₹{completedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9e8f78]">ACOUSTIC SPEC:</span>
                    <span className="text-[#ffb800]">76.4 dBA Certified</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCompletedOrder(null);
                    onClose();
                  }}
                  className="w-full py-3 rounded bg-[#ffb800] text-[#412d00] font-mono font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  CONTINUE EXPLORING
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20 text-[#9e8f78] space-y-3 font-mono">
                <p className="text-base text-white font-sans font-bold">Your bag is empty</p>
                <p className="text-xs">Add an acoustic reserve pack or build a Quad Crate to dispatch.</p>
              </div>
            ) : (
              <>
                {/* 10-Min Speed Banner */}
                <div className="p-3.5 rounded-lg border border-[#ffb800]/30 bg-[#ffb800]/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#ffb800]">
                    <Zap className="w-4 h-4" />
                    <span>{isFreeExpress ? "FREE 10-MIN DISPATCH UNLOCKED" : `ADD ${4 - totalPacks} MORE FOR FREE DISPATCH`}</span>
                  </div>
                  <span className="font-bold text-white">{isFreeExpress ? "₹0" : "₹30"}</span>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg bg-[#1e1f26] border border-[#282d3c] flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-white font-sans">
                          {item.name}
                        </h4>
                        <p className="font-mono text-[11px] text-[#9e8f78]">
                          ₹{item.price} · 65g Reserve
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 border border-[#282d3c] rounded px-2 py-1 bg-[#111319]">
                          <button
                            onClick={() => {
                              audio.playTick();
                              onUpdateQuantity(item.id, item.quantity - 1);
                            }}
                            className="w-5 h-5 flex items-center justify-center text-[#9e8f78] hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs text-white font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              audio.playTick();
                              onUpdateQuantity(item.id, item.quantity + 1);
                            }}
                            className="w-5 h-5 flex items-center justify-center text-[#9e8f78] hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-bold text-white w-12 text-right">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Dispatch Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <span className="font-mono text-xs text-[#9e8f78] block uppercase">
                    // QUICK DISPATCH DETAILS
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-[#1e1f26] border border-[#282d3c] text-white placeholder-[#514532] text-xs font-mono focus:outline-none focus:border-[#ffb800]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number (for delivery OTP)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-[#1e1f26] border border-[#282d3c] text-white placeholder-[#514532] text-xs font-mono focus:outline-none focus:border-[#ffb800]"
                  />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-[#1e1f26] border border-[#282d3c] text-white text-xs font-mono focus:outline-none focus:border-[#ffb800]"
                  >
                    <option value="Mumbai">Mumbai (Bandra Pod)</option>
                    <option value="Bengaluru">Bengaluru (Indiranagar Pod)</option>
                    <option value="Delhi">Delhi NCR (Cyber Hub Pod)</option>
                  </select>
                </form>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {!completedOrder && items.length > 0 && (
            <div className="p-6 border-t border-[#282d3c] bg-[#111319] space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#9e8f78]">
                  <span>SUBTOTAL</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#9e8f78]">
                  <span>10-MIN EXPRESS DISPATCH</span>
                  <span className={isFreeExpress ? "text-[#ffb800] font-bold" : ""}>
                    {isFreeExpress ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-[#282d3c]">
                  <span>TOTAL DUE</span>
                  <span className="text-[#ffb800]">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded bg-[#ffb800] hover:bg-[#ffc633] text-[#412d00] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#ffb800]/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>DISPATCHING ORDER...</span>
                ) : (
                  <>
                    <span>CONFIRM 10-MIN DISPATCH</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

