import { Link } from 'react-router-dom';
import { stats, team } from '../data/products';
import personManBlue from '../assets/images/person-man-blue.png';
import personWoman   from '../assets/images/person-woman-business.png';
import personManSuit from '../assets/images/person-man-suit.png';
import Breadcrumb from '../components/layout/Breadcrumb';

const avatarMap = { personManBlue, personWoman, personManSuit };

const TW = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const IG = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const LI = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const StatCard = ({ value, label }) => (
  <div className="border border-gray-200 rounded-md p-8 flex flex-col items-center text-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group cursor-default">
    <span className="text-3xl font-bold mb-2">{value}</span>
    <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">{label}</span>
  </div>
);

const TeamCard = ({ member }) => (
  <div className="text-center">
    <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 aspect-square w-full max-w-xs mx-auto">
      <img src={avatarMap[member.avatarKey]} alt={member.name}
        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300" />
    </div>
    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
    <p className="text-sm text-gray-500 mb-3">{member.role}</p>
    <div className="flex justify-center gap-3 text-dark">
      <a href="#" className="hover:text-primary transition-colors"><TW /></a>
      <a href="#" className="hover:text-primary transition-colors"><IG /></a>
      <a href="#" className="hover:text-primary transition-colors"><LI /></a>
    </div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb />

      {/* Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">Our Story</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence
            in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has
            10,500 sellers and 300 brands and serves 3 millions customers across the region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a
            diverse assortment in categories ranging from consumer electronics to fashion, groceries to home &amp;
            living, and many more.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden aspect-video lg:aspect-square">
          <img src={personWoman} alt="Our Story"
            className="w-full h-full object-cover object-top" />
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => <StatCard key={stat.id} value={stat.value} label={stat.label} />)}
        </div>
      </section>

      {/* Team */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {team.map(member => <TeamCard key={member.id} member={member} />)}
        </div>
      </section>

      {/* Services */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { icon: '🚚', title: 'FREE AND FAST DELIVERY', desc: 'Free delivery for all orders over $140' },
          { icon: '🎧', title: '24/7 CUSTOMER SERVICE',  desc: 'Friendly 24/7 customer support'         },
          { icon: '✅', title: 'MONEY BACK GUARANTEE',   desc: 'We return money within 30 days'         },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center text-2xl ring-8 ring-gray-200">{item.icon}</div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide mb-1">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
