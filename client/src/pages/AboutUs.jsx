import { Leaf, Heart, Shield, Award, Clock } from "lucide-react"
import image1 from "./modern-kitchen-produce.png"

const AboutUs = () => {
  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: "Fresh & Natural",
      description:
        "We source only the freshest, highest-quality produce directly from local farms and trusted suppliers.",
    },
    {
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      title: "Health First",
      description:
        "Your family's health is our priority. We ensure all products meet the highest nutritional standards.",
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Quality Assured",
      description: "Every item goes through rigorous quality checks before reaching your doorstep.",
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to bring fresh groceries to your door in record time.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "client/src/pages/professional-ceo-smiling.png",
      description: "Passionate about bringing fresh, healthy food to every household.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/Gemini_Generated_Image_8ct6gv8ct6gv8ct6.png",
      description: "Ensures seamless delivery and quality control across all operations.",
    },
    {
      name: "Emily Rodriguez",
      role: "Sustainability Director",
      image: "/sustainability-director-woman.png",
      description: "Leading our mission for eco-friendly packaging and sustainable sourcing.",
    },
  ]

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Local Farmers" },
    { number: "24/7", label: "Customer Support" },
    { number: "99%", label: "Satisfaction Rate" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-lime-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Fresh • Natural • Trusted
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent mb-6">
            About Freshora
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize how families access fresh, healthy groceries. From farm to your table,
            we ensure quality, freshness, and convenience in every delivery.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Freshora, we believe everyone deserves access to fresh, nutritious food. We've built a platform that
                connects local farmers directly with families, ensuring the freshest produce reaches your doorstep while
                supporting our community.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2020, we've grown from a small local initiative to a trusted grocery delivery service, always
                maintaining our commitment to quality, sustainability, and customer satisfaction.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-lime-100 rounded-2xl p-8 shadow-xl">
                <img
                  src={image1}
                  alt="Fresh produce"
                  className="w-full h-full  rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to delivery
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-emerald-50 to-lime-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-emerald-100">
                  <div className="bg-white p-3 rounded-xl w-fit mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-lime-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Numbers that reflect our commitment to serving our community
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-emerald-100 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The passionate people behind Freshora's success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "client/src/pages/CEO.png"}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-organic-pattern.png')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-700/50 text-emerald-100 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Award className="w-4 h-4" />
            Join Our Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience Fresh?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of families who trust Freshora for their daily grocery needs. Fresh, fast, and always
            reliable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" style={{textDecoration: 'none'}}>
            <button className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Start Shopping Now
            </button>
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-800 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
