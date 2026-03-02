export default function Feature() {
  const features = [
    {
      icon: "🧠",
      title: "Compassionate Support",
      description: "Connect with licensed counsellors who genuinely care about your mental well-being.",
    },
    {
      icon: "💬",
      title: "Talk Anytime",
      description: "Get support from the comfort of your home, anytime you need it — 24/7.",
    },
    {
      icon: "🔒",
      title: "Private & Secure",
      description: "Your conversations are completely confidential and securely encrypted.",
    },
    {
      icon: "🌱",
      title: "Personal Growth",
      description: "Track your mental health journey and grow with guided counselling sessions.",
    },
    {
      icon: "👨‍⚕️",
      title: "Licensed Doctors",
      description: "All our counsellors are certified and experienced mental health professionals.",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Monitor your well-being with weekly reports and mood tracking tools.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <h2 className="text-6xl font-bold text-black mb-4">Features</h2>
        <p className="text-gray-500 mb-12 max-w-md">
          Discover what makes our counselling platform stand out from the rest.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200 transition-transform duration-300 hover:-translate-y-3 hover:bg-white/90"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}