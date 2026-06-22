import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Breadcrumb from '../components/layout/Breadcrumb';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
        {/* Contact Info */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <h3 className="font-semibold">Call To Us</h3>
            </div>
            <p className="text-sm text-gray-500 mb-1">We are available 24/7, 7 days a week.</p>
            <a href="tel:+88015888889999" className="text-sm font-medium hover:text-primary transition-colors">
              Phone: +8801588-888899
            </a>
          </div>

          <hr className="border-gray-200 mb-8" />

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <h3 className="font-semibold">Write To US</h3>
            </div>
            <p className="text-sm text-gray-500 mb-1">Fill out our form and we will contact you within 24 hours.</p>
            <a href="mailto:customer@exclusive.com" className="text-sm font-medium hover:text-primary transition-colors block">
              customer@exclusive.com
            </a>
            <a href="mailto:support@exclusive.com" className="text-sm font-medium hover:text-primary transition-colors block mt-1">
              support@exclusive.com
            </a>
          </div>

          <hr className="border-gray-200 mb-8" />

          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <h3 className="font-semibold">Our Location</h3>
            </div>
            <p className="text-sm text-gray-500">
              111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
              <Clock size={14} />
              <span>Mon–Fri: 9am – 6pm</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-2">Send Us A Message</h2>
          <p className="text-gray-500 text-sm mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4 mb-6 text-sm">
              ✅ Your message has been sent! We'll get back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name *"
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email *"
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Your Message *"
                rows={6}
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-10 py-3.5 rounded font-medium hover:bg-primary-hover transition-colors text-sm"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-12 rounded-xl overflow-hidden h-64 bg-gray-100">
        <iframe
          title="Location Map"
          src="https://maps.google.com/maps?q=Dhaka,Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
