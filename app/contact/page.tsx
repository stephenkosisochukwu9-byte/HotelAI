export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        Contact Us
      </h1>

      <p className="text-lg text-gray-700 mb-10">
        We'd love to hear from you. Reach out using any of the details below.
      </p>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Contact Details */}
        <div className="space-y-4 text-lg">
          <p><strong>📍 Address:</strong> 123 Hotel Street, Lagos, Nigeria</p>
          <p><strong>📞 Phone:</strong> +234 800 123 4567</p>
          <p><strong>📧 Email:</strong> info@hotelai.com</p>
          <p><strong>🕒 Hours:</strong> Open 24 Hours</p>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-lg p-3"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border rounded-lg p-3"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

<div className="mt-16">
  <h2 className="text-3xl font-bold mb-6">
    Find Us
  </h2>

  <iframe
    src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
    width="100%"
    height="450"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-xl shadow-lg"
  ></iframe>
</div>
      </div>
    </div>
  );
}