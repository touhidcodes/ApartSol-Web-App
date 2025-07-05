import React from "react";
import {
  Home,
  Search,
  Calendar,
  Shield,
  Users,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Heart,
  Zap,
  Globe,
  Award,
  Target,
  Eye,
  Lightbulb,
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const AboutUs: React.FC = () => {
  const features: FeatureProps[] = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Property Search",
      description:
        "Smart filtering system with location-based search, price ranges, amenities, and more to find your perfect home.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Seamless Booking",
      description:
        "Book properties instantly with our streamlined process. Real-time availability and instant confirmations.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Transactions",
      description:
        "End-to-end encryption and secure payment processing to protect your personal and financial information.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Interactive Maps",
      description:
        "Explore neighborhoods with detailed maps, nearby amenities, and transportation options.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you with any questions or concerns.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Verified Listings",
      description:
        "All properties are verified and regularly updated to ensure accuracy and quality.",
    },
  ];

  const stats: StatProps[] = [
    {
      number: "10,000+",
      label: "Properties Listed",
      icon: <Home className="w-5 h-5" />,
    },
    {
      number: "50,000+",
      label: "Happy Customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "98%",
      label: "Success Rate",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do, ensuring their needs are met with excellence.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Continuously improving our platform with cutting-edge technology and user-centric features.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      description:
        "Building trust through transparency, security, and reliable service delivery.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessibility",
      description:
        "Making quality housing solutions accessible to everyone, everywhere.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF0F4] via-white to-slate-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1C2D37] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Home className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              APARTSOL Living Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing the way you find, book, and manage property
              listings with cutting-edge technology and unparalleled service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Award className="w-5 h-5" />
                <span className="font-medium">Award Winning Platform</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Users className="w-5 h-5" />
                <span className="font-medium">Trusted by Thousands</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#EBF0F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To simplify the property search and booking process by
                  providing a comprehensive, user-friendly platform that
                  connects property seekers with their ideal living spaces while
                  ensuring transparency, security, and exceptional service.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become the leading digital platform for property solutions
                  globally, making quality housing accessible to everyone
                  through innovative technology and exceptional user experience.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-[#1C2D37] rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center">
                    <Lightbulb className="w-12 h-12 text-white mb-2" />
                    <span className="text-white font-semibold text-center">
                      Innovation
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center">
                    <Heart className="w-12 h-12 text-white mb-2" />
                    <span className="text-white font-semibold text-center">
                      Excellence
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center">
                    <Shield className="w-12 h-12 text-white mb-2" />
                    <span className="text-white font-semibold text-center">
                      Security
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center">
                    <Globe className="w-12 h-12 text-white mb-2" />
                    <span className="text-white font-semibold text-center">
                      Global
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes APARTSOL the preferred choice for property
              solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#1C2D37] group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#EBF0F4] rounded-xl text-[#1C2D37] group-hover:bg-[#1C2D37] group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1C2D37] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#EBF0F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-2xl text-[#1C2D37] group-hover:bg-[#1C2D37] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-200 text-[#1C2D37]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 opacity-80">
            Join thousands of satisfied customers who have found their ideal
            living spaces through APARTSOL.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#1C2D37] hover:bg-[#1C2D37]/90 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-300 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Start Your Search
            </button>
            <button className="border border-[#1C2D37]/30 hover:bg-[#1C2D37]/10 text-[#1C2D37] font-semibold py-4 px-8 rounded-xl transition-colors duration-300 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
