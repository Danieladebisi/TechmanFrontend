import Samsung from '../assets/Samsung.jpg';
import Iphone from '../assets/Iphone.jpg';
import Laptop from '../assets/Laptop.jpg';
import Accessories from '../assets/Accessories.jpg';

export default function Section() {
  return (
    <>
      <div class="row row-cols-1 my-5 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <img
              src={Iphone}
              class="card-img-top"
              alt="Hollywood Sign on The Hill"
            />
            <div class="card-body">
              <h5 class="card-title">Iphone</h5>
              <p class="card-text">
              iPhones are premium smartphones known for their sleek design, powerful performance, and seamless integration with Apple’s ecosystem. They feature advanced camera systems, secure Face ID, and a smooth iOS experience with regular updates and strong privacy protections. With exclusive features like AirDrop, iMessage, and the Apple App Store, iPhones offer a user-friendly and high-quality mobile experience.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img
              src={Samsung}
              class="card-img-top"
              alt="Palm Springs Road"
            />
            <div class="card-body">
              <h5 class="card-title">Samsung</h5>
              <p class="card-text">
              Samsung phones are known for their sleek designs, vibrant AMOLED displays, and powerful performance across various price ranges. They feature advanced camera systems, long-lasting batteries, and seamless integration with the Samsung ecosystem, including Galaxy Watches and Buds. With One UI, Samsung offers a smooth and customizable Android experience, packed with innovative features like Samsung DeX and S Pen.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img
              src={Laptop}
              class="card-img-top"
              alt="Los Angeles Skyscrapers"
            />
            <div class="card-body">
              <h5 class="card-title">Laptops</h5>
              <p class="card-text">
              A laptop is a portable computer that combines a screen, keyboard, and touchpad into a compact design for work, entertainment, and productivity on the go. It comes in various configurations, from lightweight ultrabooks to powerful gaming and professional workstations, catering to different user needs. 
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img
              src={Accessories}
              class="card-img-top"
              alt="Skyscrapers"
            />
            <div class="card-body">
              <h5 class="card-title">Accessories</h5>
              <p class="card-text">
              Accessories are additional items designed to enhance the functionality, convenience, or aesthetics of a primary device or product. They range from tech gadgets like headphones, chargers, and cases to fashion items such as watches, bags, and jewelry. Whether for protection, style, or improved performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
