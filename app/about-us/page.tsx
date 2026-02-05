import React from "react"
import { HiUsers, HiCalendar, HiSparkles, HiCheckCircle } from "react-icons/hi2"

const page = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are building modern digital solutions that make discovering,
            managing, and attending events easier across Nigeria.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              We are a technology-driven platform focused on connecting people
              with experiences that matter. From concerts and conferences to
              workshops and community events, we provide tools that help users
              discover events and organizers manage them seamlessly.
            </p>
            <p className="text-gray-600">
              Our goal is to simplify event discovery and ticketing while
              empowering organizers with powerful management tools.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700">
              To create a reliable and user-friendly platform that supports
              event organizers and delivers unforgettable experiences to
              attendees.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What We Offer
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <HiCalendar className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                Event Discovery
              </h3>
              <p className="text-gray-600 text-sm">
                Find events happening near you with ease and confidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <HiUsers className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                Event Management
              </h3>
              <p className="text-gray-600 text-sm">
                Tools for organizers to create, manage, and track events.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <HiSparkles className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                Seamless Experience
              </h3>
              <p className="text-gray-600 text-sm">
                Clean, modern UI designed for simplicity and speed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <HiCheckCircle className="w-8 h-8 text-gray-900 mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                Secure Ticketing
              </h3>
              <p className="text-gray-600 text-sm">
                Safe and reliable ticket booking and verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-gray-900">1k+</p>
            <p className="text-gray-600 mt-2">Events Hosted</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">10k+</p>
            <p className="text-gray-600 mt-2">Tickets Sold</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">500+</p>
            <p className="text-gray-600 mt-2">Organizers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">20+</p>
            <p className="text-gray-600 mt-2">Cities Covered</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="mb-6 text-gray-300">
            Join thousands of users discovering and managing events with ease.
          </p>
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Explore Events
          </button>
        </div>
      </section>
    </div>
  )
}

export default page