"use client";

import { useState } from "react";

export default function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequest: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  // Format today as YYYY-MM-DD for min date
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.phone.trim()) errs.phone = "Please enter your phone number";
    if (!form.date) {
      errs.date = "Please select a date";
    } else if (form.date < todayStr) {
      errs.date = "Please select today or a future date";
    }
    if (!form.time) errs.time = "Please select a time slot";
    const guestNum = parseInt(form.guests, 10);
    if (!form.guests || isNaN(guestNum) || guestNum < 1 || guestNum > 20) {
      errs.guests = "Guests must be between 1 and 20";
    }
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          date: form.date,
          time: form.time,
          guests: parseInt(form.guests, 10),
          specialRequest: form.specialRequest.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to make reservation");

      setSuccess(true);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="font-heading text-2xl font-bold text-success">
          Reservation Confirmed!
        </h1>
        <p className="mt-3 text-text-muted">
          We&apos;ve got your table ready. See you on{" "}
          <strong>{form.date}</strong> at <strong>{form.time}</strong> for{" "}
          <strong>{form.guests} {parseInt(form.guests, 10) === 1 ? "guest" : "guests"}</strong>.
        </p>
        <div className="mt-6 bg-white rounded-lg border border-border p-5 text-left text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-muted">Name</span>
              <span className="font-medium">{form.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Phone</span>
              <span className="font-medium">{form.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Date</span>
              <span className="font-medium">{form.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Time</span>
              <span className="font-medium">{form.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Guests</span>
              <span className="font-medium">{form.guests}</span>
            </div>
            {form.specialRequest && (
              <div className="flex justify-between">
                <span className="text-text-muted">Special Request</span>
                <span className="font-medium">{form.specialRequest}</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setForm({
              name: "",
              phone: "",
              date: "",
              time: "",
              guests: "2",
              specialRequest: "",
            });
          }}
          className="btn-secondary mt-6"
        >
          Make Another Reservation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-3xl font-bold text-text">
        Reserve a Table
      </h1>
      <p className="mt-2 text-text-muted">
        Book ahead and we&apos;ll have everything ready when you arrive.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="bg-white rounded-lg border border-border p-5 space-y-4">
          <div>
            <label htmlFor="res-name" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="res-name"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded border text-sm ${
                errors.name ? "border-error" : "border-border"
              } focus:outline-none focus:border-brown`}
            />
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="res-phone" className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="res-phone"
              name="phone"
              placeholder="e.g. +91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded border text-sm ${
                errors.phone ? "border-error" : "border-border"
              } focus:outline-none focus:border-brown`}
            />
            {errors.phone && (
              <p className="text-error text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="res-date" className="block text-sm font-medium mb-1">
                Date *
              </label>
              <input
                type="date"
                id="res-date"
                name="date"
                value={form.date}
                min={todayStr}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded border text-sm ${
                  errors.date ? "border-error" : "border-border"
                } focus:outline-none focus:border-brown`}
              />
              {errors.date && (
                <p className="text-error text-xs mt-1">{errors.date}</p>
              )}
            </div>
            <div>
              <label htmlFor="res-time" className="block text-sm font-medium mb-1">
                Time Slot *
              </label>
              <select
                id="res-time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded border text-sm ${
                  errors.time ? "border-error" : "border-border"
                } focus:outline-none focus:border-brown`}
              >
                <option value="">Select time</option>
                <option value="12:00 PM">12:00 PM (Lunch)</option>
                <option value="12:30 PM">12:30 PM (Lunch)</option>
                <option value="1:00 PM">1:00 PM (Lunch)</option>
                <option value="1:30 PM">1:30 PM (Lunch)</option>
                <option value="2:00 PM">2:00 PM (Lunch)</option>
                <option value="7:00 PM">7:00 PM (Dinner)</option>
                <option value="7:30 PM">7:30 PM (Dinner)</option>
                <option value="8:00 PM">8:00 PM (Dinner)</option>
                <option value="8:30 PM">8:30 PM (Dinner)</option>
                <option value="9:00 PM">9:00 PM (Dinner)</option>
                <option value="9:30 PM">9:30 PM (Dinner)</option>
              </select>
              {errors.time && (
                <p className="text-error text-xs mt-1">{errors.time}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="res-guests" className="block text-sm font-medium mb-1">
              Number of Guests *
            </label>
            <input
              type="number"
              id="res-guests"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              min="1"
              max="20"
              className={`w-full px-3 py-2 rounded border text-sm ${
                errors.guests ? "border-error" : "border-border"
              } focus:outline-none focus:border-brown`}
            />
            {errors.guests && (
              <p className="text-error text-xs mt-1">{errors.guests}</p>
            )}
          </div>

          <div>
            <label htmlFor="res-request" className="block text-sm font-medium mb-1">
              Special Request{" "}
              <span className="text-text-muted">(optional)</span>
            </label>
            <textarea
              id="res-request"
              name="specialRequest"
              rows={2}
              value={form.specialRequest}
              onChange={handleChange}
              placeholder="e.g. Window table, birthday celebration, high chair..."
              className="w-full px-3 py-2 rounded border border-border text-sm focus:outline-none focus:border-brown resize-none"
            />
          </div>
        </div>

        {errors.submit && (
          <div className="bg-error/10 text-error px-4 py-3 rounded text-sm">
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Reserve Table"}
        </button>
      </form>
    </div>
  );
}
