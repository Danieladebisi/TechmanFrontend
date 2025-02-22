import { FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    // Remove the container if you want to extend the Footer to full width.
    <div className="container">
      {/* <!-- Footer --> */}
      <footer
        className="text-left text-lg-start text-white"
        style={{ backgroundColor: "#45526e" }}
      >
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Links --> */}
          <section>
            {/* <!--Grid row--> */}
            <div className="row">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Techmansion
                </h6>
                <p>
                Tech Mansion is a top mobile tech media company delivering news, reviews, and comparisons on smartphones, laptops, and gadgets. We provide expert insights, buyer’s guides, and the latest industry trends to keep tech enthusiasts informed.
                </p>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Products
                </h6>
                <p>
                  <a href="https://techmansion.tech/category/phones/" className="text-white">
                    Phones
                  </a>
                </p>
                <p>
                  <a href="https://techmansion.tech/category/laptops/" className="text-white">
                    Laptops
                  </a>
                </p>
                <p>
                  <a href="https://techmansion.tech/category/tech-mansion-accessories/" className="text-white">
                  Accessories
                  </a>
                </p>
                <p>
                  <a href="https://techmansion.tech/category/article/" className="text-white">
                    Article
                  </a>
                </p>
                <p>
                  <a href="https://techmansion.tech/privacy-policy/" className="text-white">
                    Help
                  </a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p>
                  <a href="#" className="text-white">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white">
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white">
                    Shipping Rates
                  </a>
                </p>
                
              </div> */}

              {/* <!-- Grid column --> */}
              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-envelope mr-3"></i>Techmansioninfo@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> tel: +18608679664
                </p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!--Grid row--> */}
          </section>
          {/* <!-- Section: Links --> */}

          <hr className="my-3" />

          {/* <!-- Section: Copyright --> */}
          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              {/* <!-- Grid column --> */}
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                {/* <!-- Copyright --> */}
                <div className="p-3">
                  © 2025 Copyright:
                  <a className="text-white" href="https://techmansion.tech/">
                  Techmansion.tech
                  </a>
                </div>
                {/* <!-- Copyright --> */}
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                {/* <!-- Social Media Icons --> */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://web.facebook.com/TechMansionng/?_rdc=1&_rdr#"
                  role="button"
                  title="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://x.com/techmansion"
                  role="button"
                >
                  <FaTwitter />
                </a>

                <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://www.youtube.com/channel/UCjczcDuRKNOOUtRpvoArg-w"
                  role="button"
                >
                  <FaYoutube />
                </a>
                {/* <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://api.whatsapp.com/send?text=About%20us%20https%3A%2F%2Ftechmansion.tech%2Fabout-tech-mansion%2F"
                  role="button"
                >
                  <FaWhatsapp />
                </a> */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  href="https://www.instagram.com/techmansion_/"
                  role="button"
                >
                  <FaInstagram />
                </a>
              </div>
              {/* <!-- Grid column --> */}
            </div>
          </section>
          {/* <!-- Section: Copyright --> */}
        </div>
        {/* <!-- Grid container --> */}
      </footer>
      {/* <!-- Footer --> */}
    </div>
  );
};

export default Footer;
