import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="py-[10rem] bg-gray-50 relative">
      <div className="mx-auto container">
        <div className="flex flex-col md:flex-row  md:justify-between  items-center">
          <div className="flex flex-col gap-3.5 justify-center text-xl ">
            <Logo />
            <p className="font-semibold">Call us</p>
            <p className="text-blue-500 font-bold">123 456 7890</p>
            <p>Krishngar nadia</p>
            <p>support@jobGenius.com</p>
          </div>
          <div className="flex flex-col md:flex-row gap-[14rem]">
            <div className="flex flex-col gap-3.5 text-xl">
              <p className="font-semibold">Resources</p>
              <p>Out Team</p>
              <p>About Us</p>
              <p>Shop</p>
              <p>Contact</p>
            </div>
            <div className="flex flex-col gap-3.5 text-xl">
              <p className="font-semibold">Resources</p>
              <p>Out Team</p>
              <p>About Us</p>
              <p>Shop</p>
              <p>Contact</p>
            </div>
            <div className="flex flex-col gap-3.5 text-xl">
              <p className="font-semibold">Resources</p>
              <p>Out Team</p>
              <p>About Us</p>
              <p>Shop</p>
              <p>Contact</p>
            </div>
            <div className="flex flex-col gap-3.5 text-xl text-gray-500">
              <p className="font-semibold text-black">Resources</p>
              <p>Out Team</p>
              <p>About Us</p>
              <p>Shop</p>
              <p>Contact</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 absolute bottom-0 py-[2.5rem]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-[1rem] items-center justify-center md:justify-between">
            <p>© 2025 JobGenius by Ranit Biswas. All Right Reserved.</p>
            <div className="flex justify-center items-center gap-[1.5rem]">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
