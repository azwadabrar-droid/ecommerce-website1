import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import badgeGooglePlay  from '../../assets/icons/badge-google-play.png';
import badgeAppStore    from '../../assets/icons/badge-app-store.png';
import imgQRCode        from '../../assets/icons/qr-code.png';

const FB  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TW  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const IG  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const LI  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const YT  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="white"/></svg>;

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-5">Exclusive</h3>
            <p className="text-sm text-gray-400 mb-2">Subscribe</p>
            <p className="text-sm text-gray-400 mb-4">Get 10% off your first order</p>
            <div className="flex items-center border border-gray-500 rounded overflow-hidden">
              <input type="email" placeholder="Enter your email"
                className="bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-500 flex-1 outline-none" />
              <button className="px-3 py-2.5 hover:bg-gray-700 transition-colors"><Send size={16} /></button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</li>
              <li><a href="mailto:exclusive@gmail.com" className="hover:text-white transition-colors">exclusive@gmail.com</a></li>
              <li><a href="tel:+88015888889999" className="hover:text-white transition-colors">+88015-88888-9999</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-5">Account</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/profile"  className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/login"    className="hover:text-white transition-colors">Login / Register</Link></li>
              <li><Link to="/cart"     className="hover:text-white transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/shop"     className="hover:text-white transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5">Quick Link</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about"   className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about"   className="hover:text-white transition-colors">Terms Of Use</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold mb-5">Download App</h4>
            <p className="text-xs text-gray-500 mb-3">Save $3 with App New User Only</p>
            <div className="flex gap-3 mb-5 items-start">
              <img src={imgQRCode} alt="QR Code" className="w-20 h-20 bg-white rounded p-1 object-contain" />
              <div className="flex flex-col gap-2">
                <a href="#"><img src={badgeGooglePlay} alt="Google Play" className="h-8 rounded object-contain" /></a>
                <a href="#"><img src={badgeAppStore}   alt="App Store"   className="h-8 rounded object-contain" /></a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {[FB, TW, IG, LI, YT].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-primary transition-colors"><Icon /></a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
}
